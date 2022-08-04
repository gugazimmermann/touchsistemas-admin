import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getEvent, partnersByReferralCode } from '../../../graphql/queries';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';

export default function EventDetail() {
	const params = useParams();
	const location = useLocation();
	const [success] = useState(location?.state?.success || null);
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
				graphqlOperation(partnersByReferralCode, { referralCode: eventDetails.referralCode })
			);
			const partner = partnerDetails.data.partnersByReferralCode.items[0];
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

	function formatAddress(o) {
		let address = o.street;
		if (o.number) address += `, ${o.number}`;
		if (o.complement) address += ` (${o.complement}}`;
		address += ` - ${o.city} / ${o.state} | ${o.zipCode}`;
		return address;
	}

	return (
		<>
			{loading && <Loading />}
			{success && <Alert type="success">Evento Cadastrado com Sucesso</Alert>}
			{!loading && event && (
				<div className="bg-white shadow-md overflow-hidden rounded-lg">
					<div className="flex align-middle px-4 py-5">
						{logo && (
							<div className="w-3/12 sm:w-2/12 md:w-1/12">
								<img alt="logo" className="object-scale-down w-full rounded-md" src={logo} />
							</div>
						)}
						<div className={`${logo ? 'w-9/12 sm:w-10/12 md:w-11/12' : 'w-full'} pl-2 flex flex-col justify-center`}>
							<h3 className="text-lg leading-6 font-bold">{event.name}</h3>
							<p className="mt-1 max-w-2xl text-sm sm:text-base">
								{event.dates.map((d) => `${moment(d).format('DD/MM/YYYY')}`).join(', ')}
							</p>
						</div>
					</div>
					<div className="border-t">
						<dl>
							{event.website && (
								<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">WebSite</dt>
									<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{event.website}</dd>
								</div>
							)}
							{event.email && (
								<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">Email</dt>
									<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{event.email}</dd>
								</div>
							)}
							<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
								<dt className="text-sm font-medium sm:col-span-2">Endereço</dt>
								<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{formatAddress(event)}</dd>
							</div>
							<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
								<dt className="text-sm font-medium sm:col-span-2">Plano</dt>
								<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{event.plan}</dd>
							</div>
							{event.partner && (
								<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">Parceiro</dt>
									<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{`${event.partner.name} | ${event.partner.referralCode}`}</dd>
								</div>
							)}
							{event.description && (
								<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">Descrição</dt>
									<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">{event.plan}</dd>
								</div>
							)}
							{map && (
								<div className="px-4 py-4 flex justify-center">
									<div className="bg-white overflow-hidden rounded-lg w-full sm:w-6/12 lg:w-4/12">
										<a href={map} target="_blank" className="group" rel="noreferrer">
											<img alt="map" src={map} />
										</a>
									</div>
								</div>
							)}
						</dl>
					</div>
				</div>
			)}
		</>
	);
}
