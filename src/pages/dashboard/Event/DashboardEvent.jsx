import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getEvent, visitorsByEventID } from '../../../graphql/queries';
import Loading from '../../../components/Loading';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
	const params = useParams();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState();
	const [visitors, setVisitors] = useState();
	const [logo, setLogo] = useState();
	const [survey, setSurvey] = useState();

	function handleSurvey(data) {
		console.log(data[1])
		console.log(JSON.parse(data[1].surveyAnswers))
		const groupBy = (key) => data.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [
					...(result[item[key]] || []),
					item,
				],
			}), 
			{},
		);
		const byGender = groupBy('gender');
		delete byGender.null;
		const byGenderLabel = [...new Set(Object.keys(byGender))]
		const byGenderData = byGenderLabel.map(l => byGender[l].length)

		const bySex = {
			labels: byGenderLabel,
			datasets: [
				{
					label: 'Visitantes Por Sexo',
					data: byGenderData,
					backgroundColor: [
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 99, 132, 0.2)',
						'rgba(153, 102, 255, 0.2)',
					],
					borderColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(255, 99, 132, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderWidth: 1,
				},
			],
		};
		setSurvey({ bySex })
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
			visitorsData = location.state.visitors
		}
		handleSurvey(visitorsData)
		setVisitors(visitorsData);
		setLoading(false);
	}

	async function handleGetEvent(id) {
		let eventData;
		setLoading(true);
		if (!location?.state?.event) {
			const getEventData = await API.graphql(graphqlOperation(getEvent, { id }));
			eventData = getEventData.data.getEvent;
		} else {
			eventData = location.state.event
		}
		setEvent(eventData);
		setLoading(false);
	}

	async function handleLogo() {
		const list = await Storage.list(`logo/${event.id}`);
		if (list?.length) {
			const getUrl = await Storage.get(list[0].key);
			setLogo(getUrl);
		}
	}

	useEffect(() => {
		if (event) handleLogo();
	}, [event]);

	useEffect(() => {
		if (params.id) {
			handleGetEvent(params.id);
			handleVisitors(params.id);
		}
	}, [params]);

	return (
		<>
			{loading && <Loading />}
			{event && visitors && (
				<>
					<div className="bg-white shadow-md overflow-hidden rounded-lg">
						<div className="flex flex-col sm:flex-row justify-center items-center align-middle p-2">
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
						</div>
					</div>
					{survey && (
						<div className="grid grid-cols-4 gap-4">
							<div>
								<Pie data={survey.bySex} />
							</div>
							<div>
								<Pie data={survey.bySex} />
							</div>
							<div>
								<Pie data={survey.bySex} />
							</div>
							<div>
								<Pie data={survey.bySex} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
