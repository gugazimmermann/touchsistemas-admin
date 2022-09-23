async function signUpMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Código de Verificación`,
		emailMessage: generateEmailBody(`
      <p>Bienvenido a ${process.env.TITLE},</p>
      <p>Tu email registrado es ${event.request.userAttributes.email} y tu código de verificación es: ${event.request.codeParameter}</p>
      <br />
      <p>Introduzca su código en el campo proporcionado o <a href="${process.env.ADMIN_URL}confirmar-registro?lang=${event.request.userAttributes.locale.toLocaleLowerCase()}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">clic aquí</a>.</p>
      `),
	};
	return event;
}

async function forgotPassword(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Recuperar Contraseña`,
		emailMessage: generateEmailBody(`
      <p>Su código de recuperación de contraseña es: ${event.request.codeParameter}</p>
      <br />
      <p>Introduzca su código en el campo proporcionado o <a href="${process.env.ADMIN_URL}redefinir-contrasena?lang=${event.request.userAttributes.locale.toLocaleLowerCase()}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">clic aquí</a>.</p>
      `),
	};
	return event;
}

async function updateUserAttributeMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Email actualizado`,
		emailMessage: generateEmailBody(
			`<p>Su email ha sido actualizado con éxito a: ${event.request.userAttributes.email}</p>`
		),
	};
	return event;
}

async function verifyUserAttribute(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Actualizar Email`,
		emailMessage: generateEmailBody(`<p>Para actualizar tu Email usa el código: ${event.request.codeParameter}</p>`),
	};
	return event;
}

module.exports = {
	signUpMessage,
	forgotPassword,
	updateUserAttributeMessage,
	verifyUserAttribute,
};
