/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const _ = require('underscore');
const moment = require('moment');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const cidades = require('./cidades.json');
const beerhouse = require('./events.json');
const survey = require('./survey.json');

faker.setLocale('pt_BR');

function Visitantes(id) {
	if (id === 'bb0d16cc-1141-4176-b7a1-35f3b7d8bf0c') {
		return ['local', 'local', 'local', 'local', 'local', 'perto', 'perto', 'perto', 'proximos', 'outros'];
	}
	if (id === 'd116468a-6f81-4e54-9fd2-9bf8eb18b24b') {
		return ['local', 'local', 'local', 'perto', 'perto', 'perto', 'proximos', 'proximos', 'proximos', 'outros'];
	}
	return ['local', 'local', 'perto', 'perto', 'perto', 'proximos', 'proximos', 'proximos', 'outros', 'outros'];
}

const genders = ['male', 'male', 'male', 'male', 'female', 'female', 'female', 'female', 'LGBTQIA+', 'LGBTQIA+'];

(async () => {
	const visitors = [];
	for (const event of beerhouse) {
		const visitantesPorCidade = Visitantes(event.id);
		for (const date of event.date) {
			for (let i = 1; i <= date.visitors; i += 1) {
				let visitor;
				const uuid = uuidv4();
				const visitorFrom = _.sample(visitantesPorCidade);
				const cidadesFrom = cidades.find((c) => c.tipo === visitorFrom);
				const cidadeFrom = _.sample(cidadesFrom.cidades);
				const fisrtName = faker.name.firstName();
				const lastName = faker.name.lastName();
				const phone = faker.phone.number(`${cidadeFrom.ddd} 9####-####`);
				const code = +faker.random.numeric(6);

				visitor = {
					id: uuid,
					eventID: event.id,
					eventDay: date.day,
					phone,
					code,
				};

				if (_.random(1, 100) <= 20) {
					// chance <= 20 to not confirm
					visitor = {
						...visitor,
						confirmation: null,
						codeUsed: null,
						authorization: false,
					};
				} else {
					// confirmed code
					const confirmation = `${date.day}T${_.random(10, 23)}:${_.random(10, 59)}`;
					let codeUsed = `${moment(confirmation, 'YYYY-MM-DDTHH:mm')
						.add(_.random(15, 60), 'minute')
						.format('YYYY-MM-DDTHH:mm')}`;
					// chance <= 10 to not get the gift
					if (_.random(1, 100) <= 10) codeUsed = null;
					visitor = {
						...visitor,
						confirmation,
						codeUsed,
						authorization: true,
					};

					if (_.random(1, 100) >= 25) {
						// chance >= 25 to respond the survey
						const userSurvey = [];
						for (const s of survey) {
							const answer = [...new Set(_.sample(s.answers, _.random(1, s.type === 'single' ? 1 : s.answers.length)))];
							userSurvey.push({
								question: s.question,
								answer,
							});
						}
						visitor = {
							...visitor,
							survey: userSurvey,
						};

						// chance >= 15 to respond the personal info
						if (_.random(1, 100) >= 15) {
							const name = `${fisrtName} ${lastName}`;
							const email = faker.internet.email(slugify(fisrtName), slugify(lastName)).toLocaleLowerCase();
							const gender = _.sample(genders);
							const state = cidadeFrom.estado;
							const city = cidadeFrom.nome;
							const birthdate = moment(date.day, 'YYYY-MM-DD')
								.subtract(_.random(19, 60), 'years')
								.subtract(_.random(1, 364), 'days')
								.format('YYYY-MM-DD');

							visitor = {
								...visitor,
								personal: { name, email, gender, state, city, birthdate },
							};
						}
					}
				}
				visitors.push(visitor);
			}
		}
	}
	console.log(JSON.stringify(visitors, undefined, 2));
})();
