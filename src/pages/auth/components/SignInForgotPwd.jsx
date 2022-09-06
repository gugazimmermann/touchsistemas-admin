import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context';
import { LANGUAGES, ROUTES } from '../../../constants';

export default function SignInForgotPwd({ remember, setRemember }) {
	const { state } = useContext(AppContext);
	return (
		<div className="flex justify-between items-center mb-4">
			<div className="form-group form-check">
				<input
					type="checkbox"
					name="checkbox"
					id="checkbox"
					defaultChecked={remember}
					onChange={() => setRemember(!remember)}
					className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
				/>
				<label className="form-check-label inline-block" htmlFor="checkbox">
					{LANGUAGES[state.lang].auth.remember}
				</label>
			</div>
			<Link
				to={ROUTES[state.lang].FORGOT_PASSWORD}
				className="text-primary hover:text-secondary duration-200 transition ease-in-out"
			>
				{LANGUAGES[state.lang].auth.forgotPassword}
			</Link>
		</div>
	);
}
