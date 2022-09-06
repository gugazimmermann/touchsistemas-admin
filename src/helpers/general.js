import moment from 'moment';

// eslint-disable-next-line no-promise-executor-return
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const showLink = (state) => !state.alerts.filter((a) => a.type === 'register' || a.type === 'owner').length;

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizePhrase = (phrase) => {
	const arr = phrase.split(' ');
	for (let i = 0; i < arr.length; i += 1) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	return arr.join(' ');
};

export function orderEventsByLastDay(events, sort = 'DESC') {
	const eventsWithLastDay = events.map((i) => ({
		...i,
		lastDay: i.dates.sort((a, b) => moment(b) - moment(a))[0],
	}));
	const orderEvents =
		sort === 'ASC'
			? eventsWithLastDay.sort((a, b) => moment(a.lastDay) - moment(b.lastDay))
			: eventsWithLastDay.sort((a, b) => moment(b.lastDay) - moment(a.lastDay));
	return orderEvents;
}
