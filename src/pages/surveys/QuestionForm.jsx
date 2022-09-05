import { useContext } from 'react';
import { AppContext } from '../../context';
import { LANGUAGES, SURVEY } from '../../constants';

export default function QuestionForm({form, setForm}) {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="w-full sm:w-3/12 sm:pr-4 mb-4">
        <select
          value={form.type || ''}
          onChange={(e) => setForm({ ...form, type: e.target.value, answer: '', answers: [] })}
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
          value={form.answerRequired || ''}
          onChange={(e) => setForm({ ...form, answerRequired: e.target.value })}
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
          value={form.question || ''}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          type="text"
          placeholder={`${LANGUAGES[state.lang].surveys.question} *`}
          className=" block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
        />
      </div>
    </>
  );
}