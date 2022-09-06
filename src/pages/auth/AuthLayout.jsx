import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cookies from '../../helpers/cookies';
import Auth from '../../api/auth';
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

	const showImage = (i) => {
		if (i) return <img src={i} alt="SignUp" className="w-full" />;
		return null;
	}

	const startLoading = () => {
		setLoading(true);
		setError(false);
	};

	const stopLoading = () => {
		setError(false);
		setLoading(false);
	};

	const showError = () => {
		setError(true);
		setLoading(false);
		return false;
	};

	const signUp = async (email, pwd, repeat) => {
		startLoading();
		if (pwd !== repeat) return showError();
		try {
			await Auth.SignUp(email, pwd, state.lang);
			stopLoading();
			navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email } });
		} catch (err) {
			if (err.message === 'An account with the given email already exists.') {
				stopLoading();
				navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email, exists: true } });
			} else {
				return showError();
			}
		}
		return true;
	}

	const resendConfirmationCode = async (email) => {
		startLoading();
		try {
			await Auth.ReSendSignUp(email);
			stopLoading();
			navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, { state: { email, resent: true } });
		} catch (err) {
			return showError();
		}
		return true;
	}

	const confirmSignUp = async (email, code) => {
		startLoading();
		try {
			await Auth.ConfirmSignUp(email, code);
			stopLoading();
			navigate(ROUTES[state.lang].HOME, { state: { email } });
		} catch (err) {
			return showError();
		}
		return true;
	}

	const setClientCookie = (username, email, clientID) => {
		const encodedContent = Cookies.encode(JSON.stringify({ uuid: username, email, client: clientID }));
		const date = new Date();
		date.setDate(date.getDate() + 365);
		setCookie('touchsistemas', encodedContent, { expires: date, path: '/' });
	}

	const signIn = async (email, pwd, remember) => {
		startLoading();
		try {
			const { username, clientID } = await Auth.SignIn(email, pwd, remember);
			setClientCookie(username, email, clientID)
			stopLoading();
			navigate(ROUTES[state.lang].DASHBOARD);
		} catch (err) {
			return showError();
		}
		return true;
	}

	const sendForgotPasswordCode = async (email) => {
		startLoading();
		try {
			await Auth.ForgotPassword(email)
			stopLoading();
			navigate(ROUTES[state.lang].REDIFINE_PASSWORD, { state: { email } });
		} catch (err) {
			return showError();
		}
		return true;
	}

	const redefinePassword = async (email, code, pwd, repeat) => {
		console.debug(email, code, pwd, repeat)
		startLoading();
		if (pwd !== repeat) return showError();
		try {
			await Auth.ForgotPasswordSubmit(email, code, pwd)
			stopLoading();
			navigate(ROUTES[state.lang].HOME);
		} catch (err) {
			return showError();
		}
		return true;
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
