import { useContext, useEffect, useState } from 'react';
import { useOutletContext, Link, useLocation, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';

export default function RedefinePwd() {
	const [, , , , , redefinePassword] = useOutletContext();
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

	const disabled = () => email === '' || pwd === '' || repeat === '';

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
					type="text"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].auth.code}
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
			<div className="mb-4">
				<input
					type="password"
					value={repeat}
					onChange={(e) => setRepeat(e.target.value)}
					className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					placeholder={LANGUAGES[state.lang].auth.repeatPassword}
				/>
			</div>
			<button
				type="button"
				onClick={() => redefinePassword(email, code, pwd, repeat)}
				disabled={disabled()}
				className={`${
					disabled()
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md'
				} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
			>
				{LANGUAGES[state.lang].auth.redefine}
			</button>
			<div className="w-full text-center mt-6">
				<Link
					to={ROUTES[state.lang].HOME}
					className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out"
				>
					{LANGUAGES[state.lang].auth.backToSignIn}
				</Link>
			</div>
		</form>
	);
}
