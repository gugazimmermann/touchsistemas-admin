import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { useCookies } from 'react-cookie';
import { Input, Checkbox, Typography, Button } from '@material-tailwind/react';
import { Client } from '../../models';
import { encodeCookie } from '../../utils/cookies';
import SignInImage from '../../icons/SignIn.svg';
import LogoAuth from '../../components/LogoAuth';
import Loading from '../../components/Loading';
import Alert from './components/Alert';
// TODO: criar os social login
// import LoginSocial from './components/LoginSocial';

// TODO: melhorar mensagens de erro e validação de email
export default function SignIn() {
	const location = useLocation();
	const navigate = useNavigate();
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
			let expires = '';
			if (remember) {
				const date = new Date();
				date.setDate(date.getDate() + 365);
				expires = date;
			}
			const client = await DataStore.query(Client, (c) => c.email('eq', email));
			const encodedContent = encodeCookie(JSON.stringify({ uuid: auth.username, email, client: client[0].id }));
			setCookie('touchsistemas', encodedContent, { expires, path: '/' });
			setLoading(false);
			navigate('/dashboard');
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	const disabled = () => email === '' || pwd === '';

	return (
		<section className="container h-screen mx-auto bg-white">
			{loading && <Loading />}
			<div className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center flex-wrap h-full">
				<div className="w-3/4 my-8 sm:w-2/5">
					<img src={SignInImage} alt="SignIn" />
				</div>
				<form className="w-3/4 sm:w-1/4">
					<LogoAuth styles="mb-5 text-primary" />
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
							value={pwd}
							type="password"
							variant="standard"
							color="amber"
							label="Senha"
							onChange={(e) => setPwd(e.target.value)}
						/>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex justify-start items-center">
							<Checkbox color="amber" defaultChecked={remember} onChange={() => setRemember(!remember)} />
							<Typography variant="small">Lembrar?</Typography>
						</div>
						<Link
							to="/esqueceu-senha"
							className="text-primary hover:text-secondary focus:text-secondary active:text-blue-800 duration-200 transition ease-in-out"
						>
							<Typography variant="small">Esqueceu a Senha?</Typography>
						</Link>
					</div>
					<Button
						className={`w-full text-white ${
							disabled() ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary cursor-pointer'
						}`}
						onClick={() => signIn()}
						disabled={disabled()}
					>
						Entrar
					</Button>
					{/* <LoginSocial /> */}
					<div className="mt-4 flex justify-center">
						<Link
							to="/cadastrar"
							className="text-primary hover:text-secondary focus:text-secondary active:text-blue-800 duration-200 transition ease-in-out"
						>
							<Typography variant="lead">Faça seu Cadastro</Typography>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
