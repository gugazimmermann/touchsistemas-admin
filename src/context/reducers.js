function saveState(state) {
	localStorage.setItem('state', JSON.stringify(state));
}

function updateLang(state, payload) {
	const newState = { ...state, lang: payload };
	saveState(newState);
	return newState;
}

function updatePlans(state, payload) {
	const newState = { ...state, plans: payload };
	saveState(newState);
	return newState;
}

function updateClient(state, payload) {
	const newState = { ...state, client: payload };
	saveState(newState);
	return newState;
}

function updateAlert(state, payload) {
	const newState = { ...state, alerts: payload };
	saveState(newState);
	return newState;
}

export default function AppReducer(state, { type, payload }) {
	switch (type) {
		case 'UPDATE_LANG':
			return updateLang(state, payload);
		case 'UPDATE_PLANS':
			return updatePlans(state, payload);
		case 'UPDATE_CLIENT':
			return updateClient(state, payload);
		case 'UPDATE_ALERT':
			return updateAlert(state, payload);
		default:
			throw new Error('TYPE NOT FOUND');
	}
}
