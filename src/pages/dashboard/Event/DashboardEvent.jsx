/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import slugify from 'slugify';
import { getEvents, visitorByEventsID, surveyByEventsID } from '../../../graphql/queries';
import { Loading } from '../../../components';

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
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [visitors, setVisitors] = useState();
	const [logo, setLogo] = useState();
	const [visitorsData, setVisitorsData] = useState();
	const [survey, setSurvey] = useState();

	function handleByGender(visitorsSurvey) {
		let byGender = visitorsSurvey
			.map((d) => d.gender)
			.filter((n) => n)
			.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
		byGender = [...new Set(Object.entries(byGender))];
		byGender.unshift(['Type', 'Respostas']);
		return {
			chartType: 'PieChart',
			title: 'Por Gênero',
			data: byGender,
		};
	}

	function handleByAgeRange(visitorsSurvey, eventData) {
		const range = [18, 25, 35, 45, 55, 65];
		let byAgeRange = visitorsSurvey
			.map((d) => d.birthdate && moment(eventData.dates[0]).diff(moment(d.birthdate), 'years'))
			.filter((n) => n);
		byAgeRange.sort();
		byAgeRange = range.map((r, i) => {
			if (!range[i - 1]) {
				return {
					range: `Até ${r}`,
					qtd: byAgeRange.map((d) => d < r).filter((d) => d).length,
				};
			}
			if (!range[i + 1]) {
				return {
					range: `Mais de ${r}`,
					qtd: byAgeRange.map((d) => d >= r).filter((d) => d).length,
				};
			}
			return {
				range: `De ${range[i - 1]} a ${r}`,
				qtd: byAgeRange.map((d) => d >= range[i - 1] + 1 && d < r).filter((d) => d).length,
			};
		});
		byAgeRange = byAgeRange.map((a) => [a.range, a.qtd]);
		byAgeRange.unshift(['Type', 'Respostas']);
		return {
			chartType: 'PieChart',
			title: 'Por Faixa Etária',
			data: byAgeRange,
		};
	}

	function handleByMaritalStatus(visitorsSurvey) {
		let byMaritalStatus = [
			{
				range: `Solteiro`,
				qtd: visitorsSurvey.filter((d) => d.maritalStatus !== true).length,
			},
			{
				range: `Casado`,
				qtd: visitorsSurvey.filter((d) => d.maritalStatus === true).length,
			},
		];
		byMaritalStatus = byMaritalStatus.map((a) => [a.range, a.qtd]);
		byMaritalStatus.unshift(['Type', 'Respostas']);
		return {
			chartType: 'PieChart',
			title: 'Por Estado Civil',
			data: byMaritalStatus,
		};
	}

	function handleByHour(visitorsSurvey) {
		let range = ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'];
		range = range.map((r) => moment(r, 'HH:mm'));
		const codeUsed = visitorsSurvey.map((d) => d.codeUsed).filter((n) => moment(n).isValid());
		let byHour = codeUsed.map((d) => `${d.hours()}:${d.minutes()}`).map((d) => moment(d, 'HH:mm'));
		byHour.sort();
		byHour = range.map((r, i) => {
			if (!range[i + 1]) {
				return {
					range: `Após ${r.format('HH')}`,
					qtd: byHour.map((d) => d >= r && d < range[0]).filter((n) => n).length,
				};
			}
			if (range[i + 1].format('HH:mm') === '00:00') {
				return {
					range: `Entre ${r.format('HH')} e ${range[i + 1].format('HH')}`,
					qtd: byHour.map((d) => d >= r).filter((n) => n).length,
				};
			}
			return {
				range: `Entre ${r.format('HH')} e ${range[i + 1].format('HH')}`,
				qtd: byHour.map((d) => d >= r && d < range[i + 1]).filter((n) => n).length,
			};
		});
		byHour = byHour.map((a) => [a.range, a.qtd]);
		byHour.unshift(['Type', 'Respostas']);
		return {
			chartType: 'PieChart',
			title: 'Por Horário',
			data: byHour,
		};
	}

	function handleByState(visitorsSurvey) {
		let byState = visitorsSurvey
			.map((d) => d.state)
			.filter((n) => n)
			.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
		byState = [...new Set(Object.entries(byState))];
		byState.unshift(['Type', 'Respostas']);
		return {
			chartType: 'PieChart',
			title: 'Por Estado',
			data: byState,
		};
	}

	function handleByCities(visitorsSurvey) {
		let byCities = visitorsSurvey
			.map((d) => d.city)
			.filter((n) => n)
			.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
		byCities = [...new Set(Object.entries(byCities))];
		byCities = byCities.sort((a, b) => b[1] - a[1]);
		byCities.unshift(['Type', 'Respostas']);
		return {
			chartType: 'Bar',
			title: 'Cidades mais Presentes',
			data: byCities.slice(0, 10),
		};
	}

	async function handleVisitorsData(data, eventData) {
		const visitorsDataArray = [];
		const visitorsSurvey = data
			.map((d) => {
				if (d.name) {
					return {
						createdAt: moment(d.createdAt),
						codeUsed: d.birthdate ? moment(d.codeUsed) : null,
						birthdate: d.birthdate ? moment(d.birthdate) : null,
						city: d.city,
						gender: d.gender,
						state: d.state,
						maritalStatus: d.maritalStatus,
						disabledPerson: d.disabledPerson,
					};
				}
				return null;
			})
			.filter((d) => d);
		const byGender = handleByGender(visitorsSurvey);
		visitorsDataArray.push(byGender);
		const byAgeRange = handleByAgeRange(visitorsSurvey, eventData);
		visitorsDataArray.push(byAgeRange);
		const byMaritalStatus = handleByMaritalStatus(visitorsSurvey);
		visitorsDataArray.push(byMaritalStatus);
		// TODO: fix disabled person in DB and update
		const byHour = handleByHour(visitorsSurvey);
		visitorsDataArray.push(byHour);
		const byState = handleByState(visitorsSurvey);
		visitorsDataArray.push(byState);
		const byCities = handleByCities(visitorsSurvey);
		visitorsDataArray.push(byCities);
		setVisitorsData(visitorsDataArray);
	}

	async function handleSurvey(data, eventData) {
		let {
			data: {
				surveysByEventID: { items: surveyQuestions },
			},
		} = await API.graphql(graphqlOperation(surveyByEventsID, { EventID: eventData.id }));
		surveyQuestions.sort((a, b) => a.order - b.order);
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

	async function handleVisitors(eventData) {
		setLoading(true);
		let surveyData;
		if (!location?.state?.event) {
			const totalVisitors = [];
			let token = null;
			do {
				const getVisitors = await API.graphql(
					graphqlOperation(visitorByEventsID, { EventID: eventData.id, limit: 1000, nextToken: token })
				);
				if (getVisitors?.data?.visitorsByEventID?.items) {
					getVisitors.data.visitorsByEventID.items.forEach((v) => totalVisitors.push(v));
				}
				token =
					getVisitors?.data?.visitorsByEventID?.nextToken !== token
						? getVisitors.data.visitorsByEventID.nextToken
						: null;
			} while (token);
			surveyData = totalVisitors;
		} else {
			surveyData = location.state.visitors;
		}
		await handleVisitorsData(surveyData, eventData);
		await handleSurvey(surveyData, eventData);
		setVisitors(surveyData);
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
			const getEventData = await API.graphql(graphqlOperation(getEvents, { id }));
			if (getEventData.data.getEvent) eventData = getEventData.data.getEvent;
			else navigate('/dashboard');
		} else {
			eventData = location.state.event;
		}
		handleLogo(eventData.id);
		handleVisitors(eventData);
		setEvent(eventData);
		setLoading(false);
	}

	useEffect(() => {
		if (params.id) handleGetEvent(params.id);
	}, [params]);

	function renderEventTitle() {
		return (
			<div className="bg-white shadow-md overflow-hidden rounded-lg">
				<Link
					to={`/eventos/${event.id}`}
					className="flex flex-col sm:flex-row justify-center items-center align-middle p-2"
				>
					{logo && (
						<div className="w-3/12 mb-2 sm:mb-0 sm:w-2/12 md:w-1/12">
							<img alt="logo" className="object-scale-down w-full rounded-md" src={logo} />
						</div>
					)}
					<div
						className={`${
							logo ? 'w-full sm:w-8/12 md:w-11/12' : 'w-full'
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

	function renderEventVisitors() {
		return (
			<>
				<h2 className="text-primary text-xl pt-4 mb-4">Dados dos Visitantes</h2>
				<div className="w-full flex flex-row flex-wrap">
					{visitorsData &&
						visitorsData.map((d) => (
							<div key={slugify(d.title)} className="w-full sm:w-6/12 sm:p-2 mb-8">
								<h3 className="text-center font-bold mb-4">{d.title}</h3>
								{d.chartType === 'PieChart' ? (
									<Chart
										chartType="PieChart"
										data={d.data}
										options={{
											chartArea: { width: '100%', height: '100%' },
											colors,
											legend: {
												position: 'labeled',
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
										chartType={d.chartType}
										data={d.data}
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

	function renderEventSurvey() {
		return (
			<>
				<h2 className="text-primary text-xl pt-4 mb-4">Pesquisa do Evento</h2>
				<div className="w-full flex flex-row flex-wrap">
					{survey &&
						survey.questions.map((q) => (
							<div key={slugify(q.title)} className="w-full sm:w-6/12 sm:p-2 mb-8">
								<h3 className="text-center font-bold mb-4">{q.title}</h3>
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
					{renderEventVisitors()}
					{renderEventSurvey()}
				</>
			)}
		</>
	);
}
