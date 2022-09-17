async function signUpMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Verification Code`,
		emailMessage: generateEmailBody(`
      <p>Welcome to ${process.env.TITLE},</p>
      <p>Your registered email is ${event.request.userAttributes.email} and your verification code is: ${event.request.codeParameter}</p>
      <br />
      <p>Enter your code in the field provided or <a href="${process.env.ADMIN_URL}confirm-registration?lang=${event.request.userAttributes.locale.toLocaleLowerCase()}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">click here</a>.</p>
      `),
	};
	return event;
}

async function forgotPassword(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Recover Password`,
		emailMessage: generateEmailBody(`
      <p>Your password recovery code is: ${event.request.codeParameter}</p>
      <br />
      <p>Enter your code in the field provided or <a href="${process.env.ADMIN_URL}reset-password?lang=${event.request.userAttributes.locale.toLocaleLowerCase()}&email=${event.request.userAttributes.email}&code=${event.request.codeParameter}">click here</a>.</p>
      `),
	};
	return event;
}

async function updateUserAttributeMessage(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Email Updated`,
		emailMessage: generateEmailBody(
			`<p>Your email has been successfully updated to: ${event.request.userAttributes.email}</p>`
		),
	};
	return event;
}

async function verifyUserAttribute(event, generateEmailBody) {
	event.response = {
		emailSubject: `${process.env.TITLE}: Update Email`,
		emailMessage: generateEmailBody(`<p>To update your email use the code: ${event.request.codeParameter}</p>`),
	};
	return event;
}

module.exports = {
	signUpMessage,
	forgotPassword,
	updateUserAttributeMessage,
	verifyUserAttribute,
};
