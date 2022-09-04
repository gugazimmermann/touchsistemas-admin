import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { PLANS, ROUTES } from '../../constants';
import DashboardRow from './DashboardRow';

export default function Dashboard() {
	const { state } = useContext(AppContext);
	const { client } = state;
	const navigate = useNavigate();

	useEffect(() => {
		if (state.alerts.lenght) navigate(ROUTES[state.lang].ALERTS);
	}, []);

	if (state.client) {
		return (
			<div className="grid gap-4">
				<DashboardRow type={PLANS.SUBSCRIPTION} content={client.Subscriptions?.items} />
				<DashboardRow type={PLANS.ADVANCED} content={client.Events?.items} />
			</div>
		);
	}
	return null;
}
