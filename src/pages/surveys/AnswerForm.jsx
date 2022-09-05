/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';

export default function AnswerForm({form, setForm}) {
  const { state } = useContext(AppContext);

  function handleAddAnswer() {
		setForm({
			...form,
			answers: [...form.answers, { id: uuidv4(), answer: form.answer }],
			answer: '',
		});
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
		const answers = reorderAnswers(form.answers, r.source.index, r.destination.index);
		setForm({ ...form, answers });
	}

  function handleRemoveAnswer(answer) {
		setForm({ ...form, answers: form.answers.filter((a) => a.id !== answer.id) });
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

  return (
    <>
      <div className="w-10/12 pr-4 mb-4">
        <input
          value={form.answer || ''}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
      {!!form.answers.length && (
        <DragDropContext onDragEnd={onDragAnswerEnd}>
          <Droppable droppableId="answersList">
            {(provided) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
                <AnswersList answers={form.answers} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}