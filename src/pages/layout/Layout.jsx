import { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { decodeCookie } from '../../helpers/cookies';
import { AppContext } from '../../context';
import { ROUTES } from '../../constants';
import { Loading } from '../../components';
import Nav from './nav/Nav';

export default function Layout() {
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [cookies, , removeCookie] = useCookies(['touchsistemas']);
	const [client, setClient] = useState();
	const [loading, setLoading] = useState(false);

	async function signOut() {
		try {
			await Auth.signOut({ global: true });
		} catch (error) {
			console.error(error);
		}
		removeCookie('touchsistemas');
		navigate(ROUTES[state.lang].HOME);
	}

	async function loadClient() {
		setLoading(true);
		const clientID = decodeCookie(cookies?.touchsistemas)?.client;
		const {
			data: { getClient },
		} = await API.graphql(graphqlOperation(queries.getClient, { id: clientID }));
		setClient(getClient);
		setLoading(false);
	}

	useEffect(() => {
		loadClient();
	}, []);

	return (
		<main className="container mx-auto h-screen max-w-screen-lg bg-slate-50">
			{loading && <Loading />}
			<Nav client={client} signout={signOut} />
			<div className="p-4 ">
				<Outlet context={[client, loadClient]} />
			</div>
		</main>
	);
}
