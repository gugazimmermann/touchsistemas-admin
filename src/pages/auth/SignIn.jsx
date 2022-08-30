import { useContext, useState } from 'react';
import { useOutletContext, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';

export default function SignIn() {
	const [, , , signIn] = useOutletContext();
	const location = useLocation();
	const { state } = useContext(AppContext);
	const [email, setEmail] = useState(location?.state?.email || '');
	const [pwd, setPwd] = useState('');
	const [remember, setRemember] = useState(false);

	const disabled = () => email === '' || pwd === '';

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
			<div className="mb-4">
				<input
					type="password"
					value={pwd}
					onChange={(e) => setPwd(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].password}
				/>
			</div>
			<div className="flex justify-between items-center mb-4">
				<div className="form-group form-check">
					<input
						type="checkbox"
						defaultChecked={remember}
						onChange={() => setRemember(!remember)}
						className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					<label className="form-check-label inline-block" htmlFor="exampleCheck2">
						{LANGUAGES[state.lang].remember}
					</label>
				</div>
				<Link
					to={ROUTES[state.lang].FORGOT_PASSWORD}
					className="text-primary hover:text-secondary duration-200 transition ease-in-out"
				>
					{LANGUAGES[state.lang].forgotPassword}
				</Link>
			</div>
			<button
				type="button"
				onClick={() => signIn(email, pwd, remember)}
				disabled={disabled()}
				className={`${
					disabled()
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md'
				} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
			>
				{LANGUAGES[state.lang].signIn}
			</button>
			{/* <LoginSocial /> */}
			<div className="w-full text-center mt-6">
				<Link
					to={ROUTES[state.lang].REGISTER}
					className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out"
				>
					{LANGUAGES[state.lang].newRegister}
				</Link>
			</div>
		</form>
	);
}
