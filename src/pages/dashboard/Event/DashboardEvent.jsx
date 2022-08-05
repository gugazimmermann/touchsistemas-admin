/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import slugify from 'slugify';
import { getEvent, visitorsByEventID, surveysByEventID } from '../../../graphql/queries';
import Loading from '../../../components/Loading';

const colors = [
	'#f97316',
	'#22c55e',
	'#a855f7',
	'#3b82f6',
	'#ef4444',
	'#c2410c',
	'#15803d',
	'#7e22ce',
	'#1d4ed8',
	'#b91c1c',
	'#9a3412',
	'#14532d',
	'#581c87',
	'#1e3a8a',
	'#7f1d1d',
];

export default function Dashboard() {
	const params = useParams();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [visitors, setVisitors] = useState();
	const [logo, setLogo] = useState();
	const [survey, setSurvey] = useState();

	async function handleSurvey(data, id) {
		let {
			data: {
				surveysByEventID: { items: surveyQuestions },
			},
		} = await API.graphql(graphqlOperation(surveysByEventID, { EventID: id }));
		surveyQuestions = surveyQuestions.map((q) => ({ question: q.question, type: q.type }));
		const validSurvey = data.map((d) => JSON.parse(d.surveyAnswers)).filter((n) => n);
		const questions = [];
		surveyQuestions.forEach((q) => {
			let questionsAnswers = [];
			validSurvey.forEach((v) => {
				const findAnswers = v.find((qa) => qa.question === q.question);
				questionsAnswers.push(findAnswers.answer[0]);
			});
			questionsAnswers = questionsAnswers.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
			questionsAnswers = [...new Set(Object.entries(questionsAnswers))];
			questionsAnswers.unshift(['Type', 'Respostas']);
			questions.push({ type: q.type, title: q.question, data: questionsAnswers });
		});
		setSurvey({ questions });
	}

	async function handleVisitors(id) {
		setLoading(true);
		let visitorsData;
		if (!location?.state?.event) {
			const totalVisitors = [];
			let token = null;
			do {
				const getVisitors = await API.graphql(
					graphqlOperation(visitorsByEventID, { EventID: id, limit: 250, nextToken: token })
				);
				if (getVisitors?.data?.visitorsByEventID?.items) {
					getVisitors.data.visitorsByEventID.items.forEach((v) => totalVisitors.push(v));
				}
				token =
					getVisitors?.data?.visitorsByEventID?.nextToken !== token
						? getVisitors.data.visitorsByEventID.nextToken
						: null;
			} while (token);
			visitorsData = totalVisitors;
		} else {
			visitorsData = location.state.visitors;
		}
		await handleSurvey(visitorsData, id);
		setVisitors(visitorsData);
		setLoading(false);
	}

	async function handleLogo(id) {
		const list = await Storage.list(`logo/${id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setLogo(getUrl);
		}
	}

	async function handleGetEvent(id) {
		let eventData;
		setLoading(true);
		if (!location?.state?.event) {
			const getEventData = await API.graphql(graphqlOperation(getEvent, { id }));
			eventData = getEventData.data.getEvent;
		} else {
			eventData = location.state.event;
		}
		handleLogo(eventData.id);
		handleVisitors(eventData.id);
		setEvent(eventData);
		setLoading(false);
	}

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	function renderEventTitle() {
		return (
			<div className="bg-white shadow-md overflow-hidden rounded-lg">
				<Link to={`/eventos/${event.id}`} className="flex flex-col sm:flex-row justify-center items-center align-middle p-2">
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
				</Link>
			</div>
		);
	}

	function renderEventSurvey() {
		return (
			<>
				<h2 className="text-primary text-xl pt-4">Pesquisa do Evento</h2>
				<div className="w-full flex flex-row flex-wrap">
					{survey &&
						survey.questions.map((q) => (
							<div key={slugify(q.title)} className="w-6/12 p-2">
								<h3 className="text-center font-bold mb-2">{q.title}</h3>
								{q.type === 'SINGLE' ? (
									<Chart
										chartType="PieChart"
										data={q.data}
										options={{
											chartArea: { width: '100%', height: q.data.length > 4 ? '100%' : '80%' },
											colors,
											legend: {
												position: q.data.length > 4 ? 'labeled' : 'top',
												alignment: 'center',
												textStyle: { fontSize: 14 },
											},
											pieSliceTextStyle: { fontSize: 14 },
											is3D: true,
											pieSliceText: 'percentage',
										}}
										width="100%"
									/>
								) : (
									<Chart
										chartType="BarChart"
										data={q.data}
										options={{
											chartArea: { width: '100%', height: '100%' },
											colors,
											legend: { position: 'none' },
											titlePosition: 'in',
											axisTitlesPosition: 'in',
											hAxis: { textPosition: 'in' },
											vAxis: { textPosition: 'in' },
											bar: { groupWidth: '90%' },
										}}
										isStacked
										width="100%"
									/>
								)}
							</div>
						))}
				</div>
			</>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{event && visitors && (
				<>
					{renderEventTitle()}
					{renderEventSurvey()}
				</>
			)}
		</>
	);
}
