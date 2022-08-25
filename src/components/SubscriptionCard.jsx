import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { ROUTES } from '../constants';

export default function SubscriptionCard({ event }) {
	const { state } = useContext(AppContext);

	return (
		<Link
			to={`${ROUTES[state.lang].SUBSCRIPTIONS}/${event.id}`}
			key={event.id}
			className="flex flex-col justify-between shadow-md rounded-lg"
		>
			<div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
				{event.image ? (
					<img
						src={event.image}
						alt={event.name}
						className="w-full h-full object-center object-cover group-hover:opacity-75"
					/>
				) : (
					<img
						src="/image-placeholder.png"
						alt={event.name}
						className="w-full h-full object-center object-cover opacity-10  group-hover:opacity-5"
					/>
				)}
			</div>
			<div className="p-4 text-center">
				<h3 className="font-semibold">{event.name}</h3>
				<p className="text-sm">{`${event.city} - ${event.state}`}</p>
			</div>
		</Link>
	);
}
