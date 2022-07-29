import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Input, Alert } from '@material-tailwind/react';
import * as mutations from '../../graphql/mutations';
import Loading from '../../components/Loading';
import { validateEmail } from '../../helpers';
import getAddressFromCEP from '../../helpers/getAddressFromCEP';

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
const formOwnerInitialState = {
	name: '',
	phone: '',
	email: '',
};

export default function Profile() {
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [formClient, setFormClient] = useState(formClientInitialState);
	const [formOwner, setFormOwner] = useState(formOwnerInitialState);

	async function changeClient() {
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
		setFormOwner(formClientInitialState);
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

	async function addOwner() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formOwner.email || !validateEmail(formOwner.email) || !formOwner.name || !formOwner.phone) {
			setErrorMsg('Preencha todos os dados!');
			setError(true);
			setLoading(false);
			return null;
		}
		await API.graphql(
			graphqlOperation(mutations.createOwner, {
				input: {
					name: formOwner.name,
					phone: formOwner.phone,
					email: formOwner.email,
					clientID: client.id,
				},
			})
		);
		loadClient();
		setFormOwner(formOwnerInitialState);
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
							label="Nome"
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
						<Button size="sm" onClick={() => changeClient()} className="bg-primary">
							Atualizar Cadastro
						</Button>
					</div>
				</div>
			</form>
			<h3 className="text-primary text-xl p-2">Proprietário</h3>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formOwner.name || ''}
							onChange={(e) => setFormOwner({ ...formOwner, name: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Nome"
						/>
					</div>
					<div className="w-full md:w-4/12 pr-4 mb-4">
						<Input
							value={formOwner.phone || ''}
							onChange={(e) => setFormOwner({ ...formOwner, phone: e.target.value })}
							type="text"
							color="orange"
							variant="standard"
							label="Telefone"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<Input
							value={formOwner.email || ''}
							onChange={(e) => setFormOwner({ ...formOwner, email: e.target.value })}
							type="email"
							color="orange"
							variant="standard"
							label="Email"
						/>
					</div>
					<div className="w-full flex justify-center">
						<Button size="sm" onClick={() => addOwner()} className="bg-primary">
							Adicionar Proprietário
						</Button>
					</div>
				</div>
			</form>
			{client?.Owners?.items && client?.Owners?.items.length > 0 && (
				<div className="overflow-x-auto p-4">
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th className="px-2 text-sm font-normal text-primary border-b border-solid border-primary whitespace-nowrap text-left">
									Nome
								</th>
								<th className="px-2 text-sm font-normal text-primary border-b border-solid border-primary whitespace-nowrap text-left">
									Telefone
								</th>
								<th className="px-2 text-sm font-normal text-primary border-b border-solid border-primary whitespace-nowrap text-left">
									Email
								</th>
							</tr>
						</thead>
						<tbody>
							{client.Owners.items.map((owner) => (
								<tr key={owner.email}>
									<th className="border-b text-sm border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{owner.name}
									</th>
									<th className="border-b text-sm border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{owner.phone}
									</th>
									<th className="border-b text-sm border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{owner.email}
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
