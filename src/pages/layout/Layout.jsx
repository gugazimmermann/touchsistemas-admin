import { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth } from 'aws-amplify';
import { decodeCookie } from '../../helpers/cookies';
import Logger from '../../helpers/logger';
import { AppContext } from '../../context';
import { ROUTES } from '../../constants';
import { Loading } from '../../components';
import Nav from './nav/Nav';
import { getClient, listOwners } from '../../api/queries';

export default function Layout() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(AppContext);
	const [cookies, , removeCookie] = useCookies(['touchsistemas']);
	const [, setClient] = useState();
	const [loading, setLoading] = useState(false);

	async function signOut() {
		try {
			await Auth.signOut({ global: true });
		} catch (error) {
			Logger('SignOut', error);
		}
		removeCookie('touchsistemas');
		navigate(ROUTES[state.lang].HOME);
	}

	// set force = true to reload
	async function loadClient(force) {
		setLoading(true);
		if (!state.client || force) {
			const clientID = decodeCookie(cookies?.touchsistemas)?.client;
			const client = await getClient(clientID);
			setClient(client);
			dispatch({ type: 'UPDATE_CLIENT', payload: client });
			Logger('Loading Client', client);
			const alerts = [];
			if (!client?.phone) alerts.push({ type: 'register' });
			const owners = await listOwners(clientID);
			if (!owners) alerts.push({ type: 'owner' });
			dispatch({ type: 'UPDATE_ALERT', payload: alerts });
			if (alerts.length) navigate(ROUTES[state.lang].ALERTS);
		}
		setLoading(false);
	}

	useEffect(() => {
		loadClient();
	}, []);

	return (
		<main className="mx-auto h-screen">
			{loading && <Loading />}
			<Nav signout={signOut} />
			<div className="mx-auto max-w-screen-lg p-4">
				<Outlet context={{ loadClient }} />
			</div>
		</main>
	);
}
