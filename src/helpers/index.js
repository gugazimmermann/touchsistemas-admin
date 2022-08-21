import moment from 'moment';

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

export function normalizePhoneToShow(phone) {
	if (!phone) return phone;
	const currentValue = phone.replace(/[^\d]/g, '').slice(2);

	const cvLength = currentValue.length;
	if (cvLength < 3) return currentValue;
	if (cvLength < 7) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
	return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 7)}-${currentValue.slice(7, 11)}`;
}

function normalizeCPF(value) {
	const cvLength = value.length;
	if (cvLength < 3) return value;
	if (cvLength < 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
	if (cvLength < 9) return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
	return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
}

function normalizeCNPJ(value) {
	const cvLength = value.length;
	if (cvLength < 3) return value;
	if (cvLength < 5) return `${value.slice(0, 2)}.${value.slice(2)}`;
	if (cvLength < 8) return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
	if (cvLength < 12) return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}`;
	return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
}

export function normalizeDocument(type, document) {
	if (!type || !document) return document;
	const currentValue = document.replace(/[^\d]/g, '');
	const doc = type === 'CPF' ? normalizeCPF(currentValue) : normalizeCNPJ(currentValue);
	return doc;
}

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

// TODO: handle better the plans
export function translatePlan(plan) {
	return plan === 'BASIC' ? 'Básico' : plan === 'ADVANCED' ? 'Avançado' : 'Assinatura';
}

export function translatePlanUrl(plan) {
	return plan === 'BASIC' ? 'basico' : plan === 'ADVANCED' ? 'avancado' : 'assinatura';
}
