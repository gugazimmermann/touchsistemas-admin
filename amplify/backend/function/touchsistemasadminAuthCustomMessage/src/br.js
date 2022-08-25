async function signUpMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Código de Verificação`,
		emailMessage: generateEmailBody(`
      <p>Bem Vindo ao ${process.env.TITLE},</p>
      <p>Seu email de cadastrado é ${event.request.userAttributes.email} e seu código de verificação é: ${event.request.codeParameter}</p>
      <br />
      <p>Digite seu código no campo informado ou <a href="${process.env.ADMIN_URL}confirmar-cadastro?email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">clique aqui</a>.</p>
      `),
	};
	return event;
}

async function forgotPassword(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Recuperar Senha`,
		emailMessage: generateEmailBody(`
      <p>Seu código de recuperação de senha é: ${event.request.codeParameter}</p>
      <br />
      <p>Digite seu código no campo informado ou clique aqui: <a>${process.env.ADMIN_URL}redefinir-senha</a></p>
      `),
	};
	return event;
}

async function updateUserAttributeMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Email Atualizado`,
		emailMessage: generateEmailBody(
			`<p>Seu email foi atualizado com sucesso para: ${event.request.userAttributes.email}</p>`
		),
	};
	return event;
}

async function verifyUserAttribute(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Atualizar Email`,
		emailMessage: generateEmailBody(
			`<p>Para atualizar o email, utilize o código: ${event.request.codeParameter}</p>`
		),
	};
	return event;
}

module.exports = {
	signUpMessage,
	forgotPassword,
	updateUserAttributeMessage,
	verifyUserAttribute,
};
