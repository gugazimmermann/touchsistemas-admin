export function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
export function Capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CapitalizePhrase(phrase) {
	const arr = phrase.split(' ');
	for (let i = 0; i < arr.length; i += 1) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	return arr.join(' ');
}
