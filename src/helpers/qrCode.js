import QRCode from 'qrcode';
import { PLANS } from '../constants';

const subscriptionsURL = process.env.REACT_APP_SUBSCRIPTIONS_URL || '';
const eventsURL = process.env.REACT_APP_EVENTS_URL || '';

export default async function generateQRCode(type, id) {
	const URL = type === PLANS.SUBSCRIPTION ? subscriptionsURL : eventsURL;
	try {
		const qr = await QRCode.toDataURL(`${URL}${id}`, { width: 3840 });
		return qr;
	} catch (err) {
		console.error(err);
		return null;
	}
}
