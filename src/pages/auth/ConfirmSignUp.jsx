import { useContext, useEffect, useState } from 'react';
import { useOutletContext, useLocation, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { Alert, AuthBackButton, AuthButton, Input } from './components';
import ConfirmationCode from '../../images/auth/ConfirmationCode.svg';

export default function ConfirmSignUp() {
	const { setImg, resendConfirmationCode, confirmSignUp } = useOutletContext();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const { state } = useContext(AppContext);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [exists] = useState(location?.state?.exists || false);
	const [reSent] = useState(location?.state?.resent || false);
	const [code, setCode] = useState('');

	useEffect(() => {
		if (searchParams.get('email')) setEmail(searchParams.get('email'));
		if (searchParams.get('code')) setCode(searchParams.get('code'));
	}, []);

	useEffect(() => {
		setImg(ConfirmationCode);
	}, []);

	const disabledReSend = () => email === '';

	const disabled = () => email === '' || code === '';

	return (
		<form>
			<Alert error={exists} type={exists} text={LANGUAGES[state.lang].auth.exist} />
			<Alert error={reSent} type={reSent} text={LANGUAGES[state.lang].auth.checkEmail} />
			<div className="mb-4">
				<Input type="email" placeholder={LANGUAGES[state.lang].email} value={email} handler={setEmail} />
			</div>
			<div className="mb-4">
				<Input type="text" placeholder={LANGUAGES[state.lang].auth.code} value={code} handler={setCode} />
			</div>
			<div className="flex justify-end mb-4">
				<button
					type="button"
					onClick={() => resendConfirmationCode(email)}
					disabled={disabledReSend()}
					className={`duration-200 transition ease-in-out ${
						disabledReSend() ? 'text-slate-500' : 'text-primary hover:text-secondary'
					}`}
				>
					{LANGUAGES[state.lang].auth.reSendCode}
				</button>
			</div>
			<AuthButton
				text={LANGUAGES[state.lang].confirm}
				disabled={disabled()}
				handler={() => confirmSignUp(email, code)}
			/>
			<AuthBackButton text={LANGUAGES[state.lang].auth.backToSignIn} to={ROUTES[state.lang].HOME} />
		</form>
	);
}
