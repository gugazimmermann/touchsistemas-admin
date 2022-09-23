import { useContext, useState, useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import Auth from "../../api/auth";
import { Loading, Flags, Title, Alert } from "../../components";
import { AppContext } from "../../context";
import { COOKIES, Logger } from "../../helpers";
import { ROUTES, LANG } from "../../languages";
import { ALERT } from "../../ts/enums";
import { AlertType } from "../../ts/types";
import LogoIcon from "../../images/LogoIcon";
import Mutations from "../../api/mutations";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [cookies, setCookie] = useCookies([COOKIES.NAME]);
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

  const setClientCookie = (email: string, sub: string) => {
    const encodedContent = COOKIES.Encode(JSON.stringify({ email, sub }));
    const date = new Date();
    date.setDate(date.getDate() + 365);
    setCookie(COOKIES.NAME, encodedContent, { expires: date, path: "/" });
  };

  const signIn = async (email: string, pwd: string, remember: boolean) => {
    startLoading();
    try {
      const attributes = await Auth.SignIn(email, pwd, remember);
      setClientCookie(attributes.email, attributes.sub);
      stopLoading();
      navigate(ROUTES[state.lang].DASHBOARD);
    } catch (err) {
      stopLoading();
      setAlert({
        type: ALERT.ERROR,
        text: LANG[state.lang].auth.authMsg.unableToLogin,
      });
    }
  };

  const sendForgotPasswordCode = async (email: string) => {
    startLoading();
    try {
      await Auth.ForgotPassword(email);
      stopLoading();
      navigate(ROUTES[state.lang].REDIFINE_PASSWORD, {
        state: {
          email,
          alert: {
            type: ALERT.INFO,
            text: LANG[state.lang].auth.authMsg.checkEmail,
          },
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
      await Mutations.createClient(email);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_REGISTRATION, {
        state: {
          email,
          alert: {
            type: ALERT.INFO,
            text: LANG[state.lang].auth.authMsg.checkEmail,
          },
        },
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
          alert: {
            type: ALERT.SUCCESS,
            text: LANG[state.lang].auth.authMsg.codeResent,
          },
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
          alert: {
            type: ALERT.SUCCESS,
            text: LANG[state.lang].auth.authMsg.confirmationSuccess,
          },
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

  const loadUser = useCallback(async () => {
    Logger("AuthLayout", 'loadUser');
    setLoading(true);
    const getCookie = COOKIES.Decode(cookies[COOKIES.NAME]);
    Logger("AuthLayout getCookie", getCookie);
    if (getCookie?.email) {
      try {
        const getUser = await Auth.GetUser();
        Logger("AuthLayout getUser", getUser);
        if (getUser.sub === getCookie.sub) navigate(ROUTES[state.lang].DASHBOARD);
        setLoading(false);
      } catch (error: any) {
        Logger("AuthLayout error", error.message);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [cookies, navigate, state.lang]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <main className="h-screen mx-auto">
      {loading && <Loading />}
      <section className="container h-full fixed">
        <div className="relative h-full flex flex-col-reverse md:flex-row items-center justify-evenly">
          <div className="absolute top-2 right-2">
            <Flags />
          </div>
          <div className="w-10/12 md:w-6/12 lg:w-4/12 md:mb-0 flex justify-center items-center">
            <img
              src={image}
              alt="auth"
              className="h-96 w-96 md:h-auto md:w-auto"
            />
          </div>
          <div className="w-10/12 md:w-5/12 lg:w-4/12">
            <div className="hidden md:flex flex-col justify-center items-center text-primary gap-2">
              <LogoIcon styles="h-28 w-28" />
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
