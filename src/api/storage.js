import { Storage } from 'aws-amplify';

export const sendPublicFile = async (type, id, file, progress) => {
	if (progress) progress(0);
	await Storage.put(`${type}/${id}.${file.name.split('.').pop()}`, file, {
		contentType: file.type,
		progressCallback(p) {
			if (progress) progress(parseInt((p.loaded / p.total) * 100, 10));
		},
	});
	if (progress) progress(0);
}

export const getImage = async (img) => {
	const [data] = await Storage.list(img);
	return data?.key || null;
}
