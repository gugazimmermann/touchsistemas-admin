import { Link } from 'react-router-dom';
import moment from 'moment';

export default function EventCard({ event }) {
	const { id, image, name, city, state, dates } = event;
	return (
		<Link to={`/eventos/${id}`} key={id} className="group shadow rounded-lg">
			<div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
				{image ? (
					<img src={image} alt={name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
				) : (
					<img
						src="/image-placeholder.png"
						alt={name}
						className="w-full h-full object-center object-cover opacity-10  group-hover:opacity-5"
					/>
				)}
			</div>
			<div className="p-4 text-center">
				<h3>{name}</h3>
				<p className="text-sm">
					{`${city} - ${state}`} | {dates.map((d) => `${moment(d).format('DD/MM/YY')}`).join(', ')}
				</p>
			</div>
		</Link>
	);
}
