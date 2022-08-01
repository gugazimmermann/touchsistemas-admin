import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Input, Typography, Button } from '@material-tailwind/react';
import SignUpImage from '../../icons/SignUp.svg';
import LogoAuth from '../../components/LogoAuth';
import Loading from '../../components/Loading';

export default function RedefinePwd() {
	const location = useLocation();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [code, setCode] = useState('');
	const [pwd, setPwd] = useState('');
	const [repeat, setRepeat] = useState('');

	async function redefine() {
		setLoading(true);
		setError(false);
		if (pwd !== repeat) {
			setError(true);
			setLoading(false);
			return null;
		}
		try {
			await Auth.forgotPasswordSubmit(email, code, pwd);
			setLoading(false);
			navigate('/');
		} catch (err) {
			setError(true);
			setLoading(false);
		}
		return null;
	}

	const disabled = () => email === '' || pwd === '' || repeat === '';

	return (
		<section className="container h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center flex-wrap h-full">
				<div className="w-3/4 my-8 sm:w-2/5">
					<img src={SignUpImage} alt="Redefine Password" />
				</div>
				<form className="w-3/4 sm:w-1/4">
					<LogoAuth styles="mb-5 text-primary" />
					<div className={`text-danger my-2 text-center ${!error && 'hidden'}`}>
						<p>Ocorreu um erro, tente novamente.</p>
					</div>
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
							label="Código"
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Input
							value={pwd}
							type="password"
							variant="standard"
							color="amber"
							label="Nova Senha"
							onChange={(e) => setPwd(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Input
							value={repeat}
							type="password"
							variant="standard"
							color="amber"
							label="Repita a Senha"
							onChange={(e) => setRepeat(e.target.value)}
						/>
					</div>
					<Button
						className={`w-full text-white ${
							disabled() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary cursor-pointer'
						}`}
						onClick={() => redefine()}
						disabled={disabled()}
					>
						Redefinir
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
