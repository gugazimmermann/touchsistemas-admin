import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import { AppContext } from '../../../../context';
import { LANGUAGES, ROUTES } from '../../../../constants';
import useCloseMenu from '../../../../helpers/useCloseMenu';
import AvatarIcon from '../../../../images/AvatarIcon';
import Arrow from '../../../../images/Arrow';

export default function NavProfile({ client, signout, alerts }) {
	const { state } = useContext(AppContext);
	const location = useLocation();
	const [url, setUrl] = useState();
	const [open, setOpen] = useState(false);
	const ref = useCloseMenu(open, setOpen);

	async function logo() {
		const list = await Storage.list(`logo/${client.id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setUrl(getUrl);
		}
	}

	useEffect(() => {
		if (client) logo();
	}, [client]);

	useEffect(() => {
		setOpen(false);
	}, [location]);

	return (
		<div className="relative pt-1">
			<button
				type="button"
				aria-controls="navbarAvatarContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
				className="flex items-center px-1"
				onClick={() => setOpen(!open)}
			>
				{url ? (
					<img alt="client logo" src={url} className="h-8 w-8 rounded" />
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
			<ul ref={ref} className={`${open ? 'absolute' : 'hidden'} list-style-none w-48 right-0 top-9 border bg-white`}>
				<li className="p-2 text-center">
					<Link to={ROUTES[state.lang].PROFILE}>{LANGUAGES[state.lang].nav.profile}</Link>
				</li>
				<li className="p-2 text-center">
					<Link to={ROUTES[state.lang].PAYMENTS}>{LANGUAGES[state.lang].nav.payments}</Link>
				</li>
				<li className="p-2 text-center">
					<button type="button" onClick={() => signout()}>
						{LANGUAGES[state.lang].nav.logout}
					</button>
				</li>
			</ul>
		</div>
	);
}
