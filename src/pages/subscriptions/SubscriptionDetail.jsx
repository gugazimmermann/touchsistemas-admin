import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { CSVLink } from 'react-csv';
import QRCode from 'qrcode';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { AppContext } from '../../context';
import { normalizeCEP } from '../../helpers/forms';
import { Loading, Alert, Logo, SurveyCard } from '../../components';
import { ROUTES, LANGUAGES, PLANS } from '../../constants';

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

	function createReport(v) {
		const resportHeaders = [
			{ label: LANGUAGES[state.lang].subscriptions.details.report.name, key: 'name' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.phone, key: 'phone' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.email, key: 'email' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.state, key: 'state' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.city, key: 'city' },
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

	function handleAddSurvey() {
		navigate(`${ROUTES[state.lang].SURVEYS}`, { state: { type: PLANS.SUBSCRIPTION, subscription } });
	}

	useEffect(() => {
		if (params.id) handleGetSubscription(params.id);
	}, [params]);

	function renderCards() {
		return (
			<div className="w-full sm:w-3/12 flex flex-col sm:justify-evenly">
				<SurveyCard
					title={LANGUAGES[state.lang].subscriptions.details.cards.answered}
					value={subscription?.visitorsInfo?.surveysAnswered}
					color="bg-fuchsia-500"
					icon={<i className="bx bxs-select-multiple" />}
				/>
				<SurveyCard
					title={LANGUAGES[state.lang].subscriptions.details.cards.complete}
					value={subscription?.visitorsInfo?.surveysPersonalData}
					color="bg-violet-500"
					icon={<i className="bx bxs-bar-chart-square" />}
				/>
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
					<h2 className="text-lg font-bold">{LANGUAGES[state.lang].subscriptions.details.dashboard.report}</h2>
				</div>
				{data && subscription?.visitorsInfo?.total && (
					<CSVLink
						data={data}
						headers={headers}
						filename={slugify(subscription.name, { lower: true })}
						className="px-2 py-1 mx-8 my-2 bg-secondary text-white rounded-lg shadow-md text-center font-bold"
					>
						<i className="bx bxs-download" /> {LANGUAGES[state.lang].subscriptions.details.dashboard.export}
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
		const questions = subscription.Surveys.items;
		const languages = [...new Set(questions.map((q) => q.language))];
		return (
			<div className="p-2 border-b grid grid-cols-12">
				<dt className="text-sm font-medium col-span-3">{LANGUAGES[state.lang].subscriptions.details.survey.title}:</dt>
				<dl className="text-sm font-bold col-span-4">
					{!questions.length
						? LANGUAGES[state.lang].subscriptions.details.survey.noQuestions
						: `${questions.length} ${LANGUAGES[state.lang].subscriptions.details.survey.questions} / ${
								languages.length
						  } Idiomas`}
				</dl>
				<dl className="text-sm col-span-5 text-right">
					{!questions.length ? (
						<button
							type="button"
							onClick={() => handleAddSurvey()}
							className="px-2 py-0.5 bg-orange-300 border-orange-500 text-white rounded"
						>
							{LANGUAGES[state.lang].subscriptions.details.survey.add}
						</button>
					) : (
						<button
							type="button"
							onClick={() => handleAddSurvey()}
							className="px-2 py-0.5 bg-orange-300 border-orange-500 text-white rounded"
						>
							Visualizar
						</button>
					)}
				</dl>
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
								{LANGUAGES[state.lang].subscriptions.details.info.website}
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
								{LANGUAGES[state.lang].subscriptions.details.info.email}
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
							{LANGUAGES[state.lang].subscriptions.details.info.address}
						</dt>
						<dd className="text-sm col-span-9">{formatAddress(subscription)}</dd>
					</div>
					{subscription.partner && (
						<div className="p-2 border-b sm:grid grid-cols-12">
							<dt className="mt-2 text-sm font-medium col-span-3">
								{LANGUAGES[state.lang].subscriptions.details.info.partner}
							</dt>
							<dd className="mt-2 text-sm col-span-9">{`${subscription.partner.name} | ${subscription.partner.referralCode}`}</dd>
						</div>
					)}
				</dl>
				<div className="w-full text-center my-4">
					<button
						type="button"
						onClick={() => handleEdit()}
						className="px-6 py-1 bg-orange-300 border-orange-500 text-white rounded"
					>
						{LANGUAGES[state.lang].subscriptions.details.edit}
					</button>
				</div>
			</div>
		);
	}

	function renderMap() {
		return (
			<div className="p-4 flex-1 flex justify-center items-center">
				<a href={subscription.map} target="_blank" rel="noreferrer" className="w-full sm:w-6/12">
					<img alt="map" src={subscription.map} className="rounded-lg" />
				</a>
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{success && <Alert type="success">{LANGUAGES[state.lang].subscriptions.details.success}</Alert>}
			{edited && <Alert type="info">{LANGUAGES[state.lang].subscriptions.details.edited}</Alert>}
			{!loading && subscription && (
				<>
					<div className="flex flex-col sm:flex-row justify-between">
						<Logo logo={subscription.logo} name={subscription.name} />
						{renderCards()}
						{renderDashboardCard()}
						{renderQRCodeCard()}
					</div>
					<div className="shadow-md rounded-lg flex flex-col sm:flex-row bg-white">
						{renderDetails()}
						{subscription.map && renderMap()}
					</div>
				</>
			)}
		</>
	);
}
