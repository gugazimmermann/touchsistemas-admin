/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context';
import { Alert } from '../../components';
import { LANGUAGES, ROUTES } from '../../constants';

export default function Alerts() {
	const { state, dispatch } = useContext(AppContext);

	const profileLink = () => (
		<Link className="pl-2" to={ROUTES[state.lang].PROFILE}>{` ${LANGUAGES[state.lang].alerts.clickHere}`}</Link>
	);

	function handleAlertType(type) {
		switch (type) {
			case 'register':
				return 'danger';
			case 'owner':
				return 'warning';
			default:
				return 'info';
		}
	}

	function handleAlertLink(type) {
		switch (type) {
			case 'register':
				return profileLink();
			case 'owner':
				return profileLink();
			default:
				return null;
		}
	}

	function handleAlertMessage(type) {
		switch (type) {
			case 'register':
				return LANGUAGES[state.lang].alerts.register;
			case 'owner':
				return LANGUAGES[state.lang].alerts.owner;
			default:
				return null;
		}
	}

	function handleClose(index) {
		const cloneAlerts = state.alerts.map((a, i) => (i !== index ? a : null)).filter((a) => a);
		dispatch({ type: 'UPDATE_ALERT', payload: cloneAlerts });
	}

	return (
		state.alerts &&
		state.alerts.length > 0 &&
		state.alerts.map((a, i) => (
			<Alert
				key={i}
				index={i}
				type={handleAlertType(a.type)}
				close={a.type !== 'register' && a.type !== 'owner' ? handleClose : null}
			>
				{handleAlertMessage(a.type)}
				{handleAlertLink(a.type)}
			</Alert>
		))
	);
}
