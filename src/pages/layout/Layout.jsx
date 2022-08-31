import { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { decodeCookie } from '../../helpers/cookies';
import Logger from '../../helpers/logger';
import { AppContext } from '../../context';
import { ROUTES } from '../../constants';
import { Loading } from '../../components';
import Nav from './nav/Nav';

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

	async function handleLogo(clientID) {
		// TODO: remove unused images from Storage Bucket and add new value logo in client DB
		const list = await Storage.list(`logo/${clientID}`);
		if (list?.length) return `${process.env.REACT_APP_IMAGES_URL}logo/${clientID}.png?${new Date().getTime()}`;
		return null;
	}

	async function loadClient(force) {
		setLoading(true);
		if (!state.client || force) {
			const clientID = decodeCookie(cookies?.touchsistemas)?.client;
			const {
				data: { getClient },
			} = await API.graphql(graphqlOperation(queries.getClient, { id: clientID }));
			getClient.logo = await handleLogo(getClient.id);
			setClient(getClient);
			dispatch({ type: 'UPDATE_CLIENT', payload: getClient });
			Logger('Loading Client', getClient);
			const alerts = [];
			if (!getClient?.phone) alerts.push({ type: 'register' });
			if (!getClient?.Owners?.items.length) alerts.push({ type: 'owner' });
			dispatch({ type: 'UPDATE_ALERT', payload: alerts });
			if (alerts.length) navigate(ROUTES[state.lang].ALERTS);
		}
		setLoading(false);
	}

	async function loadPlans() {
		setLoading(true);
		if (!state.plans.length) {
			const {
				data: {
					planByActive: { items },
				},
			} = await API.graphql(graphqlOperation(queries.planByActive, { active: 'TRUE' }));
			dispatch({ type: 'UPDATE_PLANS', payload: items });
		}
		setLoading(false);
	}

	async function loadData() {
		await loadPlans();
		await loadClient();
	}

	useEffect(() => {
		loadData();
	}, []);

	return (
		<main className="mx-auto h-screen">
			{loading && <Loading />}
			<Nav signout={signOut} />
			<div className="mx-auto max-w-screen-lg p-4">
				<Outlet context={[loadClient]} />
			</div>
		</main>
	);
}
