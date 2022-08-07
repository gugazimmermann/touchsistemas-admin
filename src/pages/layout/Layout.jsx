import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { Loading } from '../../components';
import { decodeCookie } from '../../helpers/cookies';
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
		<main className="container mx-auto h-screen max-w-screen-lg bg-white">
			{loading && <Loading />}
			<Nav client={client} signout={signOut} />
			<div className="p-4 bg-white">
				<Outlet context={[client, loadClient]} />
			</div>
		</main>
	);
}
