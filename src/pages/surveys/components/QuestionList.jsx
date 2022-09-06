/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, memo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../../../context';
import { LANGUAGES } from '../../../constants';

export default function QuestionList({ survey, setForm }) {
	const { state } = useContext(AppContext);

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
		setForm(questions);
	}

	function handleRemoveQuestion(question) {
		setForm(survey.filter((q) => q.id !== question.id));
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
		</div>
	);
}
