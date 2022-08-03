import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getEvent, partnerByReferralCode } from '../../../graphql/queries';
import Loading from '../../../components/Loading';

export default function EventDetail() {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [logo, setLogo] = useState();
	const [map, setMap] = useState();

	async function handleLogo() {
		const list = await Storage.list(`logo/${event.id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setLogo(getUrl);
		}
	}

	async function handleMap() {
		const list = await Storage.list(`maps/${event.id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setMap(getUrl);
		}
	}

	async function handleGetEvent(id) {
		setLoading(true);
		const { data } = await API.graphql(graphqlOperation(getEvent, { id }));
		const eventDetails = data.getEvent;
		if (eventDetails.referralCode) {
			const partnerDetails = await API.graphql(
				graphqlOperation(partnerByReferralCode, { referralCode: eventDetails.referralCode })
			);
			const partner = partnerDetails.data.partnerByReferralCode.items[0];
			eventDetails.partner = partner;
		}
		setEvent(eventDetails);
		setLoading(false);
	}

	useEffect(() => {
		if (event) {
			handleLogo();
			handleMap();
		}
	}, [event]);

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	return (
		<>
			{loading && <Loading />}
			{!loading && event && (
				<div className="mx-8">
					<h2 className="text-primary text-xl py-6">
						{event.name} | {event.dates.map((d) => `${moment(d).format('DD/MM/YY')}`).join(', ')}
					</h2>

					<div className="w-full md:w-8/12 flex flex-wrap p-4">
						{event.website && <div className="w-full mb-4">{event.website}</div>}
						{event.email && <div className="w-full mb-4">{event.email}</div>}
						<div className="w-full mb-4">
							{event.street}, {event.number}, {event.city} / {event.state} - {event.zipCode}
						</div>
						<div className="w-full mb-4">{event.complement}</div>
						<div className="w-full mb-4">Plano: {event.plan}</div>
						<div className="w-full mb-4">
							Parceiro: {event.partner.name} | {event.partner.referralCode}
						</div>
					</div>
					<div className="w-full flex flex-wrap justify-evenly">
						{logo && (
							<div className="w-full md:w-4/12">
								<img alt="logo" src={logo} />
							</div>
						)}
						{map && (
							<div className="w-full md:w-4/12">
								<img alt="map" src={map} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
