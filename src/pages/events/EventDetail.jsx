import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import slugify from 'slugify';
import { CSVLink } from 'react-csv';
import QRCode from 'qrcode';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getEvent, partnersByReferralCode, visitorsByEventID } from '../../graphql/queries';
import { AppContext } from '../../context';
import { Loading, Alert, LoadingIcon } from '../../components';
import { translatePlan } from '../../helpers';
import { ROUTES } from '../../constants';

export default function EventDetail() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
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
			console.error(error);
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
				eventData.eventOver = true;
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
		if (event.visitorsInfo.total)
			navigate(`${ROUTES[state.lang].DASHBOARD}/${event.id}`, { state: { event, visitors } });
	}

	function formatAddress(o) {
		let address = o.street;
		if (o.number) address += `, ${o.number}`;
		if (o.complement) address += ` (${o.complement})`;
		address += ` - ${o.city} / ${o.state} | ${o.zipCode}`;
		return address;
	}

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	function renderRegistrationsCard() {
		return (
			<div className="mt-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-emerald-500 right-4 -top-4">
						<i className="bx bxs-user" />
					</div>
					<div>
						<p className="text-xl font-bold">Cadastros</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
								<p>{event.visitorsInfo.total}</p>
							</div>
							<div className="w-full text-center">
								<p>Confirmados</p>
								<p>{event.visitorsInfo.confirmation}</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>{((event.visitorsInfo.confirmation * 100) / event.visitorsInfo.total).toFixed(1)}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderWithdrawnItemsCard() {
		return (
			<div className="mt-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-sky-500 right-4 -top-4">
						<i className="bx bxs-gift" />
					</div>
					<div>
						<p className="text-xl font-bold">Itens Retirados</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
								<p>{event.visitorsInfo.codeUsed}</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>{((event.visitorsInfo.codeUsed * 100) / event.visitorsInfo.confirmation).toFixed(1)}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderSurveysAnsweredCard() {
		return (
			<div className="mt-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-fuchsia-500 right-4 -top-4">
						<i className="bx bxs-select-multiple" />
					</div>
					<div>
						<p className="text-xl font-bold">Pesquisas Respondidas</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
								<p>{event.visitorsInfo.surveysAnswered}</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>{((event.visitorsInfo.surveysAnswered * 100) / event.visitorsInfo.confirmation).toFixed(1)}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderCompleteSurveysCard() {
		return (
			<div className="mt-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-violet-500 right-4 -top-4">
						<i className="bx bxs-bar-chart-square" />
					</div>
					<div>
						<p className="text-xl font-bold">Pesquisas Completas</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
								<p>{event.visitorsInfo.surveysPersonalData}</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>
									{((event.visitorsInfo.surveysPersonalData * 100) / event.visitorsInfo.surveysAnswered).toFixed(1)}%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderCards() {
		if (event?.visitorsInfo && event.visitorsInfo?.total > 0) {
			return (
				<div className="w-full md:w-6/12 grid sm:grid-cols-2 gap-4 md:p-4">
					{renderRegistrationsCard()}
					{renderWithdrawnItemsCard()}
					{renderSurveysAnsweredCard()}
					{renderCompleteSurveysCard()}
				</div>
			);
		}
		return (
			<div className="w-full md:w-6/12 flex justify-center align-middle items-center">
				<LoadingIcon />
			</div>
		);
	}

	function renderDashboardCard() {
		return (
			<div
				role="presentation"
				onClick={() => handleDashboard()}
				className={`${
					event?.visitorsInfo?.total && 'cursor-pointer'
				} w-full p-1 flex flex-col justify-center items-center text-secondary`}
			>
				<i className="bx bxs-pie-chart-alt-2 text-9xl" />
				<h2 className="text-lg font-bold">Relatório</h2>
			</div>
		);
	}

	function renderQRCodeCard() {
		return (
			<a
				href={qr}
				download={`${slugify(event.name, { lower: true })}.png`}
				className={`${
					event?.visitorsInfo?.total && 'cursor-pointer'
				} w-full flex flex-col justify-center items-center text-secondary`}
			>
				<img src={qr} alt="qr code" />
				<h2 className="text-lg font-bold text-center">QR-Code Download</h2>
			</a>
		);
	}

	function renderWinnerCard() {
		return (
			<div className="bg-white shadow-md overflow-hidden rounded-lg p-1 sm:w-6/12 md:w-full flex flex-col items-center align-middle">
				<i className="bx bxs-trophy text-primary text-5xl" />
				<h2 className="text-lg text-primary font-bold">Ganhador(a) do Sorteio</h2>
			</div>
		);
	}

	function renderMethodRow() {
		return (
			<div className="p-2 border-b sm:grid sm:grid-cols-12">
				<dt className="text-sm font-medium sm:col-span-2">Método:</dt>
				<dl className="text-sm sm:mt-0 sm:col-span-4 font-bold">{event.method}</dl>
				{!event.eventOver && (
					<dl className="text-sm sm:mt-0 sm:col-span-6 text-right">
						<button type="button" className="px-2 py-0.5 bg-orange-300 border-orange-500 text-white rounded-lg">
							Alterar
						</button>
					</dl>
				)}
			</div>
		);
	}

	function renderSurveyRow() {
		const surveyQuestions = event.Surveys.items.length;
		return (
			<div className="p-2 border-b sm:grid sm:grid-cols-12">
				<dt className="text-sm font-medium sm:col-span-2">Pesquisa:</dt>
				<dl className="text-sm sm:mt-0 sm:col-span-4 font-bold">
					{!surveyQuestions ? 'Não Cadastrada' : `${surveyQuestions} perguntas`}
				</dl>
				{!event.eventOver && (
					<dl className="text-sm sm:mt-0 sm:col-span-6 text-right">
						<button type="button" className="px-2 py-0.5 bg-orange-300 border-orange-500 text-white rounded-lg">
							Adicionar
						</button>
					</dl>
				)}
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{success && <Alert type="success">Evento Cadastrado com Sucesso</Alert>}
			{!loading && event && (
				<>
					<div className={`flex flex-col md:flex-row ${!event.eventOver && 'justify-between'}`}>
						<div className="w-full md:w-3/12">
							<div className="bg-white shadow-md overflow-hidden rounded-lg mb-4">
								{logo ? (
									<img src={logo} alt="logo" className="object-scale-down w-full rounded-t-md" />
								) : (
									<img
										src="/image-placeholder.png"
										alt="logo"
										className="object-scale-down w-full rounded-t-md opacity-10  group-hover:opacity-5"
									/>
								)}
								<div className="my-2 text-center">
									<h3 className="font-bold">{event.name}</h3>
									<p className="mt-1 text-sm">
										{event.dates.map((d) => `${moment(d).format('DD/MM/YYYY')}`).join(', ')}
									</p>
								</div>
							</div>
						</div>
						{event.eventOver && renderCards()}
						<div className="w-full md:w-3/12 mt-4 flex flex-rowv md:flex-col">
							<div className="bg-white shadow-md overflow-hidden rounded-lg mb-2 sm:w-6/12 md:w-full sm:mr-4">
								{event.eventOver ? renderDashboardCard() : renderQRCodeCard()}
							</div>
							{event.eventOver && data && (
								<CSVLink
									data={data}
									headers={headers}
									filename={slugify(event.name, { lower: true })}
									className="px-2 py-1 bg-secondary text-white rounded-lg mb-2 shadow-md text-center font-bold"
								>
									<i className="bx bxs-download" /> Exportar Dados
								</CSVLink>
							)}
							{event.eventOver && renderWinnerCard()}
						</div>
					</div>
					<div className="shadow-md rounded-lg flex flex-row">
						<dl className="flex-1">
							{renderMethodRow()}
							{renderSurveyRow()}
							{event.website && (
								<div className="p-2 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">WebSite</dt>
									<dd className="text-sm sm:col-span-10">{event.website}</dd>
								</div>
							)}
							{event.email && (
								<div className="p-2 border-b sm:grid sm:grid-cols-12">
									<dt className="text-sm font-medium sm:col-span-2">Email</dt>
									<dd className="text-sm sm:col-span-10">{event.email}</dd>
								</div>
							)}
							<div className="p-2 border-b sm:grid sm:grid-cols-12">
								<dt className="text-sm font-medium sm:col-span-2">Endereço</dt>
								<dd className="text-sm sm:col-span-10">{formatAddress(event)}</dd>
							</div>
							<div className="p-2 border-b sm:grid sm:grid-cols-12">
								<dt className="text-sm font-medium sm:col-span-2">Plano</dt>
								<dd className="text-sm sm:col-span-10">{translatePlan(event.plan)}</dd>
								{event.partner && (
									<>
										<dt className="mt-2 text-sm font-medium sm:col-span-2">Parceiro</dt>
										<dd className="mt-2 text-sm sm:col-span-10">{`${event.partner.name} | ${event.partner.referralCode}`}</dd>
									</>
								)}
							</div>
						</dl>
						{map && (
							<div className="px-4 py-4 flex-1 justify-center">
								<a href={map} target="_blank" rel="noreferrer">
									<img alt="map" src={map} className="rounded-lg" />
								</a>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
