/* eslint-disable no-unused-vars */
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../../icons/LogoIcon';
import AvatarIcon from '../../../icons/AvatarIcon';

export default function Nav({ client, signout }) {
	return (
		<Navbar className="mx-auto rounded-none px-0 py-0 pl-6">
			<div className="container flex flex-row items-center justify-between p-0">
				<div className="flex flex-row items-center text-primary ">
					<LogoIcon styles="h-8 w-8" />
					<p className="text-2xl">{process.env.REACT_APP_TITLE}</p>
				</div>
				<div className="flex flex-row justify-center">
					<Button variant="text" color="green" className="text-text">
						Cadastrar Evento
					</Button>
					<Button variant="text" color="orange" className="text-text">
						Eventos Passados
					</Button>
					<Menu>
						<MenuHandler>
							<Button variant="text">
								<AvatarIcon styles="h-8 w-8 text-primary" />
							</Button>
						</MenuHandler>
						<MenuList>
							<MenuItem><Link to="/cadastro">Meu Cadastro</Link></MenuItem>
							<MenuItem><Link to="/pagamentos">Meus Pagamentos</Link></MenuItem>
							<MenuItem onClick={() => signout()}>Sair</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</div>
		</Navbar>
	);
}
