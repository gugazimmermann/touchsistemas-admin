import { updateClientContentMap } from '../api/mutations';
import { sendPublicFile } from '../api/storage';
import { PLANS } from '../constants';

const encode = (e) => encodeURIComponent(`${e.street}, ${e.number} - ${e.city} - ${e.state}, ${e.zipCode}`);
const googleURL = 'https://maps.googleapis.com/maps/api/staticmap?center';
const size = '1280x1280';

// TODO: handle better to change when a content changes address
export async function createContentMap(type, client, content) {
	const color = type === PLANS.SUBSCRIPTION ? '0xa855f7' : '0x10b981';
	const path = type === PLANS.SUBSCRIPTION ? 'subscriptions_' : 'events_';
	const mapName = `${path}${client.id}.png`;
	const clientMarker = `markers=color:0xf59e0b%7Clabel:${client.name[0]}%7C${encode(client)}`;
	const markers = [];
	if (content.length)
		content.forEach((c) => markers.push(`&markers=color:${color}%7Clabel:${c.name[0]}%7C${encode(c)}`));
	const contentMarkers = markers.join('');
	const mapURL = `${googleURL}=${encode(client)}&zoom=${11}&size=${size}&scale=2&${clientMarker}${contentMarkers}&key=${
		process.env.REACT_APP_API_KEY
	}`;
	const res = await fetch(mapURL);
	const blob = await res.blob();
	const file = new File([blob], mapName);
	await sendPublicFile('map', mapName, file);
	await updateClientContentMap(client.id, type, content.length);
}

export async function createMap(type, id, name, street, number, city, state, zipCode) {
	const color = type === 'subscription' ? '0xa855f7' : type === 'event' ? '0x10b981' : '0xf59e0b';
	const address = encodeURIComponent(`${street}, ${number} - ${city} - ${state}, ${zipCode}`);
	const marker = `markers=color:${color}%7Clabel:${name}%7C${address}`;
	const url = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=17&size=1280x1280&scale=2&${marker}&key=${process.env.REACT_APP_API_KEY}`;
	const res = await fetch(url);
	const blob = await res.blob();
	const file = new File([blob], `${id}.png`);
	return file;
}
