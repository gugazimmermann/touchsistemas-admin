/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const _ = require('underscore');
const moment = require('moment');
const { faker } = require('@faker-js/faker');
const cidades = require('./cidades.json');
const beerhouse = require('./events.json');

faker.setLocale('pt_BR');

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Visitantes(id) {
	if (id === 'bb0d16cc-1141-4176-b7a1-35f3b7d8bf0c') {
		return ['local', 'local', 'local', 'local', 'local', 'perto', 'perto', 'perto', 'proximos', 'outros'];
	}
	if (id === 'd116468a-6f81-4e54-9fd2-9bf8eb18b24b') {
		return ['local', 'local', 'local', 'perto', 'perto', 'perto', 'proximos', 'proximos', 'proximos', 'outros'];
	}
	return ['local', 'local', 'perto', 'perto', 'perto', 'proximos', 'proximos', 'proximos', 'outros', 'outros'];
}

const gender = ['male', 'male', 'male', 'male', 'female', 'female', 'female', 'female', 'LGBTQIA+', 'LGBTQIA+'];

(async () => {
	for (const event of beerhouse) {
		const visitantesPorCidade = Visitantes(event.id);
		for (const date of event.date) {
			for (let i = 1; i < 10; i += 1) {
				const visitorFrom = _.sample(visitantesPorCidade);
				const cidadesFrom = cidades.find((c) => c.tipo === visitorFrom);
				const cidadeFrom = _.sample(cidadesFrom.cidades);
				const confirmationTime = `${date.day}T${randomNum(10, 23)}:${randomNum(10, 59)}`;
				const fisrtName = faker.name.firstName();
				const lastName = faker.name.lastName();
				const visitor = {
					phone: faker.phone.number(`${cidadeFrom.ddd} 9####-####`),
					code: +faker.random.numeric(6),
					confirmation: confirmationTime,
					codeUsed: `${moment(confirmationTime, 'YYYY-MM-DDTHH:mm')
						.add(randomNum(15, 60), 'minute')
						.format('YYYY-MM-DDTHH:mm')}`,
					name: `${fisrtName} ${lastName}`,
					email: faker.internet.email(fisrtName, lastName).toLocaleLowerCase(),
					gender: _.sample(gender),
					state: cidadeFrom.estado,
					city: cidadeFrom.nome,
					birthdate: moment(date.day, 'YYYY-MM-DD').subtract(randomNum(19, 60), 'years').subtract(randomNum(1, 364), 'days').format('YYYY-MM-DD'),
					authorization: true,
				};
				console.log(visitor);
			}
		}
	}
})();
