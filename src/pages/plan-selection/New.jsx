import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { PLANS, ROUTES } from '../../constants';
import SubscriptionForm from '../subscriptions/SubscriptionForm';
import EventForm from '../events/EventForm';

export default function New() {
	const navigate = useNavigate();
	const params = useParams();
	const { state } = useContext(AppContext);

	useEffect(() => {
		const planExists = PLANS[params.type.toLocaleUpperCase()];
		if (!planExists) navigate(`${ROUTES[state.lang].DASHBOARD}`);
	}, [params]);

	if (params.type.toLocaleUpperCase() === PLANS.SUBSCRIPTION) {
		return <SubscriptionForm />;
	}
	return <EventForm />;
}