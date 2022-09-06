import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { AppContext } from '../../context';
import { LANGUAGES, PLANS } from '../../constants';
import { Loading, Grid, MapCard, Title, DashboardCard } from '../../components';
import { listSubscriptions, listEvents } from '../../api/queries';

export default function DashboardRow({ type }) {
	const { state } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [showContent, setShowContent] = useState([]);

	async function orderContent() {
		setLoading(true);
		if (state.client) {
			const content =
				type === PLANS.SUBSCRIPTION ? await listSubscriptions(state.client.id) : await listEvents(state.client.id);
			if (content?.length) {
				const sortContent = content.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
				setShowContent(sortContent);
			}
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
			{!showContent.length ? (
				<h1 className="font-bold text-lg text-center my-4">{LANGUAGES[state.lang].noRecords}</h1>
			) : (
				<Grid>
					{showContent.map((subscription) => (
						<DashboardCard key={subscription.id} type={PLANS.SUBSCRIPTION} content={subscription} />
					))}
					{type === PLANS.SUBSCRIPTION && state.client.subscriptionsMap && (
						<MapCard map={state.client.subscriptionsMap} />
					)}
					{type !== PLANS.SUBSCRIPTION && state.client.eventsMap && <MapCard map={state.client.eventsMap} />}
				</Grid>
			)}
		</div>
	);
}
