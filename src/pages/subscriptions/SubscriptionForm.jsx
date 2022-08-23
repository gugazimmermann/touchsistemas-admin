import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { partnersByReferralCode } from '../../graphql/queries';
import { createSubscriptions } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { Loading, Alert, Title, Uploading } from '../../components';
import { getAddressFromCEP, normalizeCEP, validateEmail } from '../../helpers';
import { LANGUAGES, ROUTES } from '../../constants';

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
	const navigate = useNavigate();
	const [client, loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [formEvent, setFormEvent] = useState(initial);
	const [eventLogo, setEventLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].subscription.logo);
	const [progress, setProgress] = useState();

	function handleChangeCEP(value) {
		setFormEvent({ ...formEvent, zipCode: normalizeCEP(value) });
	}

	async function getAddress() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(formEvent.zipCode.replace(/\D/g, ''));
			setFormEvent({
				...formEvent,
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
		if (formEvent?.zipCode?.length === 10) getAddress();
	}, [formEvent.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			setFileName(file.name);
			if (file.size > 2 * 1024 * 1024) {
				setErrorMsg(LANGUAGES[state.lang].subscription.imageSize);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedTypes = ['image/png', 'image/jpeg'];
			if (!acceptedTypes.includes(file.type)) {
				setErrorMsg(LANGUAGES[state.lang].subscription.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedExtensions = ['jpg', 'jpeg', 'png'];
			if (!acceptedExtensions.includes(file.name.split('.').pop())) {
				setErrorMsg(LANGUAGES[state.lang].subscription.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			setErrorMsg('');
			setError(false);
			setLoading(false);
			setEventLogo(file);
		}
		setErrorMsg('');
		setError(false);
		setLoading(false);
		return null;
	}

	async function handleCreateSubscription(partnerID) {
		if (formEvent.website) {
			if (formEvent.website.charAt(0).toLocaleLowerCase !== 'h') formEvent.website = `http://${formEvent.website}`;
		}
		const { data } = await API.graphql(
			graphqlOperation(createSubscriptions, {
				input: {
					referralCode: formEvent.referralCode || null,
					name: formEvent.name,
					website: formEvent.website || null,
					email: formEvent.email || null,
					zipCode: formEvent.zipCode.replace(/\D/g, ''),
					state: formEvent.state,
					city: formEvent.city,
					street: formEvent.street,
					number: formEvent.number,
					complement: formEvent.complement,
					clientID: client.id,
					partnerID,
				},
			})
		);
		return data.createSubscriptions;
	}

	async function addEventMap(newEvent) {
		const eventAddress = encodeURIComponent(
			`${newEvent.street}, ${newEvent.number} - ${newEvent.city} - ${newEvent.state}, ${newEvent.zipCode}`
		);
		const eventMarker = `markers=color:0xa855f7%7Clabel:${newEvent.name[0]}%7C${eventAddress}`;
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${eventAddress}&zoom=17&size=1280x1280&scale=2&${eventMarker}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `${newEvent.id}.png`);
		await Storage.put(`maps/${newEvent.id}.png`, file, {
			contentType: 'image/png',
		});
	}

	async function addEventLogo(newEvent) {
		setProgress(0);
		await Storage.put(`logo/${newEvent.id}.${eventLogo.name.split('.').pop()}`, eventLogo, {
			contentType: eventLogo.type,
			progressCallback(p) {
				setProgress(parseInt((p.loaded / p.total) * 100, 10))
			},
		});
		setProgress(0);
	}

	async function handleAdd() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formEvent.name || !formEvent.zipCode || !formEvent.state || !formEvent.city) {
			setErrorMsg(LANGUAGES[state.lang].subscription.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.email && !validateEmail(formEvent.email)) {
			setErrorMsg(LANGUAGES[state.lang].subscription.requiredEmail);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].subscription.requiredEmail);
			setError(true);
			setLoading(false);
			return null;
		}
		let partnerID = null;
		if (formEvent.referralCode) {
			const getPartner = await API.graphql(
				graphqlOperation(partnersByReferralCode, { referralCode: formEvent.referralCode })
			);
			if (getPartner?.data?.partnersByReferralCode?.items.length <= 0) {
				setErrorMsg('Parceiro não encontrado!');
				setError(true);
				setLoading(false);
				return null;
			}
			partnerID = getPartner.data.partnersByReferralCode.items[0].id;
		}
		const newSubscription = await handleCreateSubscription(partnerID);
		await addEventMap(newSubscription);
		setLoading(false);
		if (eventLogo) await addEventLogo(newSubscription);
		loadClient();
		setFormEvent(initial);
		navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${newSubscription.id}`, { state: { success: true } });
		return true;
	}

	return (
		<>
			{loading && <Loading />}
			{!!progress && <Uploading progress={progress} />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text={LANGUAGES[state.lang].subscription.title} />
			<form className="flex flex-wrap bg-white p-4 mb-4 rounded-md shadow-md">
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.name || ''}
							onChange={(e) => setFormEvent({ ...formEvent, name: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscription.name} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.website || ''}
							onChange={(e) => setFormEvent({ ...formEvent, website: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscription.website}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={formEvent.email || ''}
							onChange={(e) => setFormEvent({ ...formEvent, email: e.target.value })}
							type="email"
							placeholder={LANGUAGES[state.lang].subscription.email}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscription.zipCode} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<select
							value={formEvent.state || ''}
							onChange={(e) => setFormEvent({ ...formEvent, state: e.target.value })}
							placeholder={`${LANGUAGES[state.lang].subscription.state} *`}
							className="bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">{`${LANGUAGES[state.lang].subscription.select} *`}</option>
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
							value={formEvent.city || ''}
							onChange={(e) => setFormEvent({ ...formEvent, city: e.target.value })}
							type="text"
							placeholder={`${LANGUAGES[state.lang].subscription.city} *`}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={formEvent.street || ''}
							onChange={(e) => setFormEvent({ ...formEvent, street: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscription.street}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 sm:pr-4 mb-4">
						<input
							value={formEvent.number || ''}
							onChange={(e) => setFormEvent({ ...formEvent, number: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscription.number}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 mb-4">
						<input
							value={formEvent.complement || ''}
							onChange={(e) => setFormEvent({ ...formEvent, complement: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscription.complement}
							className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={formEvent.referralCode || ''}
							onChange={(e) => setFormEvent({ ...formEvent, referralCode: e.target.value })}
							type="text"
							placeholder={LANGUAGES[state.lang].subscription.referralCode}
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
							onClick={() => handleAdd()}
							className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
						>
							{LANGUAGES[state.lang].subscription.add}
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
