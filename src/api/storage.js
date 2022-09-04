import { Storage } from 'aws-amplify';

export const sendPublicFile = async (type, id, file, progress) => {
	progress(0);
	await Storage.put(`${type}/${id}.${file.name.split('.').pop()}`, file, {
		contentType: file.type,
		progressCallback(p) {
			progress(parseInt((p.loaded / p.total) * 100, 10));
		},
	});
	progress(0);
}

export const createMap = async (type, id, name, street, number, city, state, zipCode) => {
	const color = type === 'subscription' ? '0xa855f7' : type === 'event' ? '0x10b981' : '0xf59e0b';
	const address = encodeURIComponent(`${street}, ${number} - ${city} - ${state}, ${zipCode}`);
	const marker = `markers=color:${color}%7Clabel:${name}%7C${address}`;
	const url = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=17&size=1280x1280&scale=2&${marker}&key=${process.env.REACT_APP_API_KEY}`;
	const res = await fetch(url);
	const blob = await res.blob();
	const file = new File([blob], `${id}.png`);
	return file;
}

export const getImage = async (img) => {
	const [data] = await Storage.list(img);
	return data?.key || null;
}
