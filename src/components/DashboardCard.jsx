import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { PLANS, ROUTES } from '../constants';

export default function DashboardCard({ type, content }) {
	const { state } = useContext(AppContext);
	
	const route = () => {
		if (type === PLANS.SUBSCRIPTION) return `${ROUTES[state.lang].SUBSCRIPTIONS}/${content.id}`
		return `${ROUTES[state.lang].EVENTS}/${content.id}`
	}

	return (
		<Link
			to={route()}
			key={content.id}
			className="flex flex-col justify-between shadow-md rounded-lg"
		>
			<div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
				{content.logo ? (
					<img
						src={content.logo}
						alt={content.name}
						className="w-full h-full object-center object-cover group-hover:opacity-75"
					/>
				) : (
					<img
						src="/image-placeholder.png"
						alt={content.name}
						className="w-full h-full object-center object-cover opacity-10  group-hover:opacity-5"
					/>
				)}
			</div>
			<div className="p-4 text-center">
				<h3 className="font-semibold">{content.name}</h3>
				<p className="text-sm">{`${content.city} - ${content.state}`}</p>
			</div>
		</Link>
	);
}
