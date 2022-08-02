import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Button, Input, Select, Option } from '@material-tailwind/react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateClient } from '../../graphql/mutations';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import Owners from './Owners';
import { getAddressFromCEP, normalizeCEP, normalizePhone } from '../../helpers';

const initial = {
	name: '',
	phone: '',
	email: '',
	website: '',
	zipCode: '',
	city: '',
	state: '',
	street: '',
	number: '',
};

export default function Profile() {
	const navigate = useNavigate();
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [formClient, setFormClient] = useState(initial);

	useEffect(() => {
		if (client) {
			setFormClient({
				name: client.name,
				phone: client.phone,
				email: client.email,
				website: client.website,
				zipCode: client.zipCode,
				city: client.city,
				state: client.state,
				street: client.street,
				number: client.number,
			});
		}
	}, [client]);

	async function handleUpdate() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (
			!formClient.name ||
			!formClient.phone ||
			!formClient.zipCode ||
			!formClient.city ||
			!formClient.state ||
			!formClient.street
		) {
			setErrorMsg('Preencha todos os dados!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formClient.phone.length < 15) {
			setErrorMsg('Telefone do Responsável inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formClient.zipCode.length < 10) {
			setErrorMsg('CEP do Responsável inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		await API.graphql(
			graphqlOperation(updateClient, {
				input: {
					id: client.id,
					name: formClient.name,
					phone: formClient.phone,
					website: formClient.website,
					zipCode: formClient.zipCode,
					city: formClient.city,
					state: formClient.state,
					street: formClient.street,
					number: formClient.number,
				},
			})
		);
		loadClient();
		navigate('/dashboard');
		setLoading(false);
		return true;
	}

	function handleChangePhone(value) {
		setFormClient({ ...formClient, phone: normalizePhone(value) });
	}

	function handleChangeCEP(value) {
		setFormClient({ ...formClient, zipCode: normalizeCEP(value) });
	}

	const getAddress = async () => {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(formClient.zipCode.replace(/\D/g,''));
			setFormClient({
				...formClient,
				state: address.state,
				city: address.city,
				street: address.street,
			});
		} catch (err) {
			setErrorMsg(err.message);
			setError(true);
		}
		setLoading(false)
	};

	useEffect(() => {
		if (formClient?.zipCode?.length === 10) {
			getAddress();
		}
	}, [formClient.zipCode]);

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<h2 className="text-primary text-xl p-2 pt-6">Cadastro</h2>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full md:w-6/12 pr-4 mb-4">
						<Input
							value={formClient.name || ''}
							onChange={(e) => setFormClient({ ...formClient, name: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Nome da Empresa"
						/>
					</div>
					<div className="w-full md:w-6/12 mb-4">
						<Input
							value={formClient.phone || ''}
							onChange={(e) => handleChangePhone(e.target.value)}
							type="text"
							color="orange"
							variant="standard"
							label="Telefone"
						/>
					</div>
					<div className="w-full md:w-6/12 pr-4 mb-4">
						<Input
							value={formClient.email || ''}
							type="text"
							color="orange"
							variant="standard"
							label="Email"
							disabled
						/>
					</div>
					<div className="w-full md:w-6/12 mb-4">
						<Input
							value={formClient.website || ''}
							onChange={(e) => setFormClient({ ...formClient, website: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="WebSite"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formClient.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							color="orange"
							variant="standard"
							label="CEP"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formClient.city || ''}
							onChange={(e) => setFormClient({ ...formClient, city: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Cidade"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<Select
							value={formClient.state || ''}
							onChange={(e) => setFormClient({ ...formClient, state: e.target.value })}
							color="orange"
							variant="standard"
							label="Estado"
						>
							<Option value="AC">Acre</Option>
							<Option value="AL">Alagoas</Option>
							<Option value="AP">Amapá</Option>
							<Option value="AM">Amazonas</Option>
							<Option value="BA">Bahia</Option>
							<Option value="CE">Ceará</Option>
							<Option value="DF">Distrito Federal</Option>
							<Option value="ES">Espírito Santo</Option>
							<Option value="GO">Goiás</Option>
							<Option value="MA">Maranhão</Option>
							<Option value="MT">Mato Grosso</Option>
							<Option value="MS">Mato Grosso do Sul</Option>
							<Option value="MG">Minas Gerais</Option>
							<Option value="PA">Pará</Option>
							<Option value="PB">Paraíba</Option>
							<Option value="PR">Paraná</Option>
							<Option value="PE">Pernambuco</Option>
							<Option value="PI">Piauí</Option>
							<Option value="RJ">Rio de Janeiro</Option>
							<Option value="RN">Rio Grande do Norte</Option>
							<Option value="RS">Rio Grande do Sul</Option>
							<Option value="RO">Rondônia</Option>
							<Option value="RR">Roraima</Option>
							<Option value="SC">Santa Catarina</Option>
							<Option value="SP">São Paulo</Option>
							<Option value="SE">Sergipe</Option>
							<Option value="TO">Tocantins</Option>
						</Select>
					</div>
					<div className="w-full md:w-8/12 pr-4 mb-4">
						<Input
							value={formClient.street || ''}
							onChange={(e) => setFormClient({ ...formClient, street: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Rua"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<Input
							value={formClient.number || ''}
							onChange={(e) => setFormClient({ ...formClient, number: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Número"
						/>
					</div>
					<div className="w-full flex justify-center">
						<Button size="sm" onClick={() => handleUpdate()} className="bg-primary">
							Atualizar Cadastro
						</Button>
					</div>
				</div>
			</form>
			{client && (
				<Owners
					clientID={client.id}
					ownersList={client.Owners.items}
					setError={setError}
					setErrorMsg={setErrorMsg}
					setLoading={setLoading}
					loadClient={loadClient}
				/>
			)}
		</>
	);
}
