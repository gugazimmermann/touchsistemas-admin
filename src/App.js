import { lazy, Suspense, useContext, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { AppContext } from './context';
import { ROUTES } from './constants';
import { Loading } from './components';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Logger from './helpers/logger';

const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const AuthLayout = lazy(() => import('./pages/auth/AuthLayout'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const RedefinePwd = lazy(() => import('./pages/auth/RedefinePwd'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ConfirmSignUp = lazy(() => import('./pages/auth/ConfirmSignUp'));
const Layout = lazy(() => import('./pages/layout/Layout'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Alerts = lazy(() => import('./pages/alerts/Alerts'));
const DashboardEvent = lazy(() => import('./pages/dashboard/Event/DashboardEvent'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Payments = lazy(() => import('./pages/profile/payments/Payments'));
const PlanSelection = lazy(() => import('./pages/plan-selection/PlanSelection'));
const New = lazy(() => import('./pages/plan-selection/New'));
const Subscriptions = lazy(() => import('./pages/subscriptions/Subscriptions'));
const SubscriptionDetail = lazy(() => import('./pages/subscriptions/SubscriptionDetail'));
const Events = lazy(() => import('./pages/events/Events'));
const EventDetail = lazy(() => import('./pages/events/EventDetail'));

function App() {
	const [searchParams] = useSearchParams();
	const { state, dispatch } = useContext(AppContext);
	// const language = window.navigator.userLanguage || window.navigator.language;
	// Logger('Navigator:', language);

	useEffect(() => {
		if (searchParams.get('lang')) {
			dispatch({ type: 'UPDATE_LANG', payload: searchParams.get('lang') });
		}
		Logger('Language:', state.lang);
	}, []);

	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route element={<AuthLayout />}>
						<Route path={ROUTES[state.lang].HOME} element={<SignIn />} />
						<Route path={ROUTES[state.lang].FORGOT_PASSWORD} element={<ForgotPassword />} />
						<Route path={ROUTES[state.lang].REDIFINE_PASSWORD} element={<RedefinePwd />} />
						<Route path={ROUTES[state.lang].REGISTER} element={<SignUp />} />
						<Route path={ROUTES[state.lang].CONFIRM_REGISTRATION} element={<ConfirmSignUp />} />
					</Route>
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path={ROUTES[state.lang].DASHBOARD} element={<Dashboard />} />
						<Route path={ROUTES[state.lang].ALERTS} element={<Alerts />} />
						<Route path={`${ROUTES[state.lang].DASHBOARD}/:id`} element={<DashboardEvent />} />
						<Route path={ROUTES[state.lang].PROFILE} element={<Profile />} />
						<Route path={`${ROUTES[state.lang].PAYMENTS}`} element={<Payments />} />
						<Route path={`${ROUTES[state.lang].NEW}`} element={<PlanSelection />} />
						<Route path={`${ROUTES[state.lang].NEW}/:type`} element={<New />} />
						<Route path={`${ROUTES[state.lang].SUBSCRIPTIONS}`} element={<Subscriptions />} />
						<Route path={`${ROUTES[state.lang].SUBSCRIPTIONS}/:id`} element={<SubscriptionDetail />} />
						<Route path={`${ROUTES[state.lang].EVENTS}`} element={<Events />} />
						<Route path={`${ROUTES[state.lang].EVENTS}/:id`} element={<EventDetail />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
