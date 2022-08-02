import { Outlet, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useCookies } from 'react-cookie';
import { decodeCookie } from '../utils/cookies';

export default function ProtectedRoute() {
	const [cookies] = useCookies(['touchsistemas']);

	const seeUser = async () => {
		try {
			await Auth.currentAuthenticatedUser();
			return true
		} catch (err) {
			return false;
		}
	}

	if (!decodeCookie(cookies?.touchsistemas)?.client || !seeUser()) {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
}
