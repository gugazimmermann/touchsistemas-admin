import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { planByActive, partnerByReferralCode } from '../../graphql/queries';
import * as queries from '../../graphql/queries';
import { createSubscriptions, updateSubscriptions } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { Loading, Alert, Title, Uploading } from '../../components';
import { delay, getAddressFromCEP, normalizeCEP, validateEmail } from '../../helpers';
import { LANGUAGES, PLANS, ROUTES } from '../../constants';

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
	const [formSubscription, setFormSubscription] = useState(initial);
	const [subscriptionLogo, setSubscriptionLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].subscriptions.logo);
	const [progress, setProgress] = useState();

	function handleChangeCEP(value) {
		setFormSubscription({ ...formSubscription, zipCode: normalizeCEP(value) });
	}

	async function getAddress() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(formSubscription.zipCode.replace(/\D/g, ''));
			setFormSubscription({
				...formSubscription,
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
		if (formSubscription?.zipCode?.length === 10) getAddress();
	}, [formSubscription.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			setFileName(file.name);
			if (file.size > 2 * 1024 * 1024) {
				setErrorMsg(LANGUAGES[state.lang].subscriptions.imageSize);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedTypes = ['image/png', 'image/jpeg'];
			if (!acceptedTypes.includes(file.type)) {
				setErrorMsg(LANGUAGES[state.lang].subscriptions.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedExtensions = ['jpg', 'jpeg', 'png'];
			if (!acceptedExtensions.includes(file.name.split('.').pop())) {
				setErrorMsg(LANGUAGES[state.lang].subscriptions.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			setErrorMsg('');
			setError(false);
			setLoading(false);
			setSubscriptionLogo(file);
		}
		setErrorMsg('');
		setError(false);
		setLoading(false);
		return null;
	}

	async function handleCreateSubscription(partnerID, planID) {
		const { data } = await API.graphql(
			graphqlOperation(createSubscriptions, {
				input: {
					referralCode: formSubscription.referralCode || null,
					name: formSubscription.name,
					website: formSubscription.website || null,
					email: formSubscription.email || null,
					zipCode: formSubscription.zipCode.replace(/\D/g, ''),
					state: formSubscription.state,
					city: formSubscription.city,
					street: formSubscription.street || null,
					number: formSubscription.number || null,
					complement: formSubscription.complement || null,
					active: 'TRUE',
					PlanID: planID,
					ClientID: client.id,
					PartnerID: partnerID,
				},
			})
		);
		return data.createSubscriptions;
	}

	async function handleUpdateSubscription(partnerID, planID) {
		const { data } = await API.graphql(
			graphqlOperation(updateSubscriptions, {
				input: {
					id: params.id,
					referralCode: formSubscription.referralCode || null,
					name: formSubscription.name,
					website: formSubscription.website || null,
					email: formSubscription.email || null,
					zipCode: formSubscription.zipCode.replace(/\D/g, ''),
					state: formSubscription.state,
					city: formSubscription.city,
					street: formSubscription.street || null,
					number: formSubscription.number || null,
					complement: formSubscription.complement || null,
					active: 'TRUE',
					PlanID: planID,
					ClientID: client.id,
					PartnerID: partnerID,
				},
			})
		);
		return data.updateSubscriptions;
	}

	async function addSubscriptionMap(newSubscription) {
		const subscriptionAddress = encodeURIComponent(
			`${newSubscription.street}, ${newSubscription.number} - ${newSubscription.city} - ${newSubscription.state}, ${newSubscription.zipCode}`
		);
		const subscriptionMarker = `markers=color:0xa855f7%7Clabel:${newSubscription.name[0]}%7C${subscriptionAddress}`;
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${subscriptionAddress}&zoom=17&size=1280x1280&scale=2&${subscriptionMarker}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `${newSubscription.id}.png`);
		await Storage.put(`maps/${newSubscription.id}.png`, file, {
			contentType: 'image/png',
		});
	}

	async function addSubscriptionLogo(newSubscription) {
		setProgress(0);
		await Storage.put(`logo/${newSubscription.id}.${subscriptionLogo.name.split('.').pop()}`, subscriptionLogo, {
			contentType: subscriptionLogo.type,
			progressCallback(p) {
				setProgress(parseInt((p.loaded / p.total) * 100, 10));
			},
		});
		setProgress(0);
	}

	async function handleSubmit() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formSubscription.name || !formSubscription.zipCode || !formSubscription.state || !formSubscription.city) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formSubscription.email && !validateEmail(formSubscription.email)) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.requiredEmail);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formSubscription.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.invalidZipCode);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formSubscription.website) {
			if (formSubscription.website.charAt(0).toLocaleLowerCase() !== 'h') {
				formSubscription.website = `http://${formSubscription.website}`;
			}
			if (formSubscription.website.charAt(formSubscription.website.length - 1) === '/') {
				formSubscription.website = formSubscription.website.slice(0, -1);
			}
		}
		let partnerID = null;
		if (formSubscription.referralCode) {
			const getPartner = await API.graphql(
				graphqlOperation(partnerByReferralCode, { referralCode: formSubscription.referralCode })
			);
			if (getPartner?.data?.partnerByReferralCode?.items.length <= 0) {
				setErrorMsg(LANGUAGES[state.lang].subscriptions.invalidPartner);
				setError(true);
				setLoading(false);
				return null;
			}
			partnerID = getPartner.data.partnerByReferralCode.items[0].id;
		}
		const getPlan = await API.graphql(
			graphqlOperation(planByActive, { type: PLANS.SUBSCRIPTION, filter: { active: { eq: 'TRUE' } } })
		);
		if (getPlan?.data?.planByActive?.items.length <= 0) {
			setErrorMsg('Plano não encontrado!');
			setError(true);
			setLoading(false);
			return null;
		}
		const planID = getPlan.data.planByActive.items[0].id;
		const newSubscription = !params?.id
			? await handleCreateSubscription(partnerID, planID)
			: await handleUpdateSubscription(partnerID, planID);
		if (subscriptionLogo) await addSubscriptionLogo(newSubscription || formSubscription);
		delay(3000);
		await addSubscriptionMap(newSubscription || formSubscription);
		loadClient(true);
		setFormSubscription(initial);
		setLoading(false);
		navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${newSubscription?.id || params.id}`, {
			state: !params.id ? { success: true } : { edited: true },
		});
		return true;
	}

	async function handleGetSubscription(id) {
		setLoading(true);
		const {
			data: { getSubscriptions },
		} = await API.graphql(graphqlOperation(queries.getSubscriptions, { id, active: 'TRUE' }));
		if (getSubscriptions) {
			setLoading(false);
			setFormSubscription({
				...formSubscription,
				name: getSubscriptions.name || '',
				website: getSubscriptions.website || '',
				email: getSubscriptions.email || '',
				zipCode: normalizeCEP(getSubscriptions.zipCode) || '',
				state: getSubscriptions.state || '',
				city: getSubscriptions.city || '',
				street: getSubscriptions.street || '',
				number: getSubscriptions.number || '',
				complement: getSubscriptions.complement || '',
				referralCode: getSubscriptions.referralCode || '',
			});
		} else {
			navigate(ROUTES[state.lang].DASHBOARD);
		}
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
			<form className="flex flex-wrap bg-white p-4 mb-8 rounded-md shadow-md">
				<div className="w-full flex flex-wrap">
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.name || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, name: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.name} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.website || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, website: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.website}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={formSubscription.email || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, email: e.target.value })}
							type="email"
							placeholder={LANGUAGES[state.lang].subscriptions.email}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.zipCode} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<select
							value={formSubscription.state || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, state: e.target.value })}
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
							value={formSubscription.city || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, city: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscriptions.city} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.street || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, street: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.street}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.number || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, number: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.number}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 mb-4">
						<input
							value={formSubscription.complement || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, complement: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscriptions.complement}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.referralCode || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, referralCode: e.target.value })}
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
			</form>
		</>
	);
}
