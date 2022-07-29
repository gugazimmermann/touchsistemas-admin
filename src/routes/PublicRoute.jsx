import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { decodeCookie } from '../utils/cookies';

export default function PublicRoute() {
	const [cookies] = useCookies(['touchsistemas']);
	if (decodeCookie(cookies?.touchsistemas)?.email) return <Navigate to="/dashboard" replace />;
	return <Outlet />;
}
