import { brLang, enLang, esLang } from './languages';
import { brRoute, enRoute, esRoute } from './routes';
import { LANGUAGES } from '../ts/enums';

export const LANG = {
	[LANGUAGES.BR]: brLang,
	[LANGUAGES.EN]: enLang,
	[LANGUAGES.ES]: esLang,
};

export const ROUTES = {
	[LANGUAGES.BR]: brRoute,
	[LANGUAGES.EN]: enRoute,
	[LANGUAGES.ES]: esRoute,
};
