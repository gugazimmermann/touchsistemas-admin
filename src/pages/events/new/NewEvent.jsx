import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import DatePicker from 'react-multi-date-picker';
import moment from 'moment';
import { partnerByReferralCode } from '../../../graphql/queries';
import { createEvent } from '../../../graphql/mutations';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';
import { getAddressFromCEP, normalizeCEP, validateEmail } from '../../../helpers';

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
	description: '',
	dates: '',
};

export default function NewEvent() {
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [formEvent, setFormEvent] = useState(initial);

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
				graphqlOperation(partnerByReferralCode, { referralCode: formEvent.referralCode })
			);
			if (!getPartner?.data?.partnerByReferralCode?.items && !getPartner?.data?.partnerByReferralCode?.items.length) {
				setErrorMsg('Parceiro não encontrado!');
				setError(true);
				setLoading(false);
				return null;
			}
			partnerID = getPartner.data.partnerByReferralCode.items[0].id;
		}

		await API.graphql(
			graphqlOperation(createEvent, {
				input: {
					referralCode: formEvent.referralCode,
					plan: formEvent.plan,
					name: formEvent.name,
					website: formEvent.website,
					email: formEvent.email,
					zipCode: formEvent.zipCode,
					state: formEvent.state,
					city: formEvent.city,
					street: formEvent.street,
					number: formEvent.number,
					description: formEvent.description,
					dates: formEvent.dates,
					clientID: client.id,
					partnerID,
				},
			})
		);
		loadClient();
		setFormEvent(initial);
		setSuccess(true);
		setLoading(false);
		return true;
	}

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			{success && <Alert type="success">Evento Cadastrado com Sucesso</Alert>}
			<h2 className="text-primary text-xl p-2 pt-6">Novo Evento</h2>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<input
							value={formEvent.name || ''}
							onChange={(e) => setFormEvent({ ...formEvent, name: e.target.value })}
							type="text"
							placeholder="Nome *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
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
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<input
							value={formEvent.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							placeholder="CEP *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<input
							value={formEvent.city || ''}
							onChange={(e) => setFormEvent({ ...formEvent, city: e.target.value })}
							type="text"
							placeholder="Cidade *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={formEvent.state || ''}
							onChange={(e) => setFormEvent({ ...formEvent, state: e.target.value })}
							type="text"
							placeholder="Estado *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-8/12 pr-4 mb-4">
						<input
							value={formEvent.street || ''}
							onChange={(e) => setFormEvent({ ...formEvent, street: e.target.value })}
							type="text"
							placeholder="Rua"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<input
							value={formEvent.number || ''}
							onChange={(e) => setFormEvent({ ...formEvent, number: e.target.value })}
							type="text"
							placeholder="Número"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full mb-10">
						<DatePicker
							onChange={handleDatesChange}
							format="DD/MM/YYYY"
							multiple
							weekDays={weekDays}
							months={months}
							minDate={new Date()}
							style={{
								position: 'absolute',
								border: 'none',
								borderBottom: '1px solid #b0bec5',
								borderRadius: 0,
								width: '75%',
							}}
							placeholder="Datas"
						/>
					</div>
					<div className="w-full md:w-6/12 pr-4 mb-4">
						<select
							onChange={(e) => setFormEvent({ ...formEvent, plan: e })}
							placeholder="Selecione o Plano *"
							className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">Selecione</option>
							<option value="Básico">Básico - R$ 500,00</option>
							<option value="Avançado">Avançado - R$ 800,00</option>
							<option value="Pró">Pró - R$ 1.500,00</option>
						</select>
					</div>
					<div className="w-full md:w-6/12 pr-4 mb-4">
						<input
							value={formEvent.referralCode || ''}
							onChange={(e) => setFormEvent({ ...formEvent, referralCode: e.target.value })}
							type="text"
							placeholder="Código de Referência"
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
