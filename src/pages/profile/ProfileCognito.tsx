import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate } from 'react-router-dom';
import Auth from "../../api/auth";
import Mutations from "../../api/mutations";
import { Alert, Button, Form, Input, Select, Title } from "../../components";
import { AppContext } from "../../context";
import { validateEmail } from "../../helpers";
import { LANG } from "../../languages";
import { ALERT, CONTEXT, LANGUAGES } from "../../ts/enums";
import { AlertType, useOutletContextProfileProps } from "../../ts/types";
import { ROUTES } from '../../languages/index';

export default function Profile() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { loadClient, setLoading } =
    useOutletContext<useOutletContextProfileProps>();
  const [alert, setAlert] = useState<AlertType>({
    type: undefined,
    text: undefined,
  });
  const [language, setLanguage] = useState<LANGUAGES>(state.lang);
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    setEmail(state.client?.user?.email || "");
  }, [state.client?.user?.email]);

  const loading = () => {
    setAlert({});
    setLoading(true);
  };

  const handleChangeLanguage = async () => {
    loading();
    try {
      await Auth.ChangeLanguage(language);
      loadClient(true);
      dispatch({
        type: CONTEXT.UPDATE_LANGUAGE,
        payload: language as LANGUAGES,
      });
      navigate(ROUTES[language].PROFILEADVANCED)
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  }

  const handleChangeEmail = async () => {
    loading();
    try {
      await Auth.ChangeEmail(email);
      await Mutations.updateClientEmail(state.client.id, email);
      setShowCode(true);
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    loading();
    try {
      await Auth.ConfirmChangeEmail(code);
      loadClient(true);
      setShowCode(false);
      setAlert({ type: ALERT.SUCCESS, text: LANG[state.lang].profile.advanced.changeEmailSuccess });
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    loading();
    try {
      await Auth.ChangePassword(currentPassword, newPassword);
      setAlert({ type: ALERT.SUCCESS, text: LANG[state.lang].profile.advanced.changePasswordSuccess });
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  };

  const disabledLanguage = () => !language || language === state.lang;

  const disabledEmail = () =>
    !email || email === state.client?.user?.email || !validateEmail(email);

  const disabledCode = () => !code || code.length > 6;

  const disabledPassword = () =>
    !currentPassword ||
    newPassword !== repeatPassword ||
    newPassword.length < 8;

  const renderChangeLanguage = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Select
          placeholder={LANG[state.lang].profile.advanced.language}
          value={language}
          handler={(e) => setLanguage(e.target.value as LANGUAGES)}
        >
          <>
            {Object.values(LANGUAGES).map((l) => (
              <option key={l} value={l}>
                {LANG[state.lang].languages[l]}
              </option>
            ))}
          </>
        </Select>
        <Button
          text={LANG[state.lang].profile.advanced.language}
          disabled={disabledLanguage()}
          handler={() => handleChangeLanguage()}
          full
        />
      </div>
    </Form>
  );

  const renderEmail = () => (
    <>
      <Input
        type="email"
        placeholder={LANG[state.lang].email}
        value={email}
        handler={(e) => setEmail(e.target.value)}
      />
      <Button
        text={LANG[state.lang].profile.advanced.changeEmail}
        disabled={disabledEmail()}
        handler={() => handleChangeEmail()}
      />
    </>
  );

  const renderCode = () => (
    <>
      <Title
        text={LANG[state.lang].profile.advanced.changeEmailCode}
        className="text-amber-500 text-sm"
      />
      <Input
        type="text"
        placeholder={LANG[state.lang].code}
        value={code}
        handler={(e) => setCode(e.target.value)}
      />
      <Button
        text={LANG[state.lang].profile.advanced.sendCode}
        disabled={disabledCode()}
        handler={() => handleVerifyCode()}
      />
    </>
  );

  const renderChangeEmail = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        {!showCode ? renderEmail() : renderCode()}
      </div>
    </Form>
  );

  const renderChangePassword = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Input
          type="password"
          placeholder={LANG[state.lang].profile.advanced.currentPassword}
          value={currentPassword}
          handler={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder={LANG[state.lang].profile.advanced.newPassword}
          value={newPassword}
          handler={(e) => setNewPassword(e.target.value)}
          showTooltip
        />
        <Input
          type="password"
          placeholder={LANG[state.lang].profile.advanced.repeatNewPassword}
          value={repeatPassword}
          handler={(e) => setRepeatPassword(e.target.value)}
        />
        <Button
          text={LANG[state.lang].profile.advanced.changePassword}
          disabled={disabledPassword()}
          handler={() => handlePassword()}
        />
      </div>
    </Form>
  );

  return (
    <section>
      <Title text={LANG[state.lang].profile.advanced.title} back={ROUTES[state.lang].PROFILE} />
      <Alert type={alert?.type} text={alert?.text} />
      <div className="flex flex-col sm:flex-row sm:gap-4 sm:justify-around sm:items-start">
        {renderChangeLanguage()}
        {renderChangeEmail()}
        {renderChangePassword()}
      </div>
    </section>
  );
}
