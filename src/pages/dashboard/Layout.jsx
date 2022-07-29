import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useCookies } from 'react-cookie';
import { decodeCookie } from '../../utils/cookies';
import * as queries from '../../graphql/queries';
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

	async function loadClient() {
		const clientID = decodeCookie(cookies?.touchsistemas)?.client;
		const oneClient = await API.graphql(graphqlOperation(queries.getClient, { id: clientID }));
		// eslint-disable-next-line no-console
		console.log(oneClient.data.getClient);
		setClient(oneClient.data.getClient);
	}

	useEffect(() => {
		loadClient();
	}, []);

	return (
		<main className="container mx-auto h-screen bg-white">
			<Nav client={client} signout={signOut} />
			<Outlet context={[client, loadClient]} />
		</main>
	);
}
