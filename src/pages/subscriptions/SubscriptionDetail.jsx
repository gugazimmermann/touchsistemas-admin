import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { CSVLink } from 'react-csv';
import QRCode from 'qrcode';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { AppContext } from '../../context';
import { normalizeCEP } from '../../helpers';
import { Loading, Alert } from '../../components';
import { ROUTES, LANGUAGES } from '../../constants';

export default function SubscriptionDetail() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [success] = useState(location?.state?.success || null);
	const [edited] = useState(location?.state?.edited || null);
	const [loading, setLoading] = useState(false);
	const [subscription, setSubscription] = useState();
	const [visitors, setVisitors] = useState();
	const [logo, setLogo] = useState();
	const [map, setMap] = useState();
	const [headers, setHeaders] = useState();
	const [data, setData] = useState();
	const [qr, setQr] = useState('');

	// TODO: create visitors url and landing page
	async function generateQRCode() {
		try {
			const url = await QRCode.toDataURL(`${process.env.REACT_APP_SUBSCRIPTIONS_URL}${params.id}`, { width: 3840 });
			setQr(url);
		} catch (err) {
			console.error(err);
		}
	}

	// TODO: remove unused images from Storage Bucket and add new value logo in subscriptions DB
	async function handleLogo(id) {
		const list = await Storage.list(`logo/${id}`);
		if (list?.length) setLogo(`${process.env.REACT_APP_IMAGES_URL}logo/${id}.png?${new Date().getTime()}`);
	}

	// TODO: remove unused images from Storage Bucket and add new value logo in subscriptions DB
	async function handleMap(id) {
		const list = await Storage.list(`maps/${id}`);
		if (list?.length) setMap(`${process.env.REACT_APP_IMAGES_URL}maps/${id}.png?${new Date().getTime()}`);
	}

	function createReport(v) {
		const resportHeaders = [
			{ label: LANGUAGES[state.lang].subscription.details.report.name, key: 'name' },
			{ label: LANGUAGES[state.lang].subscription.details.report.phone, key: 'phone' },
			{ label: LANGUAGES[state.lang].subscription.details.report.email, key: 'email' },
			{ label: LANGUAGES[state.lang].subscription.details.report.state, key: 'state' },
			{ label: LANGUAGES[state.lang].subscription.details.report.city, key: 'city' },
		];

		const resportData = [];
		v.forEach((vi) =>
			resportData.push({
				name: vi.name,
				phone: vi.phone,
				email: vi.email,
				state: vi.state,
				city: vi.city,
			})
		);
		setHeaders(resportHeaders);
		setData(resportData);
	}

	async function handleVisitors(subscriptionData) {
		const visitorsArray = [];
		let token = null;
		do {
			const {
				data: { visitorByEventsID },
			} = await API.graphql(
				graphqlOperation(queries.visitorByEventsID, { EventsID: subscriptionData.id, limit: 1000, nextToken: token })
			);
			if (visitorByEventsID.items) visitorByEventsID.items.forEach((v) => visitorsArray.push(v));
			token = visitorByEventsID?.nextToken !== token ? visitorByEventsID.nextToken : null;
		} while (token);
		setVisitors(visitorsArray);
		subscriptionData.visitorsInfo = {
			surveysAnswered: visitorsArray.filter((t) => t.surveyAnswers).length,
			surveysPersonalData: visitorsArray.filter((t) => t.name).length,
		};
		createReport(visitorsArray);
		setSubscription(subscriptionData);
	}

	async function handleGetSubscription(id) {
		setLoading(true);
		const {
			data: { getSubscriptions },
		} = await API.graphql(graphqlOperation(queries.getSubscriptions, { id, active: 'TRUE' }));
		if (getSubscriptions) {
			if (getSubscriptions.referralCode) {
				const {
					data: {
						partnerByReferralCode: { items },
					},
				} = await API.graphql(
					graphqlOperation(queries.partnerByReferralCode, { referralCode: getSubscriptions.referralCode })
				);
				const [partner] = items;
				getSubscriptions.partner = partner;
			}
			setLoading(false);
			generateQRCode();
			setSubscription(getSubscriptions);
			handleLogo(getSubscriptions.id);
			handleMap(getSubscriptions.id);
			handleVisitors(getSubscriptions);
		} else {
			navigate(ROUTES[state.lang].DASHBOARD);
		}
	}

	function handleDashboard() {
		if (subscription.visitorsInfo.total)
			navigate(`${ROUTES[state.lang].DASHBOARD}/${subscription.id}`, { state: { subscription, visitors } });
	}

	function formatAddress(o) {
		let address = o.street;
		if (o.number) address += `, ${o.number}`;
		if (o.complement) address += ` (${o.complement})`;
		address += ` - ${o.city} / ${o.state} - ${normalizeCEP(o.zipCode)}`;
		return address;
	}

	function handleEdit() {
		navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${params.id}${ROUTES[state.lang].EDIT}`);
	}

	useEffect(() => {
		if (params.id) handleGetSubscription(params.id);
	}, [params]);

	function renderLogo() {
		return (
			<div className="w-6/12 sm:w-3/12 mb-4 flex justify-center items-center mx-auto sm:mx-0">
				<div className="bg-white shadow-md overflow-hidden rounded-lg">
					{logo ? (
						<img src={logo} alt="logo" className="object-cover w-full rounded-t-md" />
					) : (
						<img
							src="/image-placeholder.png"
							alt="logo"
							className="object-scale-down w-full rounded-t-md opacity-10  group-hover:opacity-5"
						/>
					)}
					<div className="my-2 text-center">
						<h3 className="font-bold">{subscription.name}</h3>
					</div>
				</div>
			</div>
		);
	}

	function renderSurveysAnsweredCard() {
		return (
			<div className="mt-4 mb-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex sm:hidden md:flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-fuchsia-500 right-4 -top-4">
						<i className="bx bxs-select-multiple" />
					</div>
					<div>
						<p className="text-lg font-bold">{LANGUAGES[state.lang].subscription.details.cards.answered}</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>{subscription?.visitorsInfo?.surveysAnswered || 0}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderCompleteSurveysCard() {
		return (
			<div className="mt-4 mb-4">
				<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
					<div className="text-white flex sm:hidden md:flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-violet-500 right-4 -top-4">
						<i className="bx bxs-bar-chart-square" />
					</div>
					<div>
						<p className="text-xl font-bold">{LANGUAGES[state.lang].subscription.details.cards.complete}</p>
						<div className="border-t-2 mb-2" />
						<div className="flex justify-between">
							<div className="w-full text-center">
								<p>Total</p>
							</div>
							<div className="w-full flex justify-center items-end">
								<p>{subscription?.visitorsInfo?.surveysPersonalData || 0}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function renderCards() {
		return (
			<div className="w-full sm:w-3/12 flex flex-col sm:justify-evenly">
				{renderSurveysAnsweredCard()}
				{renderCompleteSurveysCard()}
			</div>
		);
	}

	function renderDashboardCard() {
		return (
			<div className="bg-white shadow-md rounded-lg sm:w-3/12 flex flex-col justify-around mb-4">
				<div
					role="presentation"
					onClick={() => handleDashboard()}
					className={`${
						subscription?.visitorsInfo?.total && 'cursor-pointer'
					} w-full p-1 flex flex-col justify-center items-center text-secondary`}
				>
					<i className="bx bxs-pie-chart-alt-2 text-9xl" />
					<h2 className="text-lg font-bold">{LANGUAGES[state.lang].subscription.details.dashboard.report}</h2>
				</div>
				{data && subscription?.visitorsInfo?.total && (
					<CSVLink
						data={data}
						headers={headers}
						filename={slugify(subscription.name, { lower: true })}
						className="px-2 py-1 mx-8 my-2 bg-secondary text-white rounded-lg shadow-md text-center font-bold"
					>
						<i className="bx bxs-download" /> {LANGUAGES[state.lang].subscription.details.dashboard.export}
					</CSVLink>
				)}
			</div>
		);
	}

	function renderQRCodeCard() {
		return (
			<div className="bg-white shadow-md rounded-lg sm:w-2/12 flex flex-col justify-around py-2 mb-4">
				<a
					href={qr}
					download={`${slugify(`${subscription.name}-qrcode`, { lower: true })}.png`}
					className={`${
						subscription?.visitorsInfo?.total && 'cursor-pointer'
					} w-full flex flex-col justify-center items-center text-secondary`}
				>
					<img src={qr} alt="qr code" className="w-6/12 sm:w-full" />
					<h2 className="text-lg font-bold text-center">QR-Code Download</h2>
				</a>
			</div>
		);
	}

	function renderSurveyRow() {
		const surveyQuestions = subscription.Surveys.items.length;
		return (
			<div className="p-2 border-b grid grid-cols-12">
				<dt className="text-sm font-medium col-span-3">{LANGUAGES[state.lang].subscription.details.survey.title}:</dt>
				<dl className="text-sm font-bold col-span-4">
					{!surveyQuestions
						? LANGUAGES[state.lang].subscription.details.survey.noQuestions
						: `${surveyQuestions} ${LANGUAGES[state.lang].subscription.details.survey.questions}`}
				</dl>
				{!surveyQuestions && (
					<dl className="text-sm col-span-5 text-right">
						<button type="button" className="px-2 py-0.5 bg-orange-300 border-orange-500 text-white rounded-lg">
							{LANGUAGES[state.lang].subscription.details.survey.add}
						</button>
					</dl>
				)}
			</div>
		);
	}

	function renderDetails() {
		return (
			<div className="flex-1">
				<dl>
					{renderSurveyRow()}
					{subscription.website && (
						<div className="p-2 border-b grid grid-cols-12">
							<dt className="text-sm font-medium col-span-3">
								{LANGUAGES[state.lang].subscription.details.info.website}
							</dt>
							<dd className="text-sm col-span-9">
								<a href={subscription.website} target="_blank" rel="noreferrer">
									{subscription.website}
									<i className="bx bx-link-external ml-2" />
								</a>
							</dd>
						</div>
					)}
					{subscription.email && (
						<div className="p-2 border-b sm:grid grid-cols-12">
							<dt className="text-sm font-medium col-span-3">
								{LANGUAGES[state.lang].subscription.details.info.email}
							</dt>
							<dd className="text-sm col-span-9">
								<a href={`mailto:${subscription.email}`} target="_blank" rel="noreferrer">
									{subscription.email}
									<i className="bx bx-envelope ml-2" />
								</a>
							</dd>
						</div>
					)}
					<div className="p-2 border-b sm:grid grid-cols-12">
						<dt className="text-sm font-medium col-span-3">
							{LANGUAGES[state.lang].subscription.details.info.address}
						</dt>
						<dd className="text-sm col-span-9">{formatAddress(subscription)}</dd>
					</div>
					{subscription.partner && (
						<div className="p-2 border-b sm:grid grid-cols-12">
							<dt className="mt-2 text-sm font-medium col-span-3">
								{LANGUAGES[state.lang].subscription.details.info.partner}
							</dt>
							<dd className="mt-2 text-sm col-span-9">{`${subscription.partner.name} | ${subscription.partner.referralCode}`}</dd>
						</div>
					)}
				</dl>
				<div className="w-full text-center my-4">
					<button
						type="button"
						onClick={() => handleEdit()}
						className="px-6 py-1 bg-orange-300 border-orange-500 text-white rounded-lg"
					>
						{LANGUAGES[state.lang].subscription.details.edit}
					</button>
				</div>
			</div>
		);
	}

	function renderMap() {
		return (
			<div className="p-4 flex-1 flex justify-center items-center">
				<div className="w-full sm:w-6/12">
					<a href={map} target="_blank" rel="noreferrer">
						<img alt="map" src={map} className="rounded-lg" />
					</a>
				</div>
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{success && <Alert type="success">{LANGUAGES[state.lang].subscription.details.success}</Alert>}
			{edited && <Alert type="info">{LANGUAGES[state.lang].subscription.details.edited}</Alert>}
			{!loading && subscription && (
				<>
					<div className="flex flex-col sm:flex-row justify-between">
						{renderLogo()}
						{renderCards()}
						{renderDashboardCard()}
						{renderQRCodeCard()}
					</div>
					<div className="shadow-md rounded-lg flex flex-col sm:flex-row bg-white">
						{renderDetails()}
						{map && renderMap()}
					</div>
				</>
			)}
		</>
	);
}
