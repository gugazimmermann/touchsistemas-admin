import { GenericObject } from '../ts/types';

const Logger = (label: string, content: string | GenericObject | null): void => {
	if (process.env.NODE_ENV === 'development') console.debug(`${label}`, content);
}

export default Logger;
