/* eslint-disable no-restricted-syntax */
import { useEffect, useState, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateClient } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';
import { Loading, Grid, EventCard, MapCard, Title } from '../../components';
import { orderEventsByLastDay } from '../../helpers/general';

export default function Events() {
	const { loadClient } = useOutletContext();
	const { state } = useContext(AppContext);
	const { client } = state;
	const [loading, setLoading] = useState(false);
	const [events, setEvents] = useState([]);
	const [map, setMap] = useState();

	async function createMap(e) {
		const clientAddress = encodeURIComponent(
			`${client.street}, ${client.number} - ${client.city} - ${client.state}, ${client.zipCode}`
		);
		const clientMarker = `markers=color:0xf59e0b%7Clabel:${client.name[0]}%7C${clientAddress}`;
		const eventMarkers = [];
		if (e.length) {
			e.forEach((ev) => {
				const eventAddress = encodeURIComponent(`${ev.street}, ${ev.number} - ${ev.city} - ${ev.state}, ${ev.zipCode}`);
				const eventMarker = `&markers=color:0xa855f7%7Clabel:${ev.name[0]}%7C${eventAddress}`;
				eventMarkers.push(eventMarker);
			});
		}
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
					eventsMap: e.length,
				},
			})
		);
		loadClient(true);
	}

	async function handleMap(e) {
		if (((client?.eventsMap?.length && client?.eventsMap[0]) || 0) !== (e?.length || 0)) await createMap(e);
		const mapsList = await Storage.list(`maps/events_${client.id}`);
		if (mapsList.length !== 0) {
			const getUrl = await Storage.get(mapsList[0].key);
			setMap(getUrl);
		}
	}

	async function orderEvents() {
		setLoading(true);
		const showEvents = [];
		if (client.Events.items.length) {
			const sortEvents = orderEventsByLastDay(client.Events.items);
			for (const e of sortEvents) {
				const list = await Storage.list(`logo/${e.id}`);
				if (list?.length) e.image = await Storage.get(list[0].key);
				showEvents.push(e);
			}
			setEvents(showEvents);
			await handleMap(showEvents);
		}
		setLoading(false);
	}

	useEffect(() => {
		orderEvents();
	}, []);

	if (loading) return <Loading />;
	return (
		<div>
			<Title text="Eventos" />
			{events.length === 0 ? (
				<h1 className="font-bold text-lg text-center mt-4">{LANGUAGES[state.lang].noRecords}</h1>
			) : (
				<Grid>
					{events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
					{map && <MapCard map={map} />}
				</Grid>
			)}
		</div>
	);
}
