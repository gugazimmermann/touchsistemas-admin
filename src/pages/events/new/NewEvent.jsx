import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import DatePicker from 'react-multi-date-picker';
import moment from 'moment';
import { partnersByReferralCode } from '../../../graphql/queries';
import { createEvent } from '../../../graphql/mutations';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';
import { getAddressFromCEP, normalizeCEP, validateEmail } from '../../../helpers';
import Title from '../../../components/Title';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

const initial = {
	referralCode: '',
	plan: '',
	name: '',
	website: '',
	email: '',
	zipCode: '',
	state: '',
	city: '',
	street: '',
	number: '',
	complement: '',
	description: '',
	dates: '',
};

export default function NewEvent() {
	const navigate = useNavigate();
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [formEvent, setFormEvent] = useState(initial);
	const [eventLogo, setEventLogo] = useState();

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
			if (file.size > 500 * 1024) {
				setErrorMsg('Imagem pode ter no máximo 1mb!');
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedTypes = ['image/png', 'image/jpeg'];
			if (!acceptedTypes.includes(file.type)) {
				setErrorMsg('Imagem deve ser PNG ou JPG!');
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedExtensions = ['jpg', 'jpeg', 'png'];
			if (!acceptedExtensions.includes(file.name.split('.').pop())) {
				setErrorMsg('Imagem deve ser PNG ou JPG!');
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

	async function graphCreateEvent(partnerID) {
		const { data } = await API.graphql(
			graphqlOperation(createEvent, {
				input: {
					referralCode: formEvent.referralCode || null,
					plan: formEvent.plan,
					name: formEvent.name,
					website: formEvent.website,
					email: formEvent.email,
					zipCode: formEvent.zipCode,
					state: formEvent.state,
					city: formEvent.city,
					street: formEvent.street,
					number: formEvent.number,
					complement: formEvent.complement,
					description: formEvent.description,
					dates: formEvent.dates,
					clientID: client.id,
					partnerID,
				},
			})
		);
		return data.createEvent;
	}

	async function addEventMap(newEvent) {
		const eventAddress = encodeURIComponent(
			`${newEvent.street}, ${newEvent.number} - ${newEvent.city} - ${newEvent.state}, ${newEvent.zipCode}`
		);
		const eventMarker = `markers=color:0xf59e0b%7Clabel:${newEvent.name[0]}%7C${eventAddress}`;
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${eventAddress}&zoom=17&size=1280x1280&scale=2&${eventMarker}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `${newEvent.id}.png`);
		await Storage.put(`maps/${newEvent.id}.png`, file, {
			contentType: 'image/png',
		});
	}

	async function addEventLogo(newEvent) {
		await Storage.put(`logo/${newEvent.id}.${eventLogo.name.split('.').pop()}`, eventLogo, {
			contentType: eventLogo.type,
		});
	}

	async function handleAdd() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formEvent.plan || !formEvent.name || !formEvent.zipCode || !formEvent.state || !formEvent.city) {
			setErrorMsg('Preencha todos os dados assinalados!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.email && !validateEmail(formEvent.email)) {
			setErrorMsg('Email inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formEvent.zipCode.length < 10) {
			setErrorMsg('CEP inválido!');
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
		const newEvent = await graphCreateEvent(partnerID);
		if (eventLogo) await addEventLogo(newEvent);
		await addEventMap(newEvent);
		loadClient();
		setFormEvent(initial);
		setLoading(false);
		navigate(`/eventos/${newEvent.id}`, { state: { success: true } });
		return true;
	}

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text="Novo Evento" />
			<form>
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.name || ''}
							onChange={(e) => setFormEvent({ ...formEvent, name: e.target.value })}
							type="text"
							placeholder="Nome *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.website || ''}
							onChange={(e) => setFormEvent({ ...formEvent, website: e.target.value })}
							type="text"
							placeholder="WebSite"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={formEvent.email || ''}
							onChange={(e) => setFormEvent({ ...formEvent, email: e.target.value })}
							type="email"
							placeholder="Email"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							placeholder="CEP *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formEvent.city || ''}
							onChange={(e) => setFormEvent({ ...formEvent, city: e.target.value })}
							type="text"
							placeholder="Cidade *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<select
							value={formEvent.state || ''}
							onChange={(e) => setFormEvent({ ...formEvent, state: e.target.value })}
							placeholder="Estado"
							className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">Selecione</option>
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
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<input
							value={formEvent.street || ''}
							onChange={(e) => setFormEvent({ ...formEvent, street: e.target.value })}
							type="text"
							placeholder="Rua"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 sm:pr-4 mb-4">
						<input
							value={formEvent.number || ''}
							onChange={(e) => setFormEvent({ ...formEvent, number: e.target.value })}
							type="text"
							placeholder="Número"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 mb-4">
						<input
							value={formEvent.complement || ''}
							onChange={(e) => setFormEvent({ ...formEvent, complement: e.target.value })}
							type="text"
							placeholder="Complemento"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full mb-4">
						<DatePicker
							onChange={handleDatesChange}
							format="DD/MM/YYYY"
							multiple
							weekDays={weekDays}
							months={months}
							minDate={new Date()}
							style={{
								border: '1px solid #d1d5db',
								borderRadius: '4px',
								padding: '8px',
								height: '40px',
							}}
							placeholder="Datas *"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<select
							onChange={(e) => setFormEvent({ ...formEvent, plan: e.target.value })}
							placeholder="Selecione o Plano *"
							className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">Selecione *</option>
							<option value="Básico">Básico - R$ 500,00</option>
							<option value="Avançado">Avançado - R$ 800,00</option>
							<option value="Pró">Pró - R$ 1.500,00</option>
						</select>
					</div>
					<div className="w-full md:w-6/12 mb-4">
						<input
							value={formEvent.referralCode || ''}
							onChange={(e) => setFormEvent({ ...formEvent, referralCode: e.target.value })}
							type="text"
							placeholder="Código de Referência"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full mb-4">
						<input
							onChange={(e) => handleFile(e)}
							type="file"
							placeholder="Logo"
							accept=".jpg,.jpeg,.png,image/png,image/jpeg"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full flex justify-center">
						<button
							type="button"
							onClick={() => handleAdd()}
							className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg transition duration-150 ease-in-out"
						>
							Adicionar Novo Evento
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
