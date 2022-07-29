import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { useCookies } from 'react-cookie';
import { Alert } from '@material-tailwind/react';
import { decodeCookie } from '../../utils/cookies';
import { Client } from '../../models';
import Nav from './components/Nav';

export default function Layout() {
	const navigate = useNavigate();
	const [cookies, , removeCookie] = useCookies(['touchsistemas']);
	const [client, setClient] = useState();

	async function signOut() {
		await Auth.signOut();
		removeCookie('touchsistemas');
		navigate('/');
	}

	async function getClient() {
		const clientID = decodeCookie(cookies?.touchsistemas)?.client;
		const res = await DataStore.query(Client, clientID);
		// eslint-disable-next-line no-console
		console.log(res);
		setClient(res);
	}

	useEffect(() => {
		getClient();
	}, []);

	return (
		<main className="container mx-auto h-screen bg-white">
			<Nav client={client} signout={signOut} />
			{!client?.phone && (
				<div className="mx-4 my-4">
					<Alert color="red">Seu Cadastro está incompleto, finalize para utilizar o sistema.</Alert>
				</div>
			)}
			<Outlet context={[client]} />
		</main>
	);
}
