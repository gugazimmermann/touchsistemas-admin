import Subscriptions from '../subscriptions/Subscriptions';
import Events from '../events/Events';

export default function Dashboard() {
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
