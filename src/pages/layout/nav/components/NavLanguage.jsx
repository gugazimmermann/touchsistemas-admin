import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context';
import { LANGUAGES, ROUTES } from '../../../../constants';
import useCloseMenu from '../../../../helpers/useCloseMenu';
import Arrow from '../../../../images/Arrow';
import BR from '../../../../images/flags/br.svg';
import EN from '../../../../images/flags/en.svg';
import ES from '../../../../images/flags/es.svg';

export default function NavLanguage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { state, dispatch } = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const ref = useCloseMenu(open, setOpen);

	function showFlag(lang) {
		switch (lang) {
			case 'br':
				return <img src={BR} alt="Português" className="w-6 h-6" />;
			case 'en':
				return <img src={EN} alt="English" className="w-6 h-6" />;
			case 'es':
				return <img src={ES} alt="Español" className="w-6 h-6" />;
			default:
				return <img src={BR} alt="Português" className="w-6 h-6" />;
		}
	}

	function handleChangeLanguage(language) {
		const currentPath = location.pathname.split('/').filter(p => p);
		const path = Object.keys(ROUTES[state.lang]).find(k => ROUTES[state.lang][k] === `/${currentPath[0].toLocaleLowerCase()}`);
		dispatch({ type: 'UPDATE_LANG', payload: language });
		currentPath.shift()
		const newPath = `${ROUTES[language][path]}/${currentPath.join('/')}`
		navigate(newPath);
		setOpen(false);
	}

	return (
		<div className="relative top-2">
			<button
				type="button"
				aria-controls="navbarLanguageContent"
				aria-expanded="false"
				aria-label="Toggle Language"
				className="flex items-center px-1"
				onClick={() => setOpen(!open)}
			>
				{showFlag(state.lang)}
				<Arrow styles={`w-4 h-4 ${open && 'rotate-180'}`} />
			</button>
			<div ref={ref} className={`${open ? 'absolute' : 'hidden'} flex flex-col gap-1 items-start p-1 bg-white`}>
				{Object.keys(LANGUAGES)
					.filter((l) => l !== state.lang)
					.map((l) => (
						<button key={l} type="button" onClick={() => handleChangeLanguage(l)}>
							{showFlag(l)}
						</button>
					))}
			</div>
		</div>
	);
}
