import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context';
import { LANGUAGES, ROUTES } from '../../../constants';
import useCloseMenu from '../../../helpers/useCloseMenu';
import Arrow from '../../../images/Arrow';
import BR from '../../../images/flags/br.svg';
import EN from '../../../images/flags/en.svg';
import ES from '../../../images/flags/es.svg';

export default function Flags() {
	const location = useLocation();
	const navigate = useNavigate();
	const { state, dispatch } = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const ref = useCloseMenu(open, setOpen);

	function showFlag(lang) {
		if (lang === 'br') return <img src={BR} alt="Português" className="w-6 h-6" />;
		if (lang === 'en') return <img src={EN} alt="English" className="w-6 h-6" />;
		return <img src={ES} alt="Español" className="w-6 h-6" />;
	}

	function handleChangeLanguage(language) {
		const currentRoute = Object.keys(ROUTES[state.lang])
			.map((k) => ({ key: k, value: ROUTES[state.lang][k] }))
			.find((r) => r.value === location.pathname);
		dispatch({ type: 'UPDATE_LANG', payload: language });
		navigate(ROUTES[language][currentRoute.key]);
		setOpen(false);
	}

	return (
		<div className="absolute top-2 right-2 z-10">
			<button type="button" className="flex items-center px-1" onClick={() => setOpen(!open)}>
				{showFlag(state.lang)}
				<Arrow styles={`ml-1 w-4 h-4 ${open && 'rotate-180'}`} />
			</button>
			<ul ref={ref} className={`flex flex-col items-start pl-1 mt-2 ${!open && 'hidden'}`}>
				{Object.keys(LANGUAGES)
					.filter((l) => l !== state.lang)
					.map((l) => (
						<li key={l}>
							<button type="button" onClick={() => handleChangeLanguage(l)}>
								{showFlag(l)}
							</button>
						</li>
					))}
			</ul>
		</div>
	);
}
