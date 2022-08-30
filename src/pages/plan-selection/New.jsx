import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { AppContext } from '../../context';
import { PLANS, ROUTES } from '../../constants';
import SubscriptionForm from '../subscriptions/SubscriptionForm';
import EventForm from '../events/EventForm';
import { Loading } from '../../components';

export default function New() {
	const navigate = useNavigate();
	const params = useParams();
	const { state } = useContext(AppContext);
	const [loading, setLoading] = useState(true);
	const [plan, setPlan] = useState();

	useEffect(() => {
		setLoading(true)
		const selectedPlan = state.plans
			.map((p) => {
				const planName = JSON.parse(p.name).find((n) => slugify(n.name, { lower: true }) === params.name);
				if (planName) return p;
				return null;
			})
			.filter((n) => n)[0];
		if (!selectedPlan) navigate(`${ROUTES[state.lang].DASHBOARD}`);
		setPlan(selectedPlan);
		setLoading(false)
	}, [params]);

	if (!plan && loading) {
		return <Loading />;
	}
	if (plan && !loading) {
		if (plan?.type.toLocaleUpperCase() === PLANS.SUBSCRIPTION) return <SubscriptionForm />;
		return <EventForm plan={plan} />;
	}
}
