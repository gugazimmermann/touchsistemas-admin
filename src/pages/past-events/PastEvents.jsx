/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import moment from 'moment';
import GoogleMapReact from 'google-map-react';
import { Avatar } from '@material-tailwind/react';

function Marker({ color }) {
	return <i className={`bx bxs-map text-2xl ${color}`} />;
}

export default function PastEvents() {
	const navigate = useNavigate();
	const [client] = useOutletContext();
	const [events, setEvents] = useState();
	const markers = [
		{ id: '1', lat: -26.909844, lng: -48.660676 },
		{ id: '2', lat: -26.9284598, lng: -48.6876947 },
		{ id: '3', lat: -26.9348291, lng: -48.6298295 },
		{ id: '4', lat: -26.9093656, lng: -48.6550187 },
	];

	function handleEvent(id) {
		navigate(`/evento/${id}`);
	}

	useEffect(() => {
		if (client) {
			const showEvents = [];
			const eventsWithLastDay = client.Events.items.map((i) => ({
				...i,
				lastDay: i.dates.sort((a, b) => moment(b) - moment(a))[0],
			}));
			const orderEvents = eventsWithLastDay.sort((a, b) => moment(b.lastDay) - moment(a.lastDay));
			orderEvents.forEach((e) => moment(e.lastDay) < moment() && showEvents.push(e));
			setEvents(showEvents);
		}
	}, [client]);

	return (
		<>
			<h2 className="text-primary text-xl p-2 mt-4">Eventos Passados</h2>
			<div className="overflow-x-auto">
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-sm font-normal text-left">
								Logo
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-sm font-normal text-left">
								Nome
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-sm font-normal text-left">
								Localização
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-sm font-normal text-left">
								Data
							</th>
						</tr>
					</thead>
					{client && client.Events && client.Events?.items.length > 0 && (
						<tbody>
							{events &&
								events.map((event) => (
									<tr key={event.id} onClick={() => handleEvent(event.id)} className="cursor-pointer hover:bg-gray-100">
										<th className="border-b border-gray-200 align-middle">
											<Avatar
												src={`https://touchsistemas-storage.s3.amazonaws.com/public/${event.id}.png`}
												alt={event.name}
												size="sm"
											/>
										</th>
										<th className="border-b border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{event.name}
										</th>
										<th className="border-b border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{`${event.city} / ${event.state}`}
										</th>
										<th className="border-b border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{event.dates.map((d) => `${moment(d).format('DD/MM/YY')}`).join(', ')}
										</th>
									</tr>
								))}
						</tbody>
					)}
				</table>
			</div>
			<div className="h-96 w-full">
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
					defaultCenter={markers[0]}
					defaultZoom={12}
				>
					{markers.map((marker, i) => (
						<Marker
							key={marker.id}
							lat={marker.lat}
							lng={marker.lng}
							color={`${i === 0 ? 'text-primary' : 'text-warning'}`}
						/>
					))}
				</GoogleMapReact>
			</div>
		</>
	);
}
