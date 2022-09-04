import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

export async function getPartnerByReferralCode(referralCode) {
	const {
		data: {
			partnerByReferralCode: { items },
		},
	} = await API.graphql(graphqlOperation(queries.partnerByReferralCode, { referralCode }));
	if (!items.length) return null;
	return items[0];
}

export async function getActivePlanByType(type) {
	const {
		data: {
			planByType: { items },
		},
	} = await API.graphql(graphqlOperation(queries.planByType, { type, filter: { active: { eq: 'TRUE' } } }));
  if (!items.length) return null;
	return items[0];
}

export async function getSubscriptionByID(id, active) {
	const {
		data: { getSubscriptions },
	} = await API.graphql(graphqlOperation(queries.getSubscriptions, { id, active: active.toString().toLocaleUpperCase() }));
	return getSubscriptions;
}