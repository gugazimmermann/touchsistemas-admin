import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useCookies } from 'react-cookie';
import { AppContext } from '../context';
import { decodeCookie } from '../helpers/cookies';
import ROUTES from './constants';

export default function PublicRoute() {
	const { state } = useContext(AppContext);
	const [cookies] = useCookies(['touchsistemas']);

	const seeUser = async () => {
		try {
			await Auth.currentAuthenticatedUser();
			return true;
		} catch (err) {
			return false;
		}
	};

	if (decodeCookie(cookies?.touchsistemas)?.client && seeUser()) return <Navigate to={ROUTES[state.lang].DASHBOARD} replace />;
	return <Outlet />;
}
