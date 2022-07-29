import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Input, Typography, Button } from '@material-tailwind/react';
import ForgotPasswordImage from '../../icons/ForgotPassword.svg';
import LogoAuth from '../../components/LogoAuth';
import Loading from '../../components/Loading';
import Alert from './components/Alert';

export default function ForgotPassword() {
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	async function sendCode() {
		setLoading(true);
		setError(false);
		try {
			await Auth.forgotPassword(email);
			navigate('/redefinir-senha', { state: { email } });
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	const disabled = () => email === ''

	return (
		<section className="container h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center flex-wrap h-full">
				<div className="w-3/4 my-8 sm:w-2/5">
					<img src={ForgotPasswordImage} alt="Forgot Password" />
				</div>
				<form className="w-3/4 sm:w-1/4">
					<LogoAuth styles="mb-5 text-primary" />
					<Alert error={error} />
					<div className="mb-3">
						<Input value={email} type="email" variant="standard" color="amber" label="Email" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<Button
						className={`w-full text-white ${disabled() ? 'bg-grey-400 cursor-not-allowed' : 'bg-primary cursor-pointer'}`}
						onClick={() => sendCode()}
						disabled={disabled()}
					>
						Enviar Código
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
