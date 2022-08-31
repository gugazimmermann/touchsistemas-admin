/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import DatePicker from 'react-multi-date-picker';
import moment from 'moment';
import { partnerByReferralCode } from '../../graphql/queries';
import { createEvents } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { Loading, Alert, Title, Uploading } from '../../components';
import { getAddressFromCEP, normalizeCEP, validateEmail } from '../../helpers';
import { ROUTES, LANGUAGES } from '../../constants';

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
	dates: '',
	method: '',
	gift: '',
	giftDescription: '',
	prizeDraw: '',
	prizeDrawDescription: '',
};

export default function EventForm({ plan }) {
	const navigate = useNavigate();
	const [loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [formEvent, setFormEvent] = useState(initial);
	const [eventLogo, setEventLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].subscriptions.logo);
	const [progress, setProgress] = useState();

	// TODO: fix dates format to language
	function handleDatesChange(value) {
		const dates = value.toString().split(',');
		const fomartedDates = dates.map((d) => moment(d, 'DD-MM-YYYY').format('YYYY-MM-DD'));
		setFormEvent({ ...formEvent, dates: fomartedDates });
	}

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
			setEventLogo(file);
		}
		setErrorMsg('');
		setError(false);
		setLoading(false);
		return null;
	}

	async function graphCreateEvent(partnerID, planID) {
		console.debug(partnerID, planID);
		// const { data } = await API.graphql(
		// 	graphqlOperation(createEvents, {
		// 		input: {
		// 			name: formEvent.name,
		// 			website: formEvent.website || null,
		// 			email: formEvent.email || null,
		// 			zipCode: formEvent.zipCode.replace(/\D/g, ''),
		// 			state: formEvent.state,
		// 			city: formEvent.city,
		// 			street: formEvent.street,
		// 			number: formEvent.number,
		// 			complement: formEvent.complement,
		// 			description
		// 			referralCode: formEvent.referralCode || null,
		// 			dates: formEvent.dates,
		// 			method: formEvent.method,
		// 			gift
		// 			giftDescription
		// 			prizeDraw
		// 			prizeDrawDescription
		// 			PlanID
		// 			ClientID
		// 			PartnerID
		// 		},
		// 	})
		// );
		// return data.createEvent;
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
				setProgress(parseInt((p.loaded / p.total) * 100, 10));
			},
		});
		setProgress(0);
	}

	function changeStep() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formEvent.name || !formEvent.zipCode || !formEvent.state || !formEvent.city) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.email && !validateEmail(formEvent.email)) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.requiredEmail);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.invalidZipCode);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.website) {
			if (formEvent.website.charAt(0).toLocaleLowerCase() !== 'h') {
				formEvent.website = `http://${formEvent.website}`;
			}
			if (formEvent.website.charAt(formEvent.website.length - 1) === '/') {
				formEvent.website = formEvent.website.slice(0, -1);
			}
		}
		setLoading(false);
		setStep(2);
		return true;
	}

	async function handleAdd() {
		setErrorMsg('');
		setError(false);
		setLoading(true);

		let partnerID = null;
		if (formEvent.referralCode) {
			const getPartner = await API.graphql(
				graphqlOperation(partnerByReferralCode, { referralCode: formEvent.referralCode })
			);
			if (getPartner?.data?.partnerByReferralCode?.items.length <= 0) {
				setErrorMsg(LANGUAGES[state.lang].subscriptions.invalidPartner);
				setError(true);
				setLoading(false);
				return null;
			}
			partnerID = getPartner.data.partnerByReferralCode.items[0].id;
		}
		const newEvent = await graphCreateEvent(partnerID);
		if (eventLogo) await addEventLogo(newEvent);
		await addEventMap(newEvent);
		loadClient();
		setFormEvent(initial);
		setLoading(false);
		navigate(`${ROUTES[state.lang].EVENTS}/${newEvent.id}`, { state: { success: true } });
		return true;
	}

	useEffect(() => {
		if (!plan) navigate(ROUTES[state.lang].NEW);
		else {
			setFormEvent({
				...formEvent,
				method: plan.type.toLocaleLowerCase() === 'basic' ? 'EMAIL' : '',
				gift: plan.type.toLocaleLowerCase() === 'basic' ? 'NO' : '',
				prizeDraw: plan.type.toLocaleLowerCase() === 'basic' ? 'NO' : '',
			});
		}
	}, []);

	function renderStepFlow() {
		return (
			<ul className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0 justify-evenly mx-auto mb-4">
				<li
					className={`border-b-2 px-4 ${step === 1 ? 'border-primary font-bold' : 'border-slate-300 text-slate-400'}`}
				>
					<button type="button" onClick={() => setStep(1)}>
						1 - {LANGUAGES[state.lang].events.stepOne}
					</button>
				</li>
				<li
					className={`border-b-2 px-4 ${step === 2 ? 'border-primary font-bold' : 'border-slate-300 text-slate-400'}`}
				>
					<button type="button" onClick={() => setStep(2)}>
						2 - {LANGUAGES[state.lang].events.stepTwo}
					</button>
				</li>
			</ul>
		);
	}

	function renderStepOne() {
		return (
			<div className="flex flex-wrap w-full">
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formEvent.name || ''}
						onChange={(e) => setFormEvent({ ...formEvent, name: e.target.value })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].events.name} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formEvent.website || ''}
						onChange={(e) => setFormEvent({ ...formEvent, website: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].events.website}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<input
						value={formEvent.email || ''}
						onChange={(e) => setFormEvent({ ...formEvent, email: e.target.value })}
						type="email"
						placeholder={LANGUAGES[state.lang].events.email}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formEvent.zipCode || ''}
						onChange={(e) => handleChangeCEP(e.target.value)}
						type="text"
						placeholder={`${LANGUAGES[state.lang].events.zipCode} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<select
						value={formEvent.state || ''}
						onChange={(e) => setFormEvent({ ...formEvent, state: e.target.value })}
						placeholder={`${LANGUAGES[state.lang].events.state} *`}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{`${LANGUAGES[state.lang].events.state} *`}</option>
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
						placeholder={`${LANGUAGES[state.lang].events.city} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<input
						value={formEvent.street || ''}
						onChange={(e) => setFormEvent({ ...formEvent, street: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].events.street}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 sm:pr-4 mb-4">
					<input
						value={formEvent.number || ''}
						onChange={(e) => setFormEvent({ ...formEvent, number: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].events.number}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 mb-4">
					<input
						value={formEvent.complement || ''}
						onChange={(e) => setFormEvent({ ...formEvent, complement: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].events.complement}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
			</div>
		);
	}

	function renderStepTwo() {
		return (
			<div className="flex flex-wrap w-full">
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<input
						value={formEvent.referralCode || ''}
						onChange={(e) => setFormEvent({ ...formEvent, referralCode: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].events.referralCode}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 mb-4">
					<DatePicker
						onChange={handleDatesChange}
						format="DD/MM/YYYY"
						multiple
						weekDays={LANGUAGES[state.lang].events.weekDays}
						months={LANGUAGES[state.lang].events.months}
						minDate={new Date()}
						style={{
							border: '1px solid #d1d5db',
							borderRadius: '4px',
							padding: '8px',
							height: '40px',
						}}
						placeholder={`${LANGUAGES[state.lang].events.dates} *`}
					/>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
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
				<div className="w-full md:w-6/12 mb-4">
					<select
						value={formEvent.method || ''}
						onChange={(e) => setFormEvent({ ...formEvent, method: e.target.value })}
						disabled={plan.type.toLocaleLowerCase() === 'basic'}
						placeholder={`${LANGUAGES[state.lang].events.method} *`}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{`${LANGUAGES[state.lang].events.method} *`}</option>
						<option value="SMS">SMS</option>
						<option value="EMAIL">EMAIL</option>
					</select>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<select
						value={formEvent.gift || ''}
						onChange={(e) => setFormEvent({ ...formEvent, gift: e.target.value })}
						disabled={plan.type.toLocaleLowerCase() === 'basic'}
						placeholder={`${LANGUAGES[state.lang].events.gift} *`}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{`${LANGUAGES[state.lang].events.gift} *`}</option>
						<option value="YES">{LANGUAGES[state.lang].yes}</option>
						<option value="NO">{LANGUAGES[state.lang].no}</option>
					</select>
				</div>
				<div className="w-full md:w-6/12 mb-4">
					<select
						value={formEvent.prizeDraw || ''}
						onChange={(e) => setFormEvent({ ...formEvent, prizeDraw: e.target.value })}
						disabled={plan.type.toLocaleLowerCase() === 'basic'}
						placeholder={`${LANGUAGES[state.lang].events.prizeDraw} *`}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{`${LANGUAGES[state.lang].events.prizeDraw} *`}</option>
						<option value="YES">{LANGUAGES[state.lang].yes}</option>
						<option value="NO">{LANGUAGES[state.lang].no}</option>
					</select>
				</div>
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{!!progress && <Uploading progress={progress} />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text={LANGUAGES[state.lang].events.title} />
			<form className="flex flex-wrap bg-white p-4 mb-8 rounded-md shadow-md">
				{renderStepFlow()}
				{step === 1 && renderStepOne()}
				{step === 2 && renderStepTwo()}
				<div className="w-full flex justify-center">
					<button
						type="button"
						onClick={() => (step === 1 ? changeStep() : handleAdd())}
						className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
					>
						{step === 1 ? LANGUAGES[state.lang].events.continue : LANGUAGES[state.lang].events.add}
					</button>
				</div>
			</form>
		</>
	);
}
