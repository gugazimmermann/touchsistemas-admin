/* eslint-disable no-restricted-syntax */
import { useEffect, useState, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import moment from 'moment';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateClient } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';
import { Loading, Grid, MapCard, Title, SubscriptionCard } from '../../components';

export default function Subscriptions() {
	const [loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const { client } = state;
	const [loading, setLoading] = useState(false);
	const [subscriptions, setSubscriptions] = useState([]);
	const [map, setMap] = useState(null);

	async function createMap(e) {
		const clientAddress = encodeURIComponent(
			`${client.street}, ${client.number} - ${client.city} - ${client.state}, ${client.zipCode}`
		);
		const clientMarker = `markers=color:0x10b981%7Clabel:${client.name[0]}%7C${clientAddress}`;
		const markers = [];
		if (e.length) {
			e.forEach((ev) => {
				const eventAddress = encodeURIComponent(`${ev.street}, ${ev.number} - ${ev.city} - ${ev.state}, ${ev.zipCode}`);
				const marker = `&markers=color:0xa855f7%7Clabel:${ev.name[0]}%7C${eventAddress}`;
				markers.push(marker);
			});
		}
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${clientAddress}&zoom=${11}&size=1280x1280&scale=2&${clientMarker}${markers.join(
			''
		)}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `subscriptions_${client.id}.png`);
		await Storage.put(`maps/subscriptions_${client.id}.png`, file, {
			contentType: 'image/png',
		});
		await API.graphql(
			graphqlOperation(updateClient, {
				input: {
					id: client.id,
					subscriptionsMap: e.length,
				},
			})
		);
		loadClient();
	}

	// TODO: handle better the maps, not just when add new one, but when change address
	async function handleMap(e) {
		if (((client?.subscriptionsMap?.length && client?.subscriptionsMap[0]) || 0) !== (e?.length || 0))
			await createMap(e);
		const mapsList = await Storage.list(`maps/subscriptions_${client.id}`);
		if (mapsList.length !== 0) {
			const getUrl = await Storage.get(mapsList[0].key);
			setMap(getUrl);
		}
	}

	async function orderSubscriptions() {
		const cloneSubscriptions = client.Subscriptions?.items.map((s) => s);
		setLoading(true);
		const showSubscriptions = [];
		if (cloneSubscriptions.length) {
			const sortSubscriptions = cloneSubscriptions.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
			for (const s of sortSubscriptions) {
				const list = await Storage.list(`logo/${s.id}`);
				if (list?.length) s.image = await Storage.get(list[0].key);
				showSubscriptions.push(s);
			}
			setSubscriptions(showSubscriptions);
			await handleMap(showSubscriptions);
		}
		setLoading(false);
	}

	useEffect(() => {
		orderSubscriptions();
	}, []);

	if (loading) return <Loading />;
	return (
		<>
			<Title text={LANGUAGES[state.lang].subscriptions.category} />
			{subscriptions.length === 0 ? (
				<h1 className="font-bold text-lg text-center my-4">{LANGUAGES[state.lang].noRecords}</h1>
			) : (
				<Grid>
					{subscriptions.map((subscription) => (
						<SubscriptionCard key={subscription.id} event={subscription} />
					))}
					{map && <MapCard map={map} />}
				</Grid>
			)}
		</>
	);
}
