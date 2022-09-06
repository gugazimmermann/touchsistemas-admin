import { useContext, useEffect, useState } from 'react';
import { useOutletContext, useLocation, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { AuthBackButton, AuthButton, Input } from './components';
import RedefinePwdImage from '../../images/auth/RedefinePwd.svg';

export default function RedefinePwd() {
	const { setImg, redefinePassword } = useOutletContext();
	const { state } = useContext(AppContext);
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [email, setEmail] = useState(location?.state?.email || '');
	const [code, setCode] = useState('');
	const [pwd, setPwd] = useState('');
	const [repeat, setRepeat] = useState('');

	useEffect(() => {
		if (searchParams.get('email')) setEmail(searchParams.get('email'));
		if (searchParams.get('code')) setCode(searchParams.get('code'));
	}, []);

	useEffect(() => {
		setImg(RedefinePwdImage);
	}, []);

	const disabled = () => email === '' || pwd === '' || repeat === '';

	return (
		<form>
			<div className="mb-4">
				<Input type="email" placeholder={LANGUAGES[state.lang].email} value={email} handler={setEmail} />
			</div>
			<div className="mb-4">
				<Input type="text" placeholder={LANGUAGES[state.lang].auth.code} value={code} handler={setCode} />
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
				text={LANGUAGES[state.lang].auth.redefine}
				disabled={disabled()}
				handler={() => redefinePassword(email, code, pwd, repeat)}
			/>
			<AuthBackButton text={LANGUAGES[state.lang].auth.backToSignIn} to={ROUTES[state.lang].HOME} />
		</form>
	);
}
