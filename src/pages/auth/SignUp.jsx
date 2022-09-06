import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { AuthBackButton, AuthButton, Input } from './components';
import SignUpImage from '../../images/auth/SignUp.svg';

export default function SignUp() {
	const { state } = useContext(AppContext);
	const { setImg, signUp } = useOutletContext();
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [repeat, setRepeat] = useState('');

	useEffect(() => {
		setImg(SignUpImage);
	}, []);

	const disabled = () => email === '' || pwd === '' || repeat === '';

	return (
		<form>
			<div className="mb-4">
				<Input type="email" placeholder={LANGUAGES[state.lang].email} value={email} handler={setEmail} />
			</div>
			<div className="mb-4">
				<Input type="password" placeholder={LANGUAGES[state.lang].password} value={pwd} handler={setPwd} />
			</div>
			<div className="mb-4">
				<Input
					type="password"
					placeholder={LANGUAGES[state.lang].auth.repeatPassword}
					value={repeat}
					handler={setRepeat}
				/>
			</div>
			<AuthButton
				text={LANGUAGES[state.lang].auth.register}
				disabled={disabled()}
				handler={() => signUp(email, pwd, repeat)}
			/>
			<AuthBackButton text={LANGUAGES[state.lang].auth.backToSignIn} to={ROUTES[state.lang].HOME} />
		</form>
	);
}
