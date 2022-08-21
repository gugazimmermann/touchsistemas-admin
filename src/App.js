import { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context';
import { ROUTES } from './constants';
import { Loading } from './components';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const RedefinePwd = lazy(() => import('./pages/auth/RedefinePwd'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ConfirmationCode = lazy(() => import('./pages/auth/ConfirmationCode'));
const Layout = lazy(() => import('./layout/Layout'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const DashboardEvent = lazy(() => import('./pages/dashboard/Event/DashboardEvent'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Payments = lazy(() => import('./pages/profile/payments/Payments'));
const PlanSelection = lazy(() => import('./pages/events/new/PlanSelection'));
const Event = lazy(() => import('./pages/events/detail/EventDetail'));

function App() {
	const { state } = useContext(AppContext);
	// const language = window.navigator.userLanguage || window.navigator.language;
	if (process.env.NODE_ENV === 'development') console.debug('Language:', state.lang);
	console.debug(ROUTES);

	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path={ROUTES[state.lang].HOME} element={<SignIn />} />
					<Route path={ROUTES[state.lang].FORGOT_PASSWORD} element={<ForgotPassword />} />
					<Route path={ROUTES[state.lang].REDIFINE_PASSWORD} element={<RedefinePwd />} />
					<Route path={ROUTES[state.lang].REGISTER} element={<SignUp />} />
					<Route path={ROUTES[state.lang].CONFIRM_REGISTRATION} element={<ConfirmationCode />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path={ROUTES[state.lang].DASHBOARD} element={<Dashboard />} />
						<Route path={`${ROUTES[state.lang].DASHBOARD}/:id`} element={<DashboardEvent />} />
						<Route path={ROUTES[state.lang].PROFILE} element={<Profile />} />
						<Route path={`${ROUTES[state.lang].PAYMENTS}`} element={<Payments />} />
						<Route path={`${ROUTES[state.lang].NEW}/:plan`} element={<PlanSelection />} />
						<Route path={`${ROUTES[state.lang].EVENTS}/:id`} element={<Event />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
