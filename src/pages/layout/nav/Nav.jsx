import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../../context';
import LogoIcon from '../../../images/LogoIcon';
import { ROUTES } from '../../../constants';
import { NavAlert, NavInfo, NavLanguage, NavProfile, } from './components';

export default function Nav({ client, signout }) {
	const { state } = useContext(AppContext);
	const location = useLocation();

	return (
		<nav className="w-full flex flex-wrap justify-center sm:justify-between shadow-md z-10 p-2 bg-white">
			<Link to={ROUTES[state.lang].DASHBOARD} className="flex flex-row items-center text-primary mb-2 sm:mb-0">
				<LogoIcon styles="h-8 w-8" />
				<p className="text-2xl">{process.env.REACT_APP_TITLE}</p>
			</Link>
			<div className="w-auto flex flex-row gap-4">
				<Link to={ROUTES[state.lang].DASHBOARD}>
					<i className={`bx ${location.pathname === ROUTES[state.lang].DASHBOARD ? 'bxs' : 'bx'}-grid-alt text-3xl`} />
				</Link>
				<Link to={ROUTES[state.lang].NEW}>
					<i className={`bx ${location.pathname === ROUTES[state.lang].NEW ? 'bxs' : 'bx'}-message-alt-add text-3xl`} />
				</Link>
				<NavInfo alerts={0} />
				<NavAlert alerts={0} />
				<NavLanguage />
				<NavProfile client={client} signout={signout} alerts={0} />
			</div>
		</nav>
	);
}
