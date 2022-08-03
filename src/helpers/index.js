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

export function normalizeCEP(cep) {
	if (!cep) return cep;
	const currentValue = cep.replace(/[^\d]/g, '');
	const cvLength = currentValue.length;
	if (cvLength < 3) return currentValue;
	if (cvLength < 7) return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
	return `${currentValue.slice(0, 2)}.${currentValue.slice(2, 5)}-${currentValue.slice(5, 8)}`;
}

export async function getAddressFromCEP(zipCode) {
	let cleanCep = '';
	if (zipCode.length > 1) cleanCep = zipCode.replace(/\D/g, '');
	if (cleanCep.length === 8) {
		const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
		const data = await response.json();
		if (!data?.erro) {
			return {
				state: data.uf,
				street: data.logradouro,
				city: data.localidade,
			};
		}
		throw new Error(`CEP não encontrado.`);
	}
	return null;
}

export function normalizePhone(phone) {
	if (!phone) return phone;
	const currentValue = phone.replace(/[^\d]/g, '');
	const cvLength = currentValue.length;
	if (cvLength < 3) return currentValue;
	if (cvLength < 7) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
	return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 7)}-${currentValue.slice(7, 11)}`;
}
