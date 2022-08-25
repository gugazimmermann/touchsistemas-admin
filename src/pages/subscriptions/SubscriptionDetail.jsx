/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { CSVLink } from 'react-csv';
import QRCode from 'qrcode';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getSubscriptions, partnerByReferralCode, visitorByEventID } from '../../graphql/queries';
import { AppContext } from '../../context';
import { Loading, Alert, LoadingIcon } from '../../components';
import { ROUTES } from '../../constants';

export default function SubscriptionDetail() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [success] = useState(location?.state?.success || null);
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

	async function handleVisitors(subscriptionData) {
		const visitorsArray = [];
		let token = null;
		do {
			const getVisitors = await API.graphql(
				graphqlOperation(visitorByEventID, { EventID: subscriptionData.id, limit: 1000, nextToken: token })
			);
			if (getVisitors?.data?.visitorByEventID?.items) {
				getVisitors.data.visitorByEventID.items.forEach((v) => visitorsArray.push(v));
			}
			token =
				getVisitors?.data?.visitorByEventID?.nextToken !== token ? getVisitors.data.visitorByEventID.nextToken : null;
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
		const oneSubscription = await API.graphql(graphqlOperation(getSubscriptions, { id }));
		const subscriptionData = oneSubscription.data.getSubscriptions;
		if (subscriptionData) {
			if (subscriptionData.referralCode) {
				const partnerDetails = await API.graphql(
					graphqlOperation(partnerByReferralCode, { referralCode: subscriptionData.referralCode })
				);
				const partner = partnerDetails.data.partnerByReferralCode.items[0];
				subscriptionData.partner = partner;
			}
			setLoading(false);
			generateQRCode();
			setSubscription(subscriptionData);
			handleLogo(subscriptionData.id);
			handleMap(subscriptionData.id);
			handleVisitors(subscriptionData);
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
		address += ` - ${o.city} / ${o.state} | ${o.zipCode}`;
		return address;
	}

	useEffect(() => {
		if (params.id) handleGetSubscription(params.id);
	}, [params]);

	function renderLogo() {
		return (
			<div className="w-full md:w-3/12 mb-4 flex justify-center items-center">
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
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-fuchsia-500 right-4 -top-4">
						<i className="bx bxs-select-multiple" />
					</div>
					<div>
						<p className="text-lg font-bold">Respondidas</p>
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
					<div className="text-white flex items-center absolute rounded-full shadow-md text-3xl p-2 bg-violet-500 right-4 -top-4">
						<i className="bx bxs-bar-chart-square" />
					</div>
					<div>
						<p className="text-xl font-bold">Completas</p>
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
			<div className="w-full md:w-3/12 flex flex-col sm:justify-between">
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
					<h2 className="text-lg font-bold">Relatório</h2>
				</div>
				{data && subscription?.visitorsInfo?.total && (
					<CSVLink
						data={data}
						headers={headers}
						filename={slugify(subscription.name, { lower: true })}
						className="px-2 py-1 mx-8 my-2 bg-secondary text-white rounded-lg shadow-md text-center font-bold"
					>
						<i className="bx bxs-download" /> Exportar Dados
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
					download={`${slugify(subscription.name, { lower: true })}.png`}
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
				<dt className="text-sm font-medium col-span-3">Pesquisa:</dt>
				<dl className="text-sm font-bold col-span-4">
					{!surveyQuestions ? 'Não Cadastrada' : `${surveyQuestions} perguntas`}
				</dl>
				{!surveyQuestions && (
					<dl className="text-sm col-span-5 text-right">
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
			{success && <Alert type="success">Assinatura Cadastrada com Sucesso</Alert>}
			{!loading && subscription && (
				<>
					<div className="flex flex-col md:flex-row justify-between">
						{renderLogo()}
						{renderCards()}
						{renderDashboardCard()}
						{renderQRCodeCard()}
					</div>
					<div className="shadow-md rounded-lg flex flex-col md:flex-row bg-white">
						<dl className="flex-1">
							{renderSurveyRow()}
							{subscription.website && (
								<div className="p-2 border-b grid grid-cols-12">
									<dt className="text-sm font-medium col-span-3">WebSite</dt>
									<dd className="text-sm col-span-9">{subscription.website}</dd>
								</div>
							)}
							{subscription.email && (
								<div className="p-2 border-b sm:grid grid-cols-12">
									<dt className="text-sm font-medium col-span-3">Email</dt>
									<dd className="text-sm col-span-9">{subscription.email}</dd>
								</div>
							)}
							<div className="p-2 border-b sm:grid grid-cols-12">
								<dt className="text-sm font-medium col-span-3">Endereço</dt>
								<dd className="text-sm col-span-9">{formatAddress(subscription)}</dd>
							</div>

							{subscription.partner && (
								<div className="p-2 border-b sm:grid grid-cols-12">
									<dt className="mt-2 text-sm font-medium col-span-3">Parceiro</dt>
									<dd className="mt-2 text-sm col-span-9">{`${subscription.partner.name} | ${subscription.partner.referralCode}`}</dd>
								</div>
							)}
						</dl>
						{map && (
							<div className="p-4 flex-1 flex justify-center items-center">
								<div className="w-6/12">
									<a href={map} target="_blank" rel="noreferrer">
										<img alt="map" src={map} className="rounded-lg" />
									</a>
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
