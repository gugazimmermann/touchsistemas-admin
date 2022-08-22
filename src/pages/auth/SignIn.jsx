import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { clientsByEmail } from '../../graphql/queries';
import { encodeCookie } from '../../helpers/cookies';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { Language, LogoAuth, Loading } from '../../components';
import Alert from './components/Alert';
// import LoginSocial from './components/LoginSocial';
import SignInImage from '../../icons/SignIn.svg';

export default function SignIn() {
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [, setCookie] = useCookies(['touchsistemas']);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [pwd, setPwd] = useState('');
	const [remember, setRemember] = useState(false);

	async function signIn() {
		setLoading(true);
		setError(false);
		try {
			const auth = await Auth.signIn(email, pwd);
			if (auth.challengeName === 'NEW_PASSWORD_REQUIRED') await Auth.completeNewPassword(auth, pwd);
			if (remember) await Auth.rememberDevice();
			else await Auth.forgetDevice();
			const client = await API.graphql(graphqlOperation(clientsByEmail, { email }));
			const encodedContent = encodeCookie(
				JSON.stringify({ uuid: auth.username, email, client: client.data.clientsByEmail.items[0].id })
			);
			const date = new Date();
			date.setDate(date.getDate() + 365);
			setCookie('touchsistemas', encodedContent, { expires: date, path: '/' });
			setLoading(false);
			navigate(ROUTES[state.lang].DASHBOARD);
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	const disabled = () => email === '' || pwd === '';

	return (
		<section className="h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="container h-full fixed">
				{Language()}
				<div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
					<div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">
						<img src={SignInImage} alt="SignIn" className="w-full" />
					</div>
					<div className="w-10/12 md:w-5/12 lg:w-4/12">
						<LogoAuth styles="mb-5 text-primary" />
						<Alert error={error} />
						<form>
							<div className="mb-4">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
									placeholder={LANGUAGES[state.lang].email}
								/>
							</div>
							<div className="mb-4">
								<input
									type="password"
									value={pwd}
									onChange={(e) => setPwd(e.target.value)}
									className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
									placeholder={LANGUAGES[state.lang].password}
								/>
							</div>

							<div className="flex justify-between items-center mb-4">
								<div className="form-group form-check">
									<input
										type="checkbox"
										defaultChecked={remember}
										onChange={() => setRemember(!remember)}
										className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									/>
									<label className="form-check-label inline-block" htmlFor="exampleCheck2">
										{LANGUAGES[state.lang].remember}
									</label>
								</div>
								<Link
									to={ROUTES[state.lang].FORGOT_PASSWORD}
									className="text-primary hover:text-secondary duration-200 transition ease-in-out"
								>
									{LANGUAGES[state.lang].forgotPassword}
								</Link>
							</div>
							<button
								type="button"
								onClick={() => signIn()}
								disabled={disabled()}
								className={`${
									disabled()
										? 'bg-gray-600 cursor-not-allowed'
										: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg'
								} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
							>
								{LANGUAGES[state.lang].signIn}
							</button>
							<div className="w-full text-center mt-6">
								<Link
									to={ROUTES[state.lang].REGISTER}
									className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out"
								>
									{LANGUAGES[state.lang].newRegister}
								</Link>
							</div>
							{/* <LoginSocial /> */}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
