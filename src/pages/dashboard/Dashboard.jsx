/* eslint-disable react/jsx-no-useless-fragment */
import { Link, useOutletContext } from 'react-router-dom';
import Alert from '../../components/Alert';

export default function Dashboard() {
	const [client] = useOutletContext();

	const profileLink = () => (
		<Link className="pl-2" to="/cadastro">
			Clique Aqui!
		</Link>
	);

	return (
		<>
			{client && !client?.phone && (
				<Alert type="danger">Seu Cadastro está incompleto, finalize para utilizar o sistema.{profileLink()}</Alert>
			)}
			{client && client.Owners.items.length === 0 && (
				<Alert type="warning"> Nenhum Resonsável Cadastrado! {profileLink()}</Alert>
			)}
		</>
	);
}
