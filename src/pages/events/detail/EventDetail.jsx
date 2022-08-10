/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import slugify from 'slugify';
import { CSVLink } from 'react-csv';
import QRCode from 'qrcode';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getEvent, partnersByReferralCode, visitorsByEventID } from '../../../graphql/queries';
import { Loading, Alert, LoadingIcon } from '../../../components';

export default function EventDetail() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [success] = useState(location?.state?.success || null);
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [visitors, setVisitors] = useState();
	const [logo, setLogo] = useState();
	const [map, setMap] = useState();
	const [headers, setHeaders] = useState();
	const [data, setData] = useState();
	const [qr, setQr] = useState('');

	async function generateQRCode() {
		try {
			const url = await QRCode.toDataURL(`${process.env.REACT_APP_EVENTS_URL}${params.id}`, { width: 3840 });
			setQr(url);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	}

	async function handleLogo(id) {
		const list = await Storage.list(`logo/${id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setLogo(getUrl);
		}
	}

	async function handleMap(id) {
		const list = await Storage.list(`maps/${id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setMap(getUrl);
		}
	}

	function createReport(v) {
		const resportHeaders = [
			{ label: 'Telefone', key: 'phone' },
			{ label: 'Nome', key: 'name' },
			{ label: 'Email', key: 'email' },
			{ label: 'Cidade', key: 'city' },
			{ label: 'Estado', key: 'state' },
		];

		const resportData = [];
		v.forEach((vi) =>
			resportData.push({
				phone: vi.phone,
				name: vi.name,
				email: vi.email,
				city: vi.city,
				state: vi.state,
			})
		);
		setHeaders(resportHeaders);
		setData(resportData);
	}

	async function handleVisitors(eventData) {
		const visitorsArray = [];
		let token = null;
		do {
			const getVisitors = await API.graphql(
				graphqlOperation(visitorsByEventID, { EventID: eventData.id, limit: 1000, nextToken: token })
			);
			if (getVisitors?.data?.visitorsByEventID?.items) {
				getVisitors.data.visitorsByEventID.items.forEach((v) => visitorsArray.push(v));
			}
			token =
				getVisitors?.data?.visitorsByEventID?.nextToken !== token ? getVisitors.data.visitorsByEventID.nextToken : null;
		} while (token);
		setVisitors(visitorsArray);
		eventData.visitorsInfo = {
			total: visitorsArray.length,
			confirmation: visitorsArray.filter((t) => t.confirmation).length,
			codeUsed: visitorsArray.filter((t) => t.codeUsed).length,
			surveysAnswered: visitorsArray.filter((t) => t.surveyAnswers).length,
			surveysPersonalData: visitorsArray.filter((t) => t.name).length,
		};
		createReport(visitorsArray);
		setEvent(eventData);
	}

	async function handleGetEvent(id) {
		setLoading(true);
		const oneEnvent = await API.graphql(graphqlOperation(getEvent, { id }));
		const eventData = oneEnvent.data.getEvent;
		if (eventData) {
			if (eventData.referralCode) {
				const partnerDetails = await API.graphql(
					graphqlOperation(partnersByReferralCode, { referralCode: eventData.referralCode })
				);
				const partner = partnerDetails.data.partnersByReferralCode.items[0];
				eventData.partner = partner;
			}
			setLoading(false);
			const { dates } = eventData;
			dates.sort();
			dates.reverse();
			if (moment(dates[0], 'YYYY-MM-DD').unix() <= moment().unix()) {
				eventData.pastEvent = true;
				handleVisitors(eventData);
			} else {
				generateQRCode();
			}
			setEvent(eventData);
			handleLogo(eventData.id);
			handleMap(eventData.id);
		} else {
			navigate('/dashboard');
		}
	}

	function handleDashboard() {
		if (event.visitorsInfo.total) navigate(`/dashboard/${event.id}`, { state: { event, visitors } });
	}

	function formatAddress(o) {
		let address = o.street;
		if (o.number) address += `, ${o.number}`;
		if (o.complement) address += ` (${o.complement}}`;
		address += ` - ${o.city} / ${o.state} | ${o.zipCode}`;
		return address;
	}

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	function renderHeader() {
		return (
			<div className="flex flex-col sm:flex-row justify-center items-center align-middle p-2 ">
				{logo && (
					<div className="w-3/12 mb-2 sm:mb-0 sm:w-2/12 md:w-1/12">
						<img alt="logo" className="object-scale-down w-full rounded-md" src={logo} />
					</div>
				)}
				<div
					className={`${
						logo ? 'w-full sm:w-8/12 md:w-9/12' : 'w-10/12 md:w-11/12'
					} mb-2 sm:mb-0 text-center sm:text-left sm:pl-2 flex flex-col justify-center`}
				>
					<h3 className="text-lg leading-6 font-bold">{event.name}</h3>
					<p className="mt-1 max-w-2xl text-sm sm:text-base">
						{event.dates.map((d) => `${moment(d).format('DD/MM/YYYY')}`).join(', ')}
					</p>
				</div>
				{event?.pastEvent ? (
					<div
						onClick={() => handleDashboard()}
						className={`${
							event?.visitorsInfo?.total && 'cursor-pointer'
						} w-full md:w-1/12 flex flex-col justify-center items-center text-secondary`}
					>
						<i className="bx bxs-pie-chart-alt-2 text-5xl" />
						<h2 className="text-lg leading-6 font-bold">Relatório</h2>
					</div>
				) : (
					<a
						href={qr}
						download={`${slugify(event.name, { lower: true })}.png`}
						className={`${
							event?.visitorsInfo?.total && 'cursor-pointer'
						} w-full md:w-1/12 flex flex-col justify-center items-center text-secondary`}
					>
						<img src={qr} alt="qr code" />
						<h2 className="text-lg leading-6 font-bold">QR-Code</h2>
					</a>
				)}
			</div>
		);
	}

	function renderSurveyInfo() {
		return (
			event.pastEvent && (
				<>
					<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
						<dt className="text-sm font-medium sm:col-span-2">Total Cadastros</dt>
						<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">
							{event?.visitorsInfo ? (
								<>
									<span>
										{`${event.visitorsInfo.confirmation} / ${event.visitorsInfo.total} (${(
											(event.visitorsInfo.confirmation * 100) /
											event.visitorsInfo.total
										).toFixed(1)}%)`}
									</span>
									{data && (
										<CSVLink
											data={data}
											headers={headers}
											filename={slugify(event.name, { lower: true })}
											className="ml-2 px-2 py-1 bg-primary text-white rounded"
										>
											Exportar Dados
										</CSVLink>
									)}
								</>
							) : (
								<LoadingIcon />
							)}
						</dd>
					</div>
					<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
						<dt className="text-sm font-medium sm:col-span-2">Itens Retirados</dt>
						<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">
							{event?.visitorsInfo ? (
								`${event.visitorsInfo.codeUsed} (${(
									(event.visitorsInfo.codeUsed * 100) /
									event.visitorsInfo.confirmation
								).toFixed(1)}%)`
							) : (
								<LoadingIcon />
							)}
						</dd>
					</div>
					<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
						<dt className="text-sm font-medium sm:col-span-2">Pesquisas Respondidas</dt>
						<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">
							{event?.visitorsInfo ? (
								`${event.visitorsInfo.surveysAnswered} (${(
									(event.visitorsInfo.surveysAnswered * 100) /
									event.visitorsInfo.confirmation
								).toFixed(1)}%)`
							) : (
								<LoadingIcon />
							)}
						</dd>
					</div>
					<div className="px-4 py-4 border-b sm:grid sm:grid-cols-12">
						<dt className="text-sm font-medium sm:col-span-2">Pesquisas Completas</dt>
						<dd className="mt-1 text-sm sm:mt-0 sm:col-span-10">
							{event?.visitorsInfo ? (
								`${event.visitorsInfo.surveysPersonalData} (${(
									(event.visitorsInfo.surveysPersonalData * 100) /
									event.visitorsInfo.confirmation
								).toFixed(1)}%)`
							) : (
								<LoadingIcon />
							)}
						</dd>
					</div>
				</>
			)
		);
	}

	return (
		<>
			{loading && <Loading />}
			{success && <Alert type="success">Evento Cadastrado com Sucesso</Alert>}
			{!loading && event && (
				<div className="bg-white shadow-md overflow-hidden rounded-lg">
					{renderHeader()}
					<div className="border-t">
						<dl>
							{renderSurveyInfo()}
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
