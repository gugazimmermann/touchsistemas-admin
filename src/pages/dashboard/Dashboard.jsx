/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import moment from 'moment';
import { Storage } from 'aws-amplify';
import { Alert, Loading, Grid, EventCard, Title } from '../../components';
import { orderEventsByLastDay } from '../../helpers';

export default function PastEvents() {
	const [client] = useOutletContext();
	const [loading, setLoading] = useState(false);
	const [events, setEvents] = useState();

	const profileLink = () => (
		<Link className="pl-2" to="/cadastro">
			Clique Aqui!
		</Link>
	);

	async function orderEvents() {
		setLoading(true);
		const showEvents = [];
		const sortEvents = orderEventsByLastDay(client.Events.items);
		for (const e of sortEvents) {
			if (moment(e.lastDay, 'YYYY-MM-DD').unix() >= moment(Date.now()).unix()) {
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

	return (
		<>
			{client && !client?.phone && (
				<Alert type="danger">Seu Cadastro está incompleto, finalize para utilizar o sistema.{profileLink()}</Alert>
			)}
			{client && client.Owners.items.length === 0 && (
				<Alert type="warning"> Nenhum Resonsável Cadastrado! {profileLink()}</Alert>
			)}
			{loading && <Loading />}
			{events && events.length > 0 && (
				<>
					<Title text="Próximos Eventos" />
					<Grid>
						{events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</Grid>
				</>
			)}
		</>
	);
}
