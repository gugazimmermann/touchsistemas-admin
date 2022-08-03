/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateClient } from '../../../graphql/mutations';

export default function PastEvents() {
	const navigate = useNavigate();
	const [client, loadClient] = useOutletContext();
	const [events, setEvents] = useState();
	const [map, setMap] = useState();

	function handleEvent(id) {
		navigate(`/eventos/${id}`);
	}

	async function orderEvents() {
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
	}

	useEffect(() => {
		if (client) orderEvents();
	}, [client]);

	async function createMap() {
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
		loadClient()
	}

	async function handleMap() {
		if (!client.eventsMap || client.eventsMap !== events.length) await createMap();
		const mapsList = await Storage.list(`maps/events_${client.id}`);
		if (mapsList.length !== 0) {
			const getUrl = await Storage.get(mapsList[0].key);
			setMap(getUrl);
		}
	}

	useEffect(() => {
		if (events) {
			handleMap();
		}
	}, [events]);

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
										<th className="border-b border-gray-200 align-middle px-2 text-center w-14">
											{event.image && <img src={event.image} alt={event.name} className="h-10 w-10 rounded" />}
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
			{map && (
				<div className="mt-4 flex justify-center">
					<img alt="map" className="w-7/12" src={map} />
				</div>
			)}
		</>
	);
}
