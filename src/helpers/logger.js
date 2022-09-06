const Logger = (label, content) => {
	if (process.env.NODE_ENV === 'development') console.debug(`${label}`, content);
}

export default Logger;
