/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Input, Alert, Select, Option } from '@material-tailwind/react';
import DatePicker from 'react-multi-date-picker';
import moment from 'moment';
import * as mutations from '../../graphql/mutations';
import Loading from '../../components/Loading';
import { validateEmail } from '../../helpers';
import getAddressFromCEP from '../../helpers/getAddressFromCEP';

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

const formEventInitialState = {
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

export default function Profile() {
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true)
	const [formEvent, setFormEvent] = useState(formEventInitialState);

	function handleDatesChange(value) {
		const dates = value.toString().split(',');
		const fomartedDates = dates.map((d) => moment(d, 'DD-MM-YYYY').format('YYYY-MM-DD'));
		setFormEvent({ ...formEvent, dates: fomartedDates });
	}

	const getAddress = async () => {
		try {
			const address = await getAddressFromCEP(formEvent.zipCode);
			setFormEvent({
				...formEvent,
				state: address.state,
				city: address.city,
				street: address.street,
			});
		} catch (err) {
			setErrorMsg(err);
		}
	};

	useEffect(() => {
		if (formEvent?.zipCode?.length === 10) {
			getAddress();
		}
	}, [formEvent.zipCode]);

	async function addEvent() {
		console.log(formEvent);
		console.log(client.id);
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formEvent.plan || !formEvent.name || !formEvent.zipCode || !formEvent.state || !formEvent.city) {
			setErrorMsg('Preencha todos os dados assinalados!');
			setError(true);
			setLoading(false);
			return null;
		}
		await API.graphql(
			graphqlOperation(mutations.createEvent, {
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
				},
			})
		);
		loadClient();
		setFormEvent(formEventInitialState);
		setSuccess(true)
		setLoading(false);
		return true;
	}

	return (
		<>
			{loading && <Loading />}
			{error && (
				<div className="mx-4 my-4">
					<Alert color="red">{errorMsg}</Alert>
				</div>
			)}
			{success && (
				<div className="mx-4 my-4">
					<Alert color="green">Evento Cadastrado com Sucesso</Alert>
				</div>
			)}
			<h2 className="text-primary text-xl p-2 pt-6">Novo Evento</h2>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formEvent.name || ''}
							onChange={(e) => setFormEvent({ ...formEvent, name: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Nome *"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formEvent.website || ''}
							onChange={(e) => setFormEvent({ ...formEvent, website: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="WebSite"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<Input
							value={formEvent.email || ''}
							onChange={(e) => setFormEvent({ ...formEvent, email: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Email"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formEvent.zipCode || ''}
							onChange={(e) => setFormEvent({ ...formEvent, zipCode: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="CEP *"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formEvent.city || ''}
							onChange={(e) => setFormEvent({ ...formEvent, city: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Cidade *"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<Input
							value={formEvent.state || ''}
							onChange={(e) => setFormEvent({ ...formEvent, state: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Estado *"
						/>
					</div>
					<div className="w-full md:w-8/12 pr-4 mb-4">
						<Input
							value={formEvent.street || ''}
							onChange={(e) => setFormEvent({ ...formEvent, street: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Rua"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formEvent.number || ''}
							onChange={(e) => setFormEvent({ ...formEvent, number: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Número"
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
						<Select
							onChange={(e) => setFormEvent({ ...formEvent, plan: e })}
							color="orange"
							variant="standard"
							label="Selecione o Plano *"
						>
							<Option value="Básico">Básico</Option>
							<Option value="Avançado">Avançado</Option>
							<Option value="Pró">Pró</Option>
						</Select>
					</div>
					<div className="w-full md:w-6/12 pr-4 mb-4">
						<Input
							value={formEvent.referralCode || ''}
							onChange={(e) => setFormEvent({ ...formEvent, referralCode: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Código de Referência"
						/>
					</div>
					<div className="w-full flex justify-center">
						<Button size="sm" onClick={() => addEvent()} className="bg-primary">
							Adicionar Novo Evento
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
