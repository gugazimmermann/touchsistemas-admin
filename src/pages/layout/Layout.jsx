import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useCookies } from 'react-cookie';
import Loading from '../../components/Loading';
import { decodeCookie } from '../../utils/cookies';
import * as queries from '../../graphql/queries';
import Nav from './nav/Nav';

export default function Layout() {
	const navigate = useNavigate();
	const [cookies, , removeCookie] = useCookies(['touchsistemas']);
	const [client, setClient] = useState();
	const [loading, setLoading] = useState(false);

	async function signOut() {
		try {
			await Auth.signOut();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		removeCookie('touchsistemas');
		navigate('/');
	}

	async function loadClient() {
		setLoading(true);
		const clientID = decodeCookie(cookies?.touchsistemas)?.client;
		const oneClient = await API.graphql(graphqlOperation(queries.getClient, { id: clientID }));
		setClient(oneClient.data.getClient);
		setLoading(false);
	}

	useEffect(() => {
		loadClient();
	}, []);

	return (
		<main className="container mx-auto h-screen bg-white">
			{loading && <Loading />}
			<Nav client={client} signout={signOut} />
			<Outlet context={[client, loadClient]} />
		</main>
	);
}
