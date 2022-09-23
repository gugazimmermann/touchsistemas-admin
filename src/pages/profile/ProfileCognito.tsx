import { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import Auth from "../../api/auth";
import { Alert, Button, Form, Input, Title } from "../../components";
import { AppContext } from "../../context";
import { validateEmail } from "../../helpers";
import { LANG } from "../../languages";
import { ALERT } from "../../ts/enums";
import { AlertType, useOutletContextProfileProps } from "../../ts/types";

export default function Profile() {
  const { state } = useContext(AppContext);
  const { loadClient, setLoading } =
    useOutletContext<useOutletContextProfileProps>();
  const [alert, setAlert] = useState<AlertType>({
    type: undefined,
    text: undefined,
  });
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

  const handleChangeEmail = async () => {
    loading();
    try {
      await Auth.ChangeEmail(email);
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
      setAlert({ type: ALERT.SUCCESS, text: "Email changed successfully!" });
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    loading();
    try {
      await Auth.ChangePassword(currentPassword, newPassword);
      setAlert({ type: ALERT.SUCCESS, text: "Password changed successfully!" });
    } catch (error: any) {
      setAlert({ type: ALERT.ERROR, text: error.message });
    }
    setLoading(false);
  };

  const disabledEmail = () =>
    !email || email === state.client?.user?.email || !validateEmail(email);

  const disabledCode = () => !code || code.length > 6;

  const disabledPassword = () =>
    !currentPassword ||
    newPassword !== repeatPassword ||
    newPassword.length < 8;

  const renderEmail = () => (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        handler={(e) => setEmail(e.target.value)}
      />
      <Button
        text="Change Email"
        disabled={disabledEmail()}
        handler={() => handleChangeEmail()}
      />
    </>
  );

  const renderCode = () => (
    <>
      <Title
        text={`Please, check your email and send the code.`}
        className="text-amber-500 text-sm"
      />
      <Input
        type="text"
        placeholder="Code"
        value={code}
        handler={(e) => setCode(e.target.value)}
      />
      <Button
        text="Send Code"
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
          placeholder="Current Password"
          value={currentPassword}
          handler={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          handler={(e) => setNewPassword(e.target.value)}
          showTooltip
        />
        <Input
          type="password"
          placeholder="Repeat New Password"
          value={repeatPassword}
          handler={(e) => setRepeatPassword(e.target.value)}
        />
        <Button
          text="Change Password"
          disabled={disabledPassword()}
          handler={() => handlePassword()}
        />
      </div>
    </Form>
  );

  return (
    <section>
      <Title text={LANG[state.lang].profile.title} back="/home" />
      <Alert type={alert?.type} text={alert?.text} />
      <div className="flex flex-row gap-8 justify-around items-start">
        {renderChangeEmail()}
        {renderChangePassword()}
      </div>
    </section>
  );
}
