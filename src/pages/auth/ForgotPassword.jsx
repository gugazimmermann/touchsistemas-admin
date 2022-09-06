import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { AuthBackButton, AuthButton, Input } from './components';
import ForgotPasswordImage from '../../images/auth/ForgotPassword.svg';

export default function ForgotPassword() {
	const { state } = useContext(AppContext);
	const { setImg, sendForgotPasswordCode } = useOutletContext();
	const [email, setEmail] = useState('');

	useEffect(() => {
		setImg(ForgotPasswordImage);
	}, []);

	const disabled = () => email === '';

	return (
		<form>
			<div className="mb-4">
				<Input type="email" placeholder={LANGUAGES[state.lang].email} value={email} handler={setEmail} />
			</div>
			<AuthButton
				text={LANGUAGES[state.lang].auth.sendCode}
				disabled={disabled()}
				handler={() => sendForgotPasswordCode(email)}
			/>
			<AuthBackButton text={LANGUAGES[state.lang].auth.backToSignIn} to={ROUTES[state.lang].HOME} />
		</form>
	);
}
