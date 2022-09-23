import { PlansTypes } from '../API';
import { CreateMapType } from "../ts/types";

export async function createMap({type, id, name, street, number, city, state, zipCode}: CreateMapType): Promise<File> {
	const color = type === PlansTypes.SUBSCRIPTION ? '0xa855f7' : (type === PlansTypes.BASIC || type === PlansTypes.ADVANCED) ? '0x10b981' : '0xf59e0b';
	const address = encodeURIComponent(`${street}, ${number} - ${city} - ${state}, ${zipCode}`);
	const marker = `markers=color:${color}%7Clabel:${name}%7C${address}`;
	const url = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=17&size=1280x1280&scale=2&${marker}&key=${process.env.REACT_APP_API_KEY}`;
	const res = await fetch(url);
	const blob = await res.blob();
	const file = new File([blob], `${id}.png`);
	return file;
}
