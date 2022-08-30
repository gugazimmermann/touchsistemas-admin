import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { ROUTES } from '../../constants';
import Subscriptions from '../subscriptions/Subscriptions';
import Events from '../events/Events';


export default function Dashboard() {
	const { state } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (state.alerts.lenght) navigate(ROUTES[state.lang].ALERTS);
	}, []);

	return (
		<div className="grid gap-4">
			<div>
				<Subscriptions />
			</div>
			<div>
				<Events />
			</div>
		</div>
	);
}
