import { useContext, useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { AuthBackButton, AuthButton, Input, SignInForgotPwd } from './components';
// import {AuthBackButton, AuthButton, Input, SignInForgotPwd, SignInSocial} from './components';
import SignInImage from '../../images/auth/SignIn.svg';

export default function SignIn() {
	const { setImg, signIn } = useOutletContext();
	const location = useLocation();
	const { state } = useContext(AppContext);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [pwd, setPwd] = useState('');
	const [remember, setRemember] = useState(false);

	useEffect(() => {
		setImg(SignInImage);
	}, []);

	const disabled = () => email === '' || pwd === '';

	return (
		<form>
			<div className="mb-4">
				<Input type="email" placeholder={LANGUAGES[state.lang].email} value={email} handler={setEmail} />
			</div>
			<div className="mb-4">
				<Input type="password" placeholder={LANGUAGES[state.lang].password} value={pwd} handler={setPwd} />
			</div>
			<SignInForgotPwd remember={remember} setRemember={setRemember} />
			<AuthButton
				text={LANGUAGES[state.lang].auth.signIn}
				disabled={disabled()}
				handler={() => signIn(email, pwd, remember)}
			/>
			{/* <SignInSocial /> */}
			<AuthBackButton text={LANGUAGES[state.lang].auth.newRegister} to={ROUTES[state.lang].REGISTER} />
		</form>
	);
}
