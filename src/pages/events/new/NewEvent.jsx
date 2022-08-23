import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context';
import { PLANS, ROUTES } from '../../../constants';
import NewSubscription from './SubscriptionForm';

export default function NewEvent() {
	const navigate = useNavigate();
	const params = useParams();
	const { state } = useContext(AppContext);

	useEffect(() => {
		const planExists = PLANS[params.type.toLocaleUpperCase()];
		if (!planExists) navigate(`${ROUTES[state.lang].DASHBOARD}`);
	}, [params]);

	if (params.type.toLocaleUpperCase() === PLANS.SUBSCRIPTION) {
		return <NewSubscription />;
	}
	return <NewEvent />;
}
