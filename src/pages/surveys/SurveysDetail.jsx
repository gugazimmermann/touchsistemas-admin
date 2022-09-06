/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { Loading, Alert, Title, Form } from '../../components';
import { LANGUAGES, PLANS, ROUTES } from '../../constants';

const initial = {
	type: '',
	answerRequired: '',
	question: '',
	answer: '',
	answers: [],
};

export default function SurveysDetail() {
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

	useEffect(() => {
		if (!type) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && type === PLANS.SUBSCRIPTION && !subscription) navigate(ROUTES[state.lang].DASHBOARD);
		if (type && (type === PLANS.BASIC || type === PLANS.ADVANCED) && !event) navigate(ROUTES[state.lang].DASHBOARD);
	}, [type]);

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
			</div>
		</>
	);
}
