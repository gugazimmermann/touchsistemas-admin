import { useContext, useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { Alert } from './components';

export default function ConfirmSignUp() {
	const [, resendConfirmationCode, confirmSignUp] = useOutletContext();
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

	const disabledReSend = () => email === '';

	const disabled = () => email === '' || code === '';

	return (
		<form>
			<Alert error={exists} type={exists} text={LANGUAGES[state.lang].exist} />
			<Alert error={reSent} type={reSent} text={LANGUAGES[state.lang].checkEmail} />
			<div className="mb-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].email}
				/>
			</div>
			<div className="mb-4">
				<input
					type="text"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].code}
				/>
			</div>
			<div className="flex justify-end mb-4">
				<button
					type="button"
					onClick={() => resendConfirmationCode(email)}
					disabled={disabledReSend()}
					className={`duration-200 transition ease-in-out ${disabledReSend() ? 'text-slate-500' : 'text-primary hover:text-secondary'}`}
				>
					{LANGUAGES[state.lang].reSendCode}
				</button>
			</div>
			<button
				type="button"
				onClick={() => confirmSignUp(email, code)}
				disabled={disabled()}
				className={`${
					disabled()
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md'
				} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
			>
				{LANGUAGES[state.lang].confirm}
			</button>
			<div className="w-full text-center mt-6">
				<Link
					to={ROUTES[state.lang].HOME}
					className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out"
				>
					{LANGUAGES[state.lang].backToSignIn}
				</Link>
			</div>
		</form>
	);
}
