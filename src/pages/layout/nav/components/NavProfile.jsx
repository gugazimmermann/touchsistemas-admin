import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../../../context';
import { LANGUAGES, ROUTES } from '../../../../constants';
import useCloseMenu from '../../../../helpers/useCloseMenu';
import AvatarIcon from '../../../../images/AvatarIcon';
import Arrow from '../../../../images/Arrow';
import { showLink } from '../../../../helpers/general';

export default function NavProfile({ signout, alerts }) {
	const { state } = useContext(AppContext);
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const ref = useCloseMenu(open, setOpen);

	async function handleSignOut() {
		await signout();
	}

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
				{!!alerts && (
					<span className="text-white bg-orange-500 absolute rounded-full text-xs -top-0.5 right-2 py-0 px-1.5">
						10
					</span>
				)}
				<Arrow styles={`w-4 h-4 ${open && 'rotate-180'}`} />
			</button>
			<ul
				ref={ref}
				className={`${open ? 'absolute' : 'hidden'} list-style-none w-48 right-0 top-9 border bg-white z-50`}
			>
				<li className="p-2 text-center">
					<Link to={ROUTES[state.lang].PROFILE}>{LANGUAGES[state.lang].nav.profile}</Link>
				</li>
				{showLink(state) && (
					<li className="p-2 text-center">
						<Link to={ROUTES[state.lang].PAYMENTS}>{LANGUAGES[state.lang].nav.payments}</Link>
					</li>
				)}
				<li className="p-2 text-center">
					<button type="button" onClick={() => handleSignOut()}>
						{LANGUAGES[state.lang].nav.logout}
					</button>
				</li>
			</ul>
		</div>
	);
}
