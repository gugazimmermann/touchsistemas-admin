/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useContext, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { Loading, Alert, Title } from '../../components';
import { LANGUAGES, PLANS, ROUTES, SURVEY } from '../../constants';

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

	async function handleSaveSurvey() {
		const s = survey.map((q, i) => ({
			order: i,
			language,
			type: q.type,
			required: q.required,
			question: q.question,
			answers: q.answers.map((a, ai) => ({
				order: ai,
				answer: a.answer,
			})),
			EventsID: event.id || null,
			Subscriptions: subscription.id || null,
		}));
		console.debug(s);
	}

	function handleBack() {
		setLanguage(null);
		setFormSurvey(initial);
		setSurvey([]);
	}

	function handleAddAnswer() {
		setFormSurvey({
			...formSurvey,
			answers: [...formSurvey.answers, { id: uuidv4(), answer: formSurvey.answer }],
			answer: '',
		});
	}

	function handleRemoveAnswer(answer) {
		setFormSurvey({ ...formSurvey, answers: formSurvey.answers.filter((a) => a.id !== answer.id) });
	}

	const reorderAnswers = (l, s, e) => {
		const res = Array.from(l);
		const [removed] = res.splice(s, 1);
		res.splice(e, 0, removed);
		return res;
	};

	function onDragAnswerEnd(r) {
		if (!r.destination) return;
		if (r.destination.index === r.source.index) return;
		const answers = reorderAnswers(formSurvey.answers, r.source.index, r.destination.index);
		setFormSurvey({ ...formSurvey, answers });
	}

	function Answer({ answer, index }) {
		return (
			<Draggable draggableId={answer.id} index={index}>
				{(provided) => (
					<div
						className="item-container"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="w-full flex flex-wrap">
							<div className="item-container flex items-center justify-center w-1/12 mb-4">
								<i className="bx bx-move-vertical text-xl" />
							</div>
							<div className="w-9/12 pr-4 mb-4">
								<input
									value={answer.answer}
									type="text"
									disabled
									className="block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
								/>
							</div>
							<div className="flex items-center w-2/12 mb-4">
								<button
									type="button"
									onClick={() => handleRemoveAnswer(answer)}
									className="flex items-center justify-center w-full h-full bg-danger px-2 py-1 text-xs text-white font-semibold uppercase rounded shadow-md cursor-pointer"
								>
									<i className="bx bx-minus-circle text-xl sm:mr-2" />
									<span className="hidden sm:flex">{LANGUAGES[state.lang].surveys.remove}</span>
								</button>
							</div>
						</div>
					</div>
				)}
			</Draggable>
		);
	}

	const AnswersList = memo(({ answers }) => answers.map((a, i) => <Answer answer={a} index={i} key={a.id} />));

	async function handleSaveQuestion() {
		setLoading(true);
		setErrorMsg('');
		setError(false);
		if (!formSurvey.type || !formSurvey.question) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (
			(formSurvey.type === SURVEY.SINGLE || formSurvey.type === SURVEY.MULTIPLE) &&
			(!formSurvey.answers || !formSurvey.answers.length)
		) {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.required);
			setError(true);
			setLoading(false);
			return null;
		}
		setLoading(false);
		setFormSurvey(initial);
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
		return true;
	}

	function handleRemoveQuestion(question) {
		setSurvey(survey.filter((q) => q.id !== question.id));
	}

	const reorderQuestions = (l, s, e) => {
		const res = Array.from(l);
		const [removed] = res.splice(s, 1);
		res.splice(e, 0, removed);
		return res;
	};

	function onDragQuestionEnd(r) {
		if (!r.destination) return;
		if (r.destination.index === r.source.index) return;
		const questions = reorderQuestions(survey, r.source.index, r.destination.index);
		setSurvey(questions);
	}

	function Question({ question, index }) {
		return (
			<Draggable draggableId={question.id} index={index}>
				{(provided) => (
					<div
						className="item-container"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className="w-full flex flex-wrap">
							<div className="item-container flex items-center justify-center w-1/12 mb-4">
								<i className="bx bx-move-vertical text-xl" />
							</div>
							<div className="w-9/12 pr-4 mb-4">
								<input
									value={question.question}
									type="text"
									disabled
									className="block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
								/>
							</div>
							<div className="flex items-center w-2/12 mb-4">
								<button
									type="button"
									onClick={() => handleRemoveQuestion(question)}
									className="flex items-center justify-center w-full h-full bg-danger px-2 py-1 text-xs text-white font-semibold uppercase rounded shadow-md cursor-pointer"
								>
									<i className="bx bx-minus-circle text-xl sm:mr-2" />
									<span className="hidden sm:flex">{LANGUAGES[state.lang].surveys.remove}</span>
								</button>
							</div>
						</div>
					</div>
				)}
			</Draggable>
		);
	}

	const QuestionsList = memo(({ questions }) =>
		questions.map((q, i) => <Question question={q} index={i} key={q.id} />)
	);

	useEffect(() => {
		if (!type) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && type === PLANS.SUBSCRIPTION && !subscription) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && (type === PLANS.BASIC || type === PLANS.ADVANCED) && !event) navigate(ROUTES[state.lang].DASHBOARD);
	}, [type]);

	function renderLanguageSelection() {
		return (
			<div className="w-full flex justify-center items-center">
				<select
					value={formSurvey.language || ''}
					onChange={(e) => setLanguage(e.target.value)}
					placeholder={`${LANGUAGES[state.lang].surveys.language} *`}
					className="bg-white px-4 py-2 mr-4 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
				>
					<option value="">{`${LANGUAGES[state.lang].surveys.language} *`}</option>
					{Object.keys(LANGUAGES).map((l) => (
						<option key={l} value={l}>
							{LANGUAGES[state.lang].surveys[l.toLocaleLowerCase()]}
						</option>
					))}
				</select>
			</div>
		);
	}

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

	function renderAnswerForm() {
		return (
			<>
				<div className="w-10/12 pr-4 mb-4">
					<input
						value={formSurvey.answer || ''}
						onChange={(e) => setFormSurvey({ ...formSurvey, answer: e.target.value })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].surveys.answers} *`}
						className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="flex items-center w-2/12 mb-4">
					<button
						type="button"
						onClick={() => handleAddAnswer()}
						className="flex items-center justify-center w-full h-full bg-warning px-2 py-1 text-xs text-white font-semibold uppercase rounded shadow-md cursor-pointer"
					>
						<i className="bx bx-plus-circle text-xl sm:mr-2" />
						<span className="hidden sm:flex">{LANGUAGES[state.lang].surveys.add}</span>
					</button>
				</div>
				{!!formSurvey.answers.length && (
					<DragDropContext onDragEnd={onDragAnswerEnd}>
						<Droppable droppableId="answersList">
							{(provided) => (
								<div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
									<AnswersList answers={formSurvey.answers} />
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				)}
			</>
		);
	}

	function renderQuestionForm() {
		return (
			<>
				<div className="w-full sm:w-3/12 sm:pr-4 mb-4">
					<select
						value={formSurvey.type || ''}
						onChange={(e) => setFormSurvey({ ...formSurvey, type: e.target.value, answer: '', answers: [] })}
						placeholder={`${LANGUAGES[state.lang].surveys.type} *`}
						className="bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{`${LANGUAGES[state.lang].surveys.type} *`}</option>
						{Object.keys(SURVEY).map((t) => (
							<option key={t} value={t}>
								{LANGUAGES[state.lang].surveys[t.toLocaleLowerCase()]}
							</option>
						))}
					</select>
				</div>
				<div className="w-full sm:w-3/12 sm:pr-4 mb-4">
					<select
						value={formSurvey.answerRequired || ''}
						onChange={(e) => setFormSurvey({ ...formSurvey, answerRequired: e.target.value })}
						placeholder={LANGUAGES[state.lang].surveys.answerRequired}
						className="bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{LANGUAGES[state.lang].surveys.answerRequired}</option>
						<option value={LANGUAGES[state.lang].no}>{LANGUAGES[state.lang].no}</option>
						<option value={LANGUAGES[state.lang].yes}>{LANGUAGES[state.lang].yes}</option>
					</select>
				</div>
				<div className="w-full sm:w-6/12 mb-4">
					<input
						value={formSurvey.question || ''}
						onChange={(e) => setFormSurvey({ ...formSurvey, question: e.target.value })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].surveys.question} *`}
						className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				{(formSurvey.type === SURVEY.SINGLE || formSurvey.type === SURVEY.MULTIPLE) && renderAnswerForm()}
				{renderAnswerButtons()}
			</>
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

	function renderQuestionsList() {
		return (
			<div className="flex flex-wrap bg-white p-4 mb-8 rounded-md shadow-md">
				<DragDropContext onDragEnd={onDragQuestionEnd}>
					<Droppable droppableId="questionsList">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
								<QuestionsList questions={survey} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				{renderQuestionButtons()}
			</div>
		);
	}

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title
				text={`${subscription?.name || event?.name}: ${LANGUAGES[state.lang].surveys.title} ${
					language ? ` | ${LANGUAGES[state.lang].surveys[language]}` : ''
				}`}
			/>
			<form className="flex flex-wrap bg-white p-4 mb-4 rounded-md shadow-md">
				<div className="w-full flex flex-wrap">
					{!language && renderLanguageSelection()}
					{language && renderQuestionForm()}
				</div>
			</form>
			{!!survey.length && renderQuestionsList()}
		</>
	);
}
