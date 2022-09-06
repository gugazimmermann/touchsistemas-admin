import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

const clientByEmail = async (email) => {
	const {
		data: {
			clientByEmail: { items },
		},
	} = await API.graphql(graphqlOperation(queries.clientByEmail, { email }));
	return items.length ? items[0] : null;
};

export async function getClient(id) {
	const { data } = await API.graphql(graphqlOperation(queries.getClient, { id }));
	if (!data.getClient) return null;
	return data.getClient;
}

export async function listOwners(ClientID) {
	const { data } = await API.graphql(graphqlOperation(queries.ownersByClientID, { ClientID }));
	if (!data.ownersByClientID.items.length) return null;
	return data.ownersByClientID.items;
}

export async function listSubscriptions(ClientID) {
	const { data } = await API.graphql(graphqlOperation(queries.subscriptionsByClientID, { ClientID }));
	if (!data.subscriptionsByClientID.items.length) return null;
	return data.subscriptionsByClientID.items;
}

export async function listEvents(ClientID) {
	const { data } = await API.graphql(graphqlOperation(queries.eventsByClientID, { ClientID }));
	if (!data.eventsByClientID.items.length) return null;
	return data.eventsByClientID.items;
}

export async function listPlans() {
	const { data } = await API.graphql(graphqlOperation(queries.planByActive, { active: 'TRUE' }));
	if (!data.planByActive.items.length) return null;
	return data.planByActive.items;
}

export async function listSurveysBySubscriptionsID(SubscriptionsID) {
	const { data } = await API.graphql(graphqlOperation(queries.surveyBySubscriptionsID, { SubscriptionsID }));
	if (!data.surveyBySubscriptionsID.items.length) return null;
	return data.surveyBySubscriptionsID.items;
}

export async function listSurveysByEventID(EventsID) {
	const { data } = await API.graphql(graphqlOperation(queries.surveyByEventsID, { EventsID }));
	if (!data.surveyByEventsID.items.length) return null;
	return data.surveyByEventsID.items;
}

export async function getPartnerByReferralCode(referralCode) {
	const { data } = await API.graphql(graphqlOperation(queries.partnerByReferralCode, { referralCode }));
	if (!data.partnerByReferralCode.items.length) return null;
	return data.partnerByReferralCode.items[0];
}

export async function getActivePlanByType(type) {
	const { data } = await API.graphql(
		graphqlOperation(queries.planByType, { type, filter: { active: { eq: 'TRUE' } } })
	);
	if (!data.planByType.items.length) return null;
	return data.planByType.items[0];
}

export async function getSubscriptionByID(id, active) {
	const { data } = await API.graphql(
		graphqlOperation(queries.getSubscriptions, { id, active: active.toString().toLocaleUpperCase() })
	);
	return data.getSubscriptions;
}

export async function getVisitorsBySubscriptionID(SubscriptionsID) {
	const visitors = [];
	let token = null;
	do {
		const {
			data: { visitorBySubscriptionsID },
		} = await API.graphql(
			graphqlOperation(queries.visitorBySubscriptionsID, { SubscriptionsID, limit: 1000, nextToken: token })
		);
		if (visitorBySubscriptionsID.items) visitorBySubscriptionsID.items.forEach((v) => visitors.push(v));
		token = visitorBySubscriptionsID?.nextToken !== token ? visitorBySubscriptionsID.nextToken : null;
	} while (token);
	return visitors;
}

const Queries = { clientByEmail };

export default Queries;
