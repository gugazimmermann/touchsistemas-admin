/* eslint-disable react/jsx-no-useless-fragment */
import { Link, useOutletContext } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';

export default function Dashboard() {
	const [client] = useOutletContext();
	return (
		<>
			{!client?.phone && (
				<div className="mx-4 my-4">
					<Alert color="red">
						Seu Cadastro está incompleto, finalize para utilizar o sistema.
						<Link className="pl-2" to="/cadastro">
							Clique Aqui!
						</Link>
					</Alert>
				</div>
			)}
		</>
	);
}
