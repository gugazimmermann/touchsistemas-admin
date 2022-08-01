import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Input, Typography, Button } from '@material-tailwind/react';
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
		<section className="container h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center flex-wrap h-full">
				<div className="w-3/4 my-8 sm:w-2/5">
					<img src={ConfirmationCodeImage} alt="Confirmation Code" />
				</div>
				<form className="w-3/4 sm:w-1/4">
					<LogoAuth styles="mb-5 text-primary" />
					<Typography className="text-center mb-3">Insira o código de verificação</Typography>
					<Alert error={error} />
					<div className="mb-3">
						<Input
							value={email}
							type="email"
							variant="standard"
							color="amber"
							label="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Input
							value={code}
							type="text"
							variant="standard"
							color="amber"
							label="Código de Verificação"
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<Button
						className={`w-full text-white ${
							disabled() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary cursor-pointer'
						}`}
						onClick={() => confirmSignUp()}
						disabled={disabled()}
					>
						Confirmar
					</Button>
					<div className="mt-4 flex justify-center">
						<Link
							to="/"
							className="text-primary hover:text-secondary focus:text-secondary active:text-blue-800 duration-200 transition ease-in-out"
						>
							<Typography variant="lead">Voltar para Entrar</Typography>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
