import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { AppContext } from '../../context';
import { LANGUAGES, PLANS } from '../../constants';
import { Loading, Grid, MapCard, Title, DashboardCard } from '../../components';

export default function DashboardRow({ type, content }) {
	const { state } = useContext(AppContext);
	const { client } = state;
	const [loading, setLoading] = useState(false);
	const [showContent, setShowContent] = useState([]);


	async function orderContent() {
		const cloneContent = content.map((s) => s);
		setLoading(true);
		if (cloneContent.length) {
			const sortContent = cloneContent.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
			setShowContent(sortContent);
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
					{client.subscriptionsMap && <MapCard map={client.subscriptionsMap} />}
				</Grid>
			)}
		</div>
	);
}
