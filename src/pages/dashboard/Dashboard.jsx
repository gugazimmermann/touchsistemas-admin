/* eslint-disable no-restricted-syntax */
import { Link, useOutletContext } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createSurvey } from '../../graphql/mutations';
import { Alert } from '../../components';
import Events from '../events/Events';
import survey from './survey7anos.json';

export default function Dashboard() {
	const [client] = useOutletContext();

	const profileLink = () => (
		<Link className="pl-2" to="/cadastro">
			Clique Aqui!
		</Link>
	);

	async function handleAdd() {
		for (const question of survey) {
			await API.graphql(
				graphqlOperation(createSurvey, {
					input: {
						order: question.order,
						question: question.question,
						type: question.type,
						answers: JSON.stringify(question.answers),
						EventID: question.eventID,
					},
				})
			);
		}
	}

	return (
		<>
			{client && !client?.phone && (
				<Alert type="danger">Seu Cadastro está incompleto, finalize para utilizar o sistema.{profileLink()}</Alert>
			)}
			{client && client.Owners.items.length === 0 && (
				<Alert type="warning"> Nenhum Resonsável Cadastrado! {profileLink()}</Alert>
			)}
			<div className='p-8'>
				<button type='button' onClick={() => handleAdd()}>Add</button>
			</div>
			<Events />
		</>
	);
}
