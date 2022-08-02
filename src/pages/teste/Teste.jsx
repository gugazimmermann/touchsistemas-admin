/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as subscriptions from '../../graphql/subscriptions';
import mock from './mock.json';

export default function Teste() {
	async function run() {
		const allClients = await API.graphql({ query: queries.listClients });
		const allPartners = await API.graphql({ query: queries.listPartners });
		for (const client of mock) {
			for (const event of client.events) {
				const clientObj = allClients.data.listClients.items.find((p) => p.name === client.name);
				const partnerObj = allPartners.data.listPartners.items.find((p) => p.referralCode === event.referralCode);
				// const newEvent = await API.graphql(
				// 	graphqlOperation(mutations.createEvent, {
				// 		input: {
				// 			referralCode: event.referralCode,
				// 			plan: event.plan,
				// 			name: event.name,
				// 			website: event.website.toLocaleLowerCase(),
				// 			email: event.email.toLocaleLowerCase(),
				// 			zipCode: event.zipCode,
				// 			state: event.state,
				// 			city: event.city,
				// 			street: event.street,
				// 			number: event.number,
				// 			description: event.description,
				// 			dates: event.dates,
				// 			clientID: clientObj.id,
				// 			partnerID: partnerObj.id
				// 		},
				// 	})
				// );
				// console.log(newEvent.data.createEvent)
			}
		}
	}

	return (
		<div className="p-20">
			<button onClick={() => run()} type="button" className="border border-amber-500 p-4 bg-amber-100">
				Run
			</button>
		</div>
	);
}
