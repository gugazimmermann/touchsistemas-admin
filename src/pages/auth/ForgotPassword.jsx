import { useContext, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';

export default function ForgotPassword() {
	const { state } = useContext(AppContext);
	const [, , , , sendForgotPasswordCode] = useOutletContext();
	const [email, setEmail] = useState('');

	const disabled = () => email === '';

	return (
		<form>
			<div className="mb-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].email}
				/>
			</div>
			<button
				type="button"
				onClick={() => sendForgotPasswordCode(email)}
				disabled={disabled()}
				className={`${
					disabled()
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md'
				} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
			>
				{LANGUAGES[state.lang].sendCode}
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
