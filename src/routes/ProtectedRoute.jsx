import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useCookies } from 'react-cookie';
import { AppContext } from '../context';
import Cookies from '../helpers/cookies';
import { ROUTES } from '../constants';

export default function ProtectedRoute() {
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

	if (!Cookies.decode(cookies?.touchsistemas)?.client || !seeUser()) {
		return <Navigate to={ROUTES[state.lang].HOME} replace />;
	}
	return <Outlet />;
}
