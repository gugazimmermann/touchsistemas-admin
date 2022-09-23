import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { Client, Owner, Plan } from '../models';
import { ClientByEmailRespose, ListOwnersRespose, ListPlansRespose } from '../ts/types';

const ClientByEmail = async (email: string): Promise<Client | null> => {
	const { data: { clientByEmail: { items } } } = await (API.graphql(graphqlOperation(queries.clientByEmail, { email })) as Promise<ClientByEmailRespose>);
	return items.length ? items[0] : null;
};

export async function listOwners(ClientID: string): Promise<Owner[] | null> {
	const { data: { ownersByClientID: { items } } } = await (API.graphql(graphqlOperation(queries.ownersByClientID, { ClientID })) as Promise<ListOwnersRespose>);
	if (!items.length) return null;
	return items;
}

export async function listPlans(): Promise<Plan[] | null> {
	const { data: { planByActive: { items } } } = await (API.graphql(graphqlOperation(queries.planByActive, { active: 'TRUE' })) as Promise<ListPlansRespose>);
	if (!items.length) return null;
	return items;
}

const Queries = { ClientByEmail, listOwners, listPlans };

export default Queries;
