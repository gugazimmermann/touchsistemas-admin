import { ReactElement, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context';
import { showLink, useCloseModal } from '../helpers';
import AvatarIcon from '../images/AvatarIcon';
import ArrowIcon from '../images/ArrowIcon';
import { LANG, ROUTES } from '../languages';

type NavProfileProps = {
  handleSignOut: () => void;
  qtd: number;
}

const NavProfile = ({ handleSignOut, qtd }:NavProfileProps): ReactElement => {
	const { state } = useContext(AppContext);
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const ref = useCloseModal(open, setOpen);

	useEffect(() => {
		setOpen(false);
	}, [location]);

	return (
		<div className="relative">
			<button
				type="button"
				aria-controls="navbarAvatarContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
				className="flex items-center px-1"
				onClick={() => setOpen(!open)}
			>
				{state.client?.logo ? (
					<img alt="client logo" src={state.client?.logo} className="h-8 w-8 rounded" />
				) : (
					<AvatarIcon styles="h-8 w-8 text-primary" />
				)}
				{!!qtd && (
					<span className="text-white bg-orange-500 absolute rounded-full text-xs -top-0.5 right-2 py-0 px-1.5">
						{qtd}
					</span>
				)}
				<ArrowIcon styles={`w-4 h-4 ${open && 'rotate-180'}`} />
			</button>
			<ul
				ref={ref}
				className={`${open ? 'absolute' : 'hidden'} list-style-none w-48 right-0 top-9 bg-white border rounded-md shadow-mdz-50`}
			>
				<li className="p-2 text-center">
					<Link to={ROUTES[state.lang].PROFILE}>{LANG[state.lang].nav.profile}</Link>
				</li>
				{showLink(state) && (
					<li className="p-2 text-center">
						<Link to={ROUTES[state.lang].PAYMENTS}>{LANG[state.lang].nav.payments}</Link>
					</li>
				)}
				<li className="p-2 text-center">
					<button type="button" onClick={() => handleSignOut()}>
						{LANG[state.lang].nav.logout}
					</button>
				</li>
			</ul>
		</div>
	);
}

export default NavProfile;
