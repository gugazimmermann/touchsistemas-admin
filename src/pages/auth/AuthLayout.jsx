import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { encodeCookie } from '../../helpers/cookies';
import Logger from '../../helpers/logger';
import { AppContext } from '../../context';
import { ROUTES } from '../../constants';
import { Loading } from '../../components';
import { Alert, Flags, LogoAuth } from './components';

export default function AuthLayout() {
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [, setCookie] = useCookies(['touchsistemas']);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [img, setImg] = useState();

	async function signUp(email, pwd, repeat) {
		setLoading(true);
		setError(false);
		if (pwd !== repeat) {
			setError(true);
			setLoading(false);
			return;
		}
		try {
			await Auth.signUp({ username: email, password: pwd, attributes: { email, locale: state.lang } });
			await API.graphql(graphqlOperation(mutations.createClient, { input: { email } }));
			setError(false);
			setLoading(false);
			navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email } });
		} catch (err) {
			if (err.message === 'An account with the given email already exists.') {
				navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email, exists: true } });
				setError(false);
				setLoading(false);
			} else {
				setError(true);
				setLoading(false);
			}
		}
	}

	async function resendConfirmationCode(email) {
		try {
			await Auth.resendSignUp(email);
			navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email, resent: true } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	async function confirmSignUp(email, code) {
		setLoading(true);
		setError(false);
		try {
			await Auth.confirmSignUp(email, code);
			setError(false);
			setLoading(false);
			navigate(ROUTES[state.lang].HOME, { state: { email } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
		return null;
	}

	async function signIn(email, pwd, remember) {
		setLoading(true);
		setError(false);
		try {
			const auth = await Auth.signIn(email, pwd);
			Logger('Auth', auth);
			if (auth.challengeName === 'NEW_PASSWORD_REQUIRED') await Auth.completeNewPassword(auth, pwd);
			if (remember) await Auth.rememberDevice();
			else await Auth.forgetDevice();
			const {
				data: {
					clientByEmail: { items },
				},
			} = await API.graphql(graphqlOperation(queries.clientByEmail, { email: auth.attributes.email }));
			if (!items.length) throw new Error('Client not found');
			const encodedContent = encodeCookie(JSON.stringify({ uuid: auth.username, email, client: items[0].id }));
			const date = new Date();
			date.setDate(date.getDate() + 365);
			setCookie('touchsistemas', encodedContent, { expires: date, path: '/' });
			setError(false);
			setLoading(false);
			navigate(ROUTES[state.lang].DASHBOARD);
		} catch (err) {
			Logger('Auth Error', err);
			setError(true);
			setLoading(false);
		}
	}

	async function sendForgotPasswordCode(email) {
		setLoading(true);
		setError(false);
		try {
			await Auth.forgotPassword(email);
			setError(false);
			setLoading(false);
			navigate(ROUTES[state.lang].REDIFINE_PASSWORD, { state: { email } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	async function redefinePassword(email, code, pwd, repeat) {
		setLoading(true);
		setError(false);
		if (pwd !== repeat) {
			setError(true);
			setLoading(false);
			return null;
		}
		try {
			await Auth.forgotPasswordSubmit(email, code, pwd);
			setError(false);
			setLoading(false);
			navigate(ROUTES[state.lang].HOME);
		} catch (err) {
			setError(true);
			setLoading(false);
		}
		return null;
	}

	function showImage(i) {
		if (i) return <img src={i} alt="SignUp" className="w-full" />;
		return null;
	}

	return (
		<section className="h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="container h-full fixed">
				{Flags()}
				<div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
					<div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">{img && showImage(img)}</div>
					<div className="w-10/12 md:w-5/12 lg:w-4/12">
						<LogoAuth styles="mb-5 text-primary" />
						<Alert error={error} />
						<Outlet
							context={{
								setImg,
								signUp,
								resendConfirmationCode,
								confirmSignUp,
								signIn,
								sendForgotPasswordCode,
								redefinePassword,
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
