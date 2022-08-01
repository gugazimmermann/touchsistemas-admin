/* eslint-disable no-unused-vars */
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as subscriptions from '../../graphql/subscriptions';

export default function Teste() {

	async function run() {
		const all = await API.graphql({ query: queries.listEvents });
		console.log(all.data.listPartners.items)
	}

	return (
		<div className="p-20">
			<button onClick={() => run()} type="button" className="border border-amber-500 p-4 bg-amber-100">
				Run
			</button>
		</div>
	);
}
