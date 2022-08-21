import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createClient } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { Language, LogoAuth, Loading } from '../../components';
import Alert from './components/Alert';
import SignUpImage from '../../icons/SignUp.svg';

export default function SignUp() {
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [repeat, setRepeat] = useState('');

	async function signUp() {
		setLoading(true);
		setError(false);
		if (pwd !== repeat) {
			setError(true);
			setLoading(false);
			return null;
		}
		try {
			await Auth.signUp({ username: email, password: pwd, attributes: { email } });
			await API.graphql(graphqlOperation(createClient, { input: { email } }));
			setLoading(false);
			navigate('/confirmar-cadastro', { state: { email } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
		return null;
	}

	const disabled = () => email === '' || pwd === '' || repeat === '';

	return (
		<section className="h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="container h-full fixed">
				{Language()}
				<div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
					<div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">
						<img src={SignUpImage} alt="SignUp" className="w-full" />
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
							<div className="mb-4">
								<input
									type="password"
									value={repeat}
									onChange={(e) => setRepeat(e.target.value)}
									className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
									placeholder={LANGUAGES[state.lang].repeatPassword}
								/>
							</div>
							<button
								type="button"
								onClick={() => signUp()}
								disabled={disabled()}
								className={`${
									disabled()
										? 'bg-gray-600 cursor-not-allowed'
										: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg'
								} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
							>
								{LANGUAGES[state.lang].register}
							</button>
							<div className="w-full text-center mt-6">
								<Link
									to={ROUTES[state.lang].HOME}
									className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out"
								>
									{LANGUAGES[state.lang].backToSignIn}
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
