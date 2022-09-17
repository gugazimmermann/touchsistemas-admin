import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from '../../api/auth';
import { AlertType } from "../../ts/types";
import { ALERT } from "../../ts/enums";
import { Alert, Flags, Loading, Title } from "../../components";
import { AppContext } from "../../context";
import { LANG, ROUTES } from '../../languages/index';

export default function AuthLayout() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>({});
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const projectName = process.env.REACT_APP_TITLE || "Touch Sistemas";

  const startLoading = () => {
    setLoading(true);
    setAlert({});
  };

  const stopLoading = () => {
    setLoading(false);
    setAlert({});
  };

  const signIn = async (email: string, pwd: string, remember: boolean) => {
    startLoading();
    try {
      await Auth.SignIn(email, pwd, remember);
      stopLoading();
      navigate(ROUTES[state.lang].DASHBOARD);
    } catch (err) {
      stopLoading();
      setAlert({ type: ALERT.ERROR, text: LANG[state.lang].auth.authMsg.unableToLogin });
    }
  };

  const sendForgotPasswordCode = async (email: string) => {
    startLoading();
    try {
      await Auth.ForgotPassword(email);
      stopLoading();
      navigate(ROUTES[state.lang].REDIFINE_PASSWORD, {
        state: { email, alert: { type: ALERT.INFO, text: LANG[state.lang].auth.authMsg.checkEmail } },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableSendCode,
      });
    }
  };

  const redefinePassword = async (email: string, code: string, pwd: string) => {
    startLoading();
    try {
      await Auth.RedefinePassword(email, code, pwd);
      stopLoading();
      navigate(ROUTES[state.lang].HOME, {
        state: {
          email,
          alert: {
            type: ALERT.SUCCESS,
            text: LANG[state.lang].auth.authMsg.passwordSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableRedefinePassword,
      });
    }
  };

  const signUp = async (email: string, pwd: string) => {
    startLoading();
    try {
      await Auth.SignUp(email, pwd, state.lang);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, {
        state: { email, alert: { type: ALERT.INFO, text: LANG[state.lang].auth.authMsg.checkEmail } },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableRegister,
      });
    }
  };

  const resendConfirmationCode = async (email: string) => {
    startLoading();
    try {
      await Auth.ResendConfirmationCode(email);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, {
        state: {
          email,
          alert: { type: ALERT.SUCCESS, text: LANG[state.lang].auth.authMsg.codeResent },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableSendCode,
      });
    }
  };

  const confirmSignUp = async (email: string, code: string) => {
    startLoading();
    try {
      await Auth.ConfirmSignUp(email, code);
      stopLoading();
      navigate(ROUTES[state.lang].HOME, {
        state: {
          email,
          alert: { type: ALERT.SUCCESS, text: LANG[state.lang].auth.authMsg.confirmationSuccess },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableConfirm,
      });
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        await Auth.GetUser();
        setLoading(false);
        navigate(ROUTES[state.lang].DASHBOARD);
      } catch (error) {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate, state.lang]);

  return (
    <main className="h-screen mx-auto">
      {loading && <Loading />}
      <section className="container h-full fixed">
        <div className="relative h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
          <div className="absolute top-2 right-2">
            <Flags />
          </div>
          <div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0 flex justify-center items-center">
            <img src={image} alt="auth" className="h-auto w-auto" />
          </div>
          <div className="w-10/12 md:w-5/12 lg:w-4/12">
            <div className="flex flex-col gap-2">
              <img
                src="./android-chrome-192x192.png"
                alt="auth"
                className="h-28 object-contain"
              />
              <Title
                text={projectName}
                className="text-2xl font-bold text-center mb-4 text-primary"
              />
            </div>
            <Title text={title} className="text-xl text-center mb-4" />
            <Alert type={alert?.type} text={alert?.text} />
            <Outlet
              context={{
                setAlert,
                setImage,
                setTitle,
                signIn,
                sendForgotPasswordCode,
                redefinePassword,
                signUp,
                resendConfirmationCode,
                confirmSignUp,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
