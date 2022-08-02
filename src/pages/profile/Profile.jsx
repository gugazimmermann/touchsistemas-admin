import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { Button, Input } from '@material-tailwind/react';
import * as mutations from '../../graphql/mutations';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import Owners from './Owners';
import { getAddressFromCEP } from '../../helpers';

const formClientInitialState = {
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
	const [formClient, setFormClient] = useState(formClientInitialState);

	async function updateClient() {
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
		await API.graphql({
			query: mutations.updateClient,
			variables: {
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
			},
		});
		loadClient();
		navigate('/dashboard');
		setLoading(false);
		return true;
	}

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

	const getAddress = async () => {
		try {
			const address = await getAddressFromCEP(formClient.zipCode);
			setFormClient({
				...formClient,
				state: address.state,
				city: address.city,
				street: address.street,
			});
		} catch (err) {
			setErrorMsg(err);
		}
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
							onChange={(e) => setFormClient({ ...formClient, phone: e.target.value })}
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
							onChange={(e) => setFormClient({ ...formClient, zipCode: e.target.value })}
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
						<Input
							value={formClient.state || ''}
							onChange={(e) => setFormClient({ ...formClient, state: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Estado"
						/>
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
						<Button size="sm" onClick={() => updateClient()} className="bg-primary">
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
