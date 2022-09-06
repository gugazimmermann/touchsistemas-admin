import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { Loading, Alert, Title, Form } from '../../components';
import { LANGUAGES, PLANS, ROUTES, SURVEY } from '../../constants';
import LanguageSelection from './components/LanguageSelection';
import QuestionForm from './components/QuestionForm';
import AnswerForm from './components/AnswerForm';
import QuestionList from './components/QuestionList';
import { createSurvey } from '../../api/mutations';

const initial = {
	type: '',
	answerRequired: '',
	question: '',
	answer: '',
	answers: [],
};

export default function Surveys() {
	const location = useLocation();
	const navigate = useNavigate();
	const { loadClient } = useOutletContext();
	const { state } = useContext(AppContext);
	const [type] = useState(location?.state?.type || false);
	const [subscription] = useState(location?.state?.subscription || false);
	const [event] = useState(location?.state?.event || false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [language, setLanguage] = useState(null);
	const [survey, setSurvey] = useState([]);
	const [formSurvey, setFormSurvey] = useState(initial);

	function handleBack() {
		setLanguage(null);
		setFormSurvey(initial);
		setSurvey([]);
	}

	function formatSurveyToSave() {
		const formatedSurvey = survey.map((q, i) => ({
			order: i + 1,
			language,
			type: q.type,
			required: q.required,
			question: q.question,
			answers: q.answers.map((a, ai) => ({
				order: ai + 1,
				answer: a.answer,
			})),
			EventsID: event.id || null,
			SubscriptionsID: subscription.id || null,
		}));
		return formatedSurvey;
	}

	async function handleSaveSurvey() {
		setLoading(true);
		const formatedSurvey = formatSurveyToSave();
		for (const s of formatedSurvey) await createSurvey(s);
		loadClient(true);
		setLoading(false);
		if (subscription) navigate(`${ROUTES[state.lang].SUBSCRIPTIONS}/${subscription.id}`);
		if (event) navigate(`${ROUTES[state.lang].EVENTS}/${event.id}`);
	}

	function validadeForm() {
		if (!formSurvey.type || !formSurvey.question) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			return false;
		}
		if (
			(formSurvey.type === SURVEY.SINGLE || formSurvey.type === SURVEY.MULTIPLE) &&
			(!formSurvey.answers || !formSurvey.answers.length)
		) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			return false;
		}
		return true;
	}

	async function handleSaveQuestion() {
		setLoading(true);
		setErrorMsg('');
		setError(false);
		if (!validadeForm()) setError(true);
		setSurvey([
			...survey,
			{
				id: uuidv4(),
				type: formSurvey.type,
				required: !formSurvey.answerRequired ? false : formSurvey.answerRequired !== LANGUAGES[state.lang].no,
				question: formSurvey.question,
				answers: formSurvey.answers.map((a, i) => ({ order: i, answer: a.answer })),
			},
		]);
		setFormSurvey(initial);
		setLoading(false);
		return true;
	}

	useEffect(() => {
		if (!type) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && type === PLANS.SUBSCRIPTION && !subscription) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && (type === PLANS.BASIC || type === PLANS.ADVANCED) && !event) navigate(ROUTES[state.lang].DASHBOARD);
	}, [type]);

	function renderBackButton() {
		return (
			<button
				type="button"
				onClick={() => handleBack()}
				className="flex items-center bg-slate-500 px-2 py-1 pr-4 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-danger hover:shadow-md focus:bg-danger focus:shadow-md focus:outline-none focus:ring-0 active:bg-danger active:shadow-md transition duration-150 ease-in-out"
			>
				<i className="bx bx-left-arrow-alt text-xl mr-2" />
				{LANGUAGES[state.lang].back}
			</button>
		);
	}

	function renderAnswerButtons() {
		return (
			<div className="w-full flex justify-evenly">
				{!survey.length && renderBackButton()}
				<button
					type="button"
					onClick={() => handleSaveQuestion()}
					className="flex items-center bg-primary px-2 py-1 pr-4 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
				>
					<i className="bx bx-down-arrow-alt text-xl mr-2" />
					{`${LANGUAGES[state.lang].save} ${LANGUAGES[state.lang].surveys.question}`}
				</button>
			</div>
		);
	}

	function renderQuestionButtons() {
		return (
			<div className="w-full flex justify-evenly">
				{renderBackButton()}
				<button
					type="button"
					onClick={() => handleSaveSurvey()}
					className="flex items-center bg-primary px-2 py-1 pr-4 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
				>
					<i className="bx bx-down-arrow-alt text-xl mr-2" />
					{`${LANGUAGES[state.lang].save} ${LANGUAGES[state.lang].surveys.title}`}
				</button>
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<div className="flex flex-row justify-between items-center">
				<Title
					text={`${subscription?.name || event?.name}: ${LANGUAGES[state.lang].surveys.title}`}
					back={
						subscription
							? `${ROUTES[state.lang].SUBSCRIPTIONS}/${subscription.id}`
							: `${ROUTES[state.lang].EVENTS}/${event.id}`
					}
				/>
				{language && <Title text={`${LANGUAGES[state.lang].surveys[language]}`} onClick={() => setLanguage(null)} />}
			</div>
			<Form>
				<div className="w-full flex flex-wrap">
					{!language && <LanguageSelection language={language} setLanguage={setLanguage} />}
					{language && (
						<>
							<QuestionForm form={formSurvey} setForm={setFormSurvey} />
							{(formSurvey.type === SURVEY.SINGLE || formSurvey.type === SURVEY.MULTIPLE) && (
								<AnswerForm form={formSurvey} setForm={setFormSurvey} />
							)}
							{renderAnswerButtons()}
						</>
					)}
				</div>
			</Form>
			{!!survey.length && (
				<>
					<QuestionList survey={survey} setForm={setFormSurvey} />
					{renderQuestionButtons()}
				</>
			)}
		</>
	);
}
