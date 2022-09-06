import { Auth as AmplifyAuth } from 'aws-amplify';
import Logger from '../helpers/logger';
import Mutations from './mutations';
import Queries from './queries';

const SignUp = async (email, password, locale) => {
	await AmplifyAuth.signUp({ username: email, password, attributes: { email, locale } });
	await Mutations.createClient(email);
};

const ReSendSignUp = async (email) => {
	await AmplifyAuth.resendSignUp(email);
};

const ConfirmSignUp = async (email, code) => {
	await AmplifyAuth.confirmSignUp(email, code);
};

const SignIn = async (email, pwd, remember) => {
	const auth = await AmplifyAuth.signIn(email, pwd);
	if (auth.challengeName === 'NEW_PASSWORD_REQUIRED') await AmplifyAuth.completeNewPassword(auth, pwd);
	if (remember) await AmplifyAuth.rememberDevice();
	else await AmplifyAuth.forgetDevice();
	Logger(auth);
	const client = await Queries.clientByEmail(auth.attributes.email);
	if (!client) throw new Error('Client not found');
	return { username: auth.username, clientID: client.id };
};

const ForgotPassword = async (email) => {
	await AmplifyAuth.forgotPassword(email);
};

const ForgotPasswordSubmit = async (email, code, pwd) => {
	await AmplifyAuth.forgotPasswordSubmit(email, code, pwd);
};

const Auth = { SignUp, ReSendSignUp, ConfirmSignUp, SignIn, ForgotPassword, ForgotPasswordSubmit };

export default Auth;
