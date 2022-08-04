/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import moment from 'moment';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateClient } from '../../../graphql/mutations';
import Loading from '../../../components/Loading';

export default function PastEvents() {
	const [client, loadClient] = useOutletContext();
	const [loading, setLoading] = useState(false);
	const [events, setEvents] = useState();
	const [map, setMap] = useState();

	async function orderEvents() {
		setLoading(true);
		const showEvents = [];
		const eventsWithLastDay = client.Events.items.map((i) => ({
			...i,
			lastDay: i.dates.sort((a, b) => moment(b) - moment(a))[0],
		}));
		const sortEvents = eventsWithLastDay.sort((a, b) => moment(b.lastDay) - moment(a.lastDay));
		for (const e of sortEvents) {
			if (moment(e.lastDay, 'YYYY-MM-DD').unix() < moment(Date.now()).unix()) {
				const list = await Storage.list(`logo/${e.id}`);
				if (list?.length) e.image = await Storage.get(list[0].key);
				showEvents.push(e);
			}
		}
		setEvents(showEvents);
		setLoading(false);
	}

	useEffect(() => {
		if (client) orderEvents();
	}, [client]);

	async function createMap() {
		setLoading(true);
		const clientAddress = encodeURIComponent(
			`${client.street}, ${client.number} - ${client.city} - ${client.state}, ${client.zipCode}`
		);
		const clientMarker = `markers=color:0xf59e0b%7Clabel:${client.name[0]}%7C${clientAddress}`;
		const eventMarkers = [];
		events.forEach((e) => {
			const eventAddress = encodeURIComponent(`${e.street}, ${e.number} - ${e.city} - ${e.state}, ${e.zipCode}`);
			const eventMarker = `&markers=color:0xa855f7%7Clabel:${e.name[0]}%7C${eventAddress}`;
			eventMarkers.push(eventMarker);
		});
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${clientAddress}&zoom=${11}&size=1280x1280&scale=2&${clientMarker}${eventMarkers.join(
			''
		)}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `events_${client.id}.png`);
		await Storage.put(`maps/events_${client.id}.png`, file, {
			contentType: 'image/png',
		});
		await API.graphql(
			graphqlOperation(updateClient, {
				input: {
					id: client.id,
					eventsMap: events.length,
				},
			})
		);
		loadClient();
		setLoading(false);
	}

	async function handleMap() {
		setLoading(true);
		if (!client.eventsMap || client.eventsMap !== events.length) await createMap();
		const mapsList = await Storage.list(`maps/events_${client.id}`);
		if (mapsList.length !== 0) {
			const getUrl = await Storage.get(mapsList[0].key);
			setMap(getUrl);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (events) {
			handleMap();
		}
	}, [events]);

	return (
		<>
			{loading && <Loading />}
			<h2 className="text-primary text-xl pb-4">Eventos Passados</h2>
			<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 lg:gap-x-8">
				{events &&
					events.map((event) => (
						<Link to={`/eventos/${event.id}`} key={event.id} className="group">
							<div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden lg:aspect-w-7 lg:aspect-h-8">
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
							<h3 className="mt-4">{event.name}</h3>
							<p className="mt-1 text-sm">
								{`${event.city} / ${event.state}`} |{' '}
								{event.dates.map((d) => `${moment(d).format('DD/MM/YY')}`).join(', ')}
							</p>
						</Link>
					))}
				{map && (
					<a href={map} target="_blank" className="group" rel="noreferrer">
						<div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden lg:aspect-w-7 lg:aspect-h-8">
							<img alt="map" src={map} className="w-full h-full object-center object-cover" />
						</div>
					</a>
				)}
			</div>
		</>
	);
}
