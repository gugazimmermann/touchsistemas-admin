import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { formatAddress } from '../../helpers/forms';
import { Loading, Alert, Logo, MapCard, SurveyCard, QRCodeCard, ReportCard } from '../../components';
import { ROUTES, LANGUAGES, PLANS } from '../../constants';
import {
	getSubscriptionByID,
	getPartnerByReferralCode,
	getVisitorsBySubscriptionID,
	listSurveysBySubscriptionsID,
} from '../../api/queries';
import generateQRCode from '../../helpers/qrCode';

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
	const [surveys, setSurveys] = useState([]);
	const [QRCode, setQRCode] = useState('');

	async function handleSurvey(content) {
		setLoading(true);
		const listSurveys = await listSurveysBySubscriptionsID(content.id);
		setSurveys(listSurveys);
		setLoading(false);
	}

	async function handleVisitors(content) {
		setLoading(true);
		const visitorsArray = await getVisitorsBySubscriptionID(content.id);
		content.visitorsInfo = {
			surveysAnswered: visitorsArray.filter((t) => t.surveyAnswers).length,
			surveysPersonalData: visitorsArray.filter((t) => t.name).length,
		};
		setSubscription(content);
		setVisitors(visitorsArray);
		setLoading(false);
	}

	async function handleGetSubscription(id) {
		setLoading(true);
		const content = await getSubscriptionByID(id, true);
		if (content) {
			if (content.referralCode) content.Partner = await getPartnerByReferralCode(content.referralCode);
			setQRCode(await generateQRCode(PLANS.SUBSCRIPTION, content.id));
			setSubscription(content);
			setLoading(false);
			handleVisitors(content);
			handleSurvey(content);
		} else {
			navigate(ROUTES[state.lang].DASHBOARD);
		}
	}

	useEffect(() => {
		if (!params.id) navigate(ROUTES[state.lang].DASHBOARD);
		handleGetSubscription(params.id);
	}, [params]);

	function handleEdit() {
		navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${params.id}${ROUTES[state.lang].EDIT}`);
	}

	function handleAddSurvey() {
		navigate(`${ROUTES[state.lang].SURVEYS}`, { state: { type: PLANS.SUBSCRIPTION, subscription } });
	}

	function handleVisualizeSurvey() {
		navigate(`${ROUTES[state.lang].SURVEYS}/${subscription.id}`, {
			state: { type: PLANS.SUBSCRIPTION, subscription, survey: subscription.Surveys.items },
		});
	}

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

	function renderSurveyRow() {
		const languages = [...new Set(surveys.map((q) => q.language))];
		return (
			<div className="p-2 border-b grid grid-cols-12">
				<dt className="text-sm font-medium col-span-3">{LANGUAGES[state.lang].subscriptions.details.survey.title}:</dt>
				<dl className="text-sm font-bold col-span-4">
					{!surveys.length
						? LANGUAGES[state.lang].subscriptions.details.survey.noQuestions
						: `${surveys.length} ${LANGUAGES[state.lang].subscriptions.details.survey.questions} / ${
								languages.length
						  } Idiomas`}
				</dl>
				<dl className="text-sm col-span-5 text-right">
					{!surveys.length ? (
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
							onClick={() => handleVisualizeSurvey()}
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
					{surveys?.length > 0 && renderSurveyRow()}
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
					{subscription.Partner && (
						<div className="p-2 border-b sm:grid grid-cols-12">
							<dt className="mt-2 text-sm font-medium col-span-3">
								{LANGUAGES[state.lang].subscriptions.details.info.partner}
							</dt>
							<dd className="mt-2 text-sm col-span-9">{`${subscription.Partner.name} | ${subscription.Partner.referralCode}`}</dd>
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
						<ReportCard id={subscription.id} name={subscription.name} visitors={visitors} />
						<QRCodeCard QRCode={QRCode} name={subscription.name} show={subscription?.visitorsInfo?.total} />
					</div>
					<div className="shadow-md rounded-lg flex flex-col sm:flex-row bg-white">
						{renderDetails()}
						{subscription.map && (
							<div className="p-4 flex-1 flex justify-center items-center">
								<MapCard map={subscription.map} />
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
