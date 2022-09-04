import { API, graphqlOperation } from 'aws-amplify';
import { PLANS } from '../constants';
import * as mutations from '../graphql/mutations';
import { normalizeWebsite } from '../helpers/forms';

export async function updateClient(id, client) {
	const { data } = await API.graphql(
		graphqlOperation(mutations.updateClient, {
			input: {
				id,
				name: client.name,
				phone: `+55${client.phone.replace(/[^\d]/g, '')}`,
				doctype: client.docType,
				document: client.document.replace(/[^\d]/g, ''),
				website: normalizeWebsite(client.website),
				zipCode: client.zipCode.replace(/[^\d]/g, ''),
				city: client.city,
				state: client.state,
				street: client.street,
				number: client.number,
				complement: client.complement,
			},
		})
	);
	return data.updateClient;
}

export async function updateClientLogoAndMap(id, logo, map) {
	const { data } = await API.graphql(graphqlOperation(mutations.updateClient, { input: { id, logo, map } }));
	return data.updateClient;
}

export async function updateClientContentMap(id, type, qtd) {
	const input = type === PLANS.SUBSCRIPTION ? { id, subscriptionsMap: qtd } : { id, eventssMap: qtd }
	const { data } = await API.graphql(graphqlOperation(mutations.updateClient, { input }));
	return data.updateClient;
}

export async function createOwner(owner, clientID) {
	const { data } = await API.graphql(
		graphqlOperation(mutations.createOwner, {
			input: {
				name: owner.name,
				phone: `+55${owner.phone.replace(/[^\d]/g, '')}`,
				email: owner.email,
				ClientID: clientID,
			},
		})
	);
	return data.createOwner;
}

export async function updateOwner(owner) {
	const { data } = await API.graphql(
		graphqlOperation(mutations.updateOwner, {
			input: {
				id: owner.id,
				name: owner.name,
				phone: `+55${owner.phone.replace(/[^\d]/g, '')}`,
				email: owner.email,
			},
		})
	);
	return data.updateOwner;
}

export async function deleteOwner(id) {
	const { data } = await API.graphql(graphqlOperation(mutations.deleteOwner, { input: { id } }));
	return data.deleteOwner;
}

export async function createSubscription(subscription, ClientID, PlanID, PartnerID) {
	const { data } = await API.graphql(
		graphqlOperation(mutations.createSubscriptions, {
			input: {
				referralCode: subscription.referralCode || null,
				name: subscription.name,
				website: normalizeWebsite(subscription.website) || null,
				email: subscription.email || null,
				zipCode: subscription.zipCode.replace(/\D/g, ''),
				state: subscription.state,
				city: subscription.city,
				street: subscription.street || null,
				number: subscription.number || null,
				complement: subscription.complement || null,
				active: 'TRUE',
				PlanID,
				ClientID,
				PartnerID,
			},
		})
	);
	return data.createSubscriptions;
}

export async function updateSubscription(id, subscription, ClientID, PlanID, PartnerID) {
	const { data } = await API.graphql(
		graphqlOperation(mutations.updateSubscriptions, {
			input: {
				id,
				referralCode: subscription.referralCode || null,
				name: subscription.name,
				website: normalizeWebsite(subscription.website) || null,
				email: subscription.email || null,
				zipCode: subscription.zipCode.replace(/\D/g, ''),
				state: subscription.state,
				city: subscription.city,
				street: subscription.street || null,
				number: subscription.number || null,
				complement: subscription.complement || null,
				active: 'TRUE',
				PlanID,
				ClientID,
				PartnerID,
			},
		})
	);
	return data.updateSubscriptions;
}

export async function updateSubscriptionLogoAndMap(id, logo, map) {
	const { data } = await API.graphql(graphqlOperation(mutations.updateSubscriptions, { input: { id, active: 'TRUE', logo, map } }));
	return data.updateSubscriptions;
}
