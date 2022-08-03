import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Storage } from 'aws-amplify';
import LogoIcon from '../../../icons/LogoIcon';
import AvatarIcon from '../../../icons/AvatarIcon';

export default function Nav({ client, signout }) {
	const avatarMenuRef = useRef(null);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isAvatarOpen, setAvatarOpen] = useState(false);
	const [url, setUrl] = useState();

	async function logo() {
		const list = await Storage.list(`logo/${client.id}.png`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setUrl(getUrl);
		}
	}

	useEffect(() => {
		if (client) logo();
	}, [client]);

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isAvatarOpen && avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) setAvatarOpen(false);
		};
		document.addEventListener('mousedown', checkIfClickedOutside);
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [isAvatarOpen, setAvatarOpen]);

	return (
		<nav className="flex flex-wrap items-center justify-between md:py-2 shadow-md">
			<div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
				<Link to="/dashboard" className="flex flex-row items-center text-primary ">
					<LogoIcon styles="h-8 w-8" />
					<p className="text-2xl">{process.env.REACT_APP_TITLE}</p>
				</Link>

				<button
					className="md:hidden border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
					type="button"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
					onClick={() => setMenuOpen(!isMenuOpen)}
				>
					<i className="bx bx-menu text-3xl" />
				</button>

				<div className={`${isMenuOpen ? 'flex pb-4' : 'hidden'} w-full md:w-auto flex-col md:flex md:flex-row `}>
					<ul className="md:flex flex-row list-style-none">
						<li className="p-2 text-center md:text-base">
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li className="p-2 text-center md:text-base">
							<Link to="/evento-novo">Cadastrar Evento</Link>
						</li>
						<li className="p-2 text-center md:text-base">
							<Link to="/eventos-passados">Eventos Passados</Link>
						</li>
					</ul>

					<div className="flex justify-evenly">
						<Link to="/" className="mr-4 flex items-center" role="button" aria-expanded="false">
							<i className="bx bxs-message-check text-2xl" />
							<span className="text-white bg-secondary absolute rounded-full text-xs -mt-8 ml-3 py-0 px-1.5">1250</span>
						</Link>
						<Link to="/" className="mr-4 flex items-center" role="button" aria-expanded="false">
							<i className="bx bxs-bell text-2xl" />
							<span className="text-white bg-warning absolute rounded-full text-xs -mt-8 ml-3 py-0 px-1.5">1</span>
						</Link>
						<div className="relative pt-1">
							<button
								type="button"
								aria-controls="navbarAvatarContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
								onClick={() => setAvatarOpen(!isAvatarOpen)}
							>
								{url ? (
									<img alt="client logo" src={url} className="h-8 w-8 rounded" />
								) : (
									<AvatarIcon styles="h-8 w-8 text-primary" />
								)}
								<span className="text-white bg-danger absolute rounded-full text-xs -mt-10 ml-3 py-0 px-1.5">1</span>
							</button>
							<ul
								ref={avatarMenuRef}
								className={`${
									isAvatarOpen ? 'absolute' : 'hidden'
								} list-style-none w-48 -right-4 top-9 border bg-white`}
							>
								<li className="p-2 text-center">
									<Link to="/cadastro">Meu Cadastro</Link>
								</li>
								<li className="p-2 text-center">
									<Link to="/cadastro/pagamentos">Financeiro</Link>
								</li>
								<li className="p-2 text-center">
									<button type="button" onClick={() => signout()}>
										Sair
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
