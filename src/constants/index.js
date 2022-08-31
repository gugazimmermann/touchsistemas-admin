import { brLang, enLang, esLang } from './languages';
import { brRoute, enRoute, esRoute } from './routes';

export const PLANS = {
	BASIC: 'BASIC',
	ADVANCED: 'ADVANCED',
	SUBSCRIPTION: 'SUBSCRIPTION',
};

export const FREQUENCY = {
	SINGLE: 'SINGLE',
	MONTHLY: 'MONTHLY',
};

export const SURVEY = {
	SINGLE: 'SINGLE',
	MULTIPLE: 'MULTIPLE',
	TEXT: 'TEXT',
	MULTILINE: 'MULTILINE',
};

export const METHOD = {
	SMS: 'SMS',
	EMAIL: 'EMAIL',
	NONE: 'NONE',
};

export const LANGUAGES = {
	br: brLang,
	en: enLang,
	es: esLang,
};

export const ROUTES = {
	br: brRoute,
	en: enRoute,
	es: esRoute,
};
