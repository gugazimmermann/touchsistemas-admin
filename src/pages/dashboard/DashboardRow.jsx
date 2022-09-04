import { useEffect, useState, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import moment from 'moment';
import { getImage } from '../../api/storage';
import { AppContext } from '../../context';
import { LANGUAGES, PLANS } from '../../constants';
import { Loading, Grid, MapCard, Title, DashboardCard } from '../../components';
import { createContentMap } from '../../helpers/map';

export default function DashboardRow({ type, content }) {
	const [loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const { client } = state;
	const [loading, setLoading] = useState(false);
	const [showContent, setShowContent] = useState([]);
	const [map, setMap] = useState(null);

	async function handleMap(c) {
		const hasMap =
			type === PLANS.SUBSCRIPTION
				? +((client?.subscriptionsMap?.length && client?.subscriptionsMap[0]) || 0)
				: +((client?.eventsMap?.length && client?.eventsMap[0]) || 0);
		if (hasMap !== +(c?.length || 0)) await createContentMap(PLANS.SUBSCRIPTION, client, c);
		loadClient(true);
		const mapImage = type === PLANS.SUBSCRIPTION ? `map/subscriptions_${client.id}` : `map/events_${client.id}`;
		const key = await getImage(mapImage);
		if (key) setMap(`${process.env.REACT_APP_IMAGES_URL}${key}`);
	}

	async function orderContent() {
		const cloneContent = content.map((s) => s);
		setLoading(true);
		if (cloneContent.length) {
			const sortContent = cloneContent.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
			setShowContent(sortContent);
			await handleMap(sortContent);
		}
		setLoading(false);
	}

	useEffect(() => {
		orderContent();
	}, []);

	const title = () => {
		if (type === PLANS.SUBSCRIPTION) return LANGUAGES[state.lang].subscriptions.category;
		return LANGUAGES[state.lang].events.category;
	};

	if (loading) return <Loading />;
	return (
		<div>
			<Title text={title()} />
			{showContent.length === 0 ? (
				<h1 className="font-bold text-lg text-center my-4">{LANGUAGES[state.lang].noRecords}</h1>
			) : (
				<Grid>
					{showContent.map((subscription) => (
						<DashboardCard key={subscription.id} type={PLANS.SUBSCRIPTION} content={subscription} />
					))}
					{map && <MapCard map={map} />}
				</Grid>
			)}
		</div>
	);
}
