import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, PLANS, ROUTES } from '../../constants';
import { getActivePlanByType, getPartnerByReferralCode, getSubscriptionByID } from '../../api/queries';
import { createSubscription, updateSubscription, updateSubscriptionLogoAndMap } from '../../api/mutations';
import {  sendPublicFile } from '../../api/storage';
import { getAddressFromCEP, normalizeCEP, validateEmail, validateFile } from '../../helpers/forms';
import { createContentMap, createMap } from '../../helpers/map';
import { Loading, Alert, Title, Form, Uploading } from '../../components';

const initial = {
	name: '',
	website: '',
	email: '',
	zipCode: '',
	state: '',
	city: '',
	street: '',
	number: '',
	complement: '',
	referralCode: '',
};

export default function SubscriptionForm() {
	const params = useParams();
	const navigate = useNavigate();
	const [loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const { client } = state;
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [subscription, setSubscription] = useState()
	const [form, setForm] = useState(initial);
	const [logo, setLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].subscriptions.logo);
	const [progress, setProgress] = useState();

	async function getAddress() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(form.zipCode.replace(/\D/g, ''));
			setForm({
				...form,
				state: address.state,
				city: address.city,
				street: address.street,
			});
		} catch (err) {
			setErrorMsg(err.message);
			setError(true);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (form?.zipCode?.length === 10) getAddress();
	}, [form.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		const file = validateFile(e.target.files);
		if (!file) return;
		if (typeof file === 'string' && file === 'imageSize') {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.imageSize);
			setError(true);
			return;
		}
		if (typeof file === 'string' && file === 'imageType') {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.imageType);
			setError(true);
			return;
		}
		setFileName(file.name);
		setLogo(file);
		setErrorMsg('');
		setError(false);
	}

	function validadeForm(f) {
		if (!f.name || !f.zipCode || !f.state || !f.city) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			return false;
		}
		if (f.email && !validateEmail(f.email)) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.requiredEmail);
			return false;
		}
		if (f.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.invalidZipCode);
			return f;
		}
		return true;
	}

	async function handleLogoAndMap(newSubscription) {
		let mapURL = subscription?.map;
		let logoURL = subscription?.logo;
		if (newSubscription.name !== subscription?.name || newSubscription.street !== subscription?.street || newSubscription.number !== subscription?.number ||  newSubscription.city !== subscription?.city || newSubscription.state !== subscription?.state || newSubscription.zipCode.replace(/[^\d]/g, '') !== subscription?.zipCode) {
			const map = await createMap('subscription', newSubscription.id, newSubscription.name, newSubscription.street, newSubscription.number, newSubscription.city, newSubscription.state, newSubscription.zipCode)
			await sendPublicFile('map', newSubscription.id, map, setProgress);
			mapURL = `${process.env.REACT_APP_IMAGES_URL}map/${map.name}?${Date.now()}`;
			const content = (client.Subscriptions?.items || []).map((i) => {
				if (i.id === newSubscription.id) return newSubscription
				return i
			})
			if (!params.id) content.push(newSubscription);
			createContentMap(PLANS.SUBSCRIPTION, client, content)
		}
		if (logo) {
			await sendPublicFile('logo', newSubscription.id, logo, setProgress);
			logoURL = logo ? `${process.env.REACT_APP_IMAGES_URL}logo/${newSubscription.id}.${logo.name.split('.').pop()}?${Date.now()}` : null
		}
		await updateSubscriptionLogoAndMap(newSubscription.id, logoURL, mapURL);
	}

	async function handleSubmit() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!validadeForm(form)) {
			setError(true);
			setLoading(false);
			return null;
		}
		const plan = await getActivePlanByType(PLANS.SUBSCRIPTION);
		if (!plan.id) {
			setErrorMsg('Plano não encontrado!');
			setError(true);
			setLoading(false);
			return null;
		}
		const partner = form.referralCode ? await getPartnerByReferralCode(form.referralCode) : null;
		if (form.referralCode && !partner.id) {
			setErrorMsg('Parceiro não encontrado!');
			setError(true);
			setLoading(false);
			return null;
		}
		const newSubscription = !subscription?.id
			? await createSubscription(form, client.id, plan?.id, partner?.id)
			: await updateSubscription(params.id, form, client.id, plan?.id, partner?.id);
		await handleLogoAndMap(newSubscription)
		loadClient(true);
		setForm(initial);
		setLoading(false);
		navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${newSubscription?.id || params.id}`, {
			state: !params.id ? { success: true } : { edited: true },
		});
		return true;
	}

	function setSubscriptionForm(s) {
		setForm({
			...form,
			name: s.name || '',
			website: s.website || '',
			email: s.email || '',
			zipCode: normalizeCEP(s.zipCode) || '',
			state: s.state || '',
			city: s.city || '',
			street: s.street || '',
			number: s.number || '',
			complement: s.complement || '',
			referralCode: s.referralCode || '',
		});
	}

	async function handleGetSubscription(id) {
		setLoading(true);
		const getSubscription = await getSubscriptionByID(id, true);
		if (getSubscription) {
			setSubscriptionForm(getSubscription);
			setSubscription(getSubscription);
		}
		else {
			navigate(ROUTES[state.lang].DASHBOARD);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (params.id) handleGetSubscription(params.id);
	}, [params]);

	return (
		
		<>
			{loading && <Loading />}
			{!!progress && <Uploading progress={progress} />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title
				text={!params?.id ? LANGUAGES[state.lang].subscriptions.title : LANGUAGES[state.lang].subscriptions.titleEdit}
				back={`${ROUTES[state.lang].SUBSCRIPTIONS}/${params.id}`}
			/>
			<Form>
				<div className="w-full flex flex-wrap">
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={form.name || ''}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.name} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={form.website || ''}
							onChange={(e) => setForm({ ...form, website: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.website}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={form.email || ''}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
							type="email"
							placeholder={LANGUAGES[state.lang].subscriptions.email}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={form.zipCode || ''}
							onChange={(e) => setForm({ ...form, zipCode: normalizeCEP(e.target.value) })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.zipCode} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<select
							value={form.state || ''}
							onChange={(e) => setForm({ ...form, state: e.target.value })}
							placeholder={`${LANGUAGES[state.lang].subscriptions.state} *`}
							className="bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">{`${LANGUAGES[state.lang].subscriptions.select} *`}</option>
							<option value="AC">Acre</option>
							<option value="AL">Alagoas</option>
							<option value="AP">Amapá</option>
							<option value="AM">Amazonas</option>
							<option value="BA">Bahia</option>
							<option value="CE">Ceará</option>
							<option value="DF">Distrito Federal</option>
							<option value="ES">Espírito Santo</option>
							<option value="GO">Goiás</option>
							<option value="MA">Maranhão</option>
							<option value="MT">Mato Grosso</option>
							<option value="MS">Mato Grosso do Sul</option>
							<option value="MG">Minas Gerais</option>
							<option value="PA">Pará</option>
							<option value="PB">Paraíba</option>
							<option value="PR">Paraná</option>
							<option value="PE">Pernambuco</option>
							<option value="PI">Piauí</option>
							<option value="RJ">Rio de Janeiro</option>
							<option value="RN">Rio Grande do Norte</option>
							<option value="RS">Rio Grande do Sul</option>
							<option value="RO">Rondônia</option>
							<option value="RR">Roraima</option>
							<option value="SC">Santa Catarina</option>
							<option value="SP">São Paulo</option>
							<option value="SE">Sergipe</option>
							<option value="TO">Tocantins</option>
						</select>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={form.city || ''}
							onChange={(e) => setForm({ ...form, city: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.city} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={form.street || ''}
							onChange={(e) => setForm({ ...form, street: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.street}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 sm:pr-4 mb-4">
						<input
							value={form.number || ''}
							onChange={(e) => setForm({ ...form, number: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.number}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 mb-4">
						<input
							value={form.complement || ''}
							onChange={(e) => setForm({ ...form, complement: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.complement}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={form.referralCode || ''}
							onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.referralCode}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 mb-4">
						<input
							type="file"
							id="files"
							className="hidden"
							onChange={(e) => handleFile(e)}
							accept=".jpg,.jpeg,.png,image/png,image/jpeg"
						/>
						<label
							htmlFor="files"
							className="relative file:hidden bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<i className="bx bx-file-find text-2xl absolute top-1 right-1" />
							{fileName}
						</label>
					</div>
					<div className="w-full flex justify-center">
						<button
							type="button"
							onClick={() => handleSubmit()}
							className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
						>
							{!params?.id ? LANGUAGES[state.lang].subscriptions.add : LANGUAGES[state.lang].subscriptions.titleEdit}
						</button>
					</div>
				</div>
			</Form>
		</>
	);
}
