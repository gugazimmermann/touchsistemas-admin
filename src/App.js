import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import { Loading } from './components';

const NotFound = lazy(() => import('./pages/not-found/NotFound'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const RedefinePwd = lazy(() => import('./pages/auth/RedefinePwd'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ConfirmationCode = lazy(() => import('./pages/auth/ConfirmationCode'));
const Layout = lazy(() => import('./pages/layout/Layout'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const DashboardEvent = lazy(() => import('./pages/dashboard/Event/DashboardEvent'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Payments = lazy(() => import('./pages/profile/payments/Payments'));
const NewEvent = lazy(() => import('./pages/events/new/NewEvent'));
const Event = lazy(() => import('./pages/events/detail/EventDetail'));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<SignIn />} />
					<Route path="/esqueceu-senha" element={<ForgotPassword />} />
					<Route path="/redefinir-senha" element={<RedefinePwd />} />
					<Route path="/novo-cadastro" element={<SignUp />} />
					<Route path="/confirmar-cadastro" element={<ConfirmationCode />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/dashboard/:id" element={<DashboardEvent />} />
						<Route path="/cadastro" element={<Profile />} />
						<Route path="/cadastro/pagamentos" element={<Payments />} />
						<Route path="/eventos/novo" element={<NewEvent />} />
						<Route path="/eventos/:id" element={<Event />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
