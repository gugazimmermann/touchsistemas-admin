import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import ConfirmationCodeImage from '../../icons/ConfirmationCode.svg';
import LogoAuth from '../../components/LogoAuth';
import Loading from '../../components/Loading';
import Alert from './components/Alert';

export default function ConfirmationCode() {
	const location = useLocation();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [code, setCode] = useState('');

	async function confirmSignUp() {
		setLoading(true);
		setError(false);
		try {
			await Auth.confirmSignUp(email, code);
			setLoading(false);
			navigate('/', { state: { email } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
		return null;
	}

	const disabled = () => email === '' || code === '';

	return (
		<section className="h-screen container mx-auto bg-white">
			{loading && <Loading />}
			<div className="container h-full">
				<div className="h-full flex flex-col-reverse md:flex-row items-center justify-around">
					<div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0">
						<img src={ConfirmationCodeImage} alt="Confirmation Code" className="w-full" />
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
									className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
									placeholder="Email"
								/>
							</div>
							<div className="mb-4">
								<input
									type="text"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
									placeholder="Código de Verificação"
								/>
							</div>
							<button
								type="button"
								onClick={() => confirmSignUp()}
								disabled={disabled()}
								className={`${
									disabled()
										? 'bg-gray-600 cursor-not-allowed'
										: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg'
								} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
							>
								Confirmar
							</button>
							<div className="w-full text-center mt-6">
								<Link to="/" className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out">
									Voltar para Entrar
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
