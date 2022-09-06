import { useContext } from 'react';
import { AppContext } from '../../../context';
import { LANGUAGES } from '../../../constants';

export default function LanguageSelection({ language, setLanguage }) {
	const { state } = useContext(AppContext);
	return (
		<div className="w-full flex justify-center items-center">
			<select
				value={language || ''}
				onChange={(e) => setLanguage(e.target.value)}
				placeholder={`${LANGUAGES[state.lang].surveys.language} *`}
				className="bg-white px-4 py-2 mr-4 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
			>
				<option value="">{`${LANGUAGES[state.lang].surveys.language} *`}</option>
				{Object.keys(LANGUAGES).map((l) => (
					<option key={l} value={l}>
						{LANGUAGES[state.lang].surveys[l.toLocaleLowerCase()]}
					</option>
				))}
			</select>
		</div>
	);
}
