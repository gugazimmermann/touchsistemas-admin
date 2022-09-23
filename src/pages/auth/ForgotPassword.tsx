import { useContext, useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Input, Button, Link } from "../../components";
import { AppContext } from "../../context";
import { validateEmail } from "../../helpers";
import Image from "../../images/auth/ForgorPassword.svg";
import { LANG, ROUTES } from "../../languages";
import { LocationType, AlertType, useOutletContextProps } from "../../ts/types";

export default function ForgorPassword() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const {
    setAlert,
    setImage,
    setTitle,
    sendForgotPasswordCode,
  }: useOutletContextProps = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(
    () => setTitle(LANG[state.lang].auth.forgotPassword),
    [setTitle, state.lang]
  );

  const disabled = () => email === "" || !validateEmail(email);

  return (
    <form>
      <div className="mb-4">
        <Input
          type="email"
          placeholder={LANG[state.lang].email}
          value={email}
          handler={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Button
          text={LANG[state.lang].auth.sendCode}
          disabled={disabled()}
          handler={() => sendForgotPasswordCode(email)}
          full
        />
      </div>
      <div className="w-full text-center mt-4">
        <Link
          to={ROUTES[state.lang].HOME}
          text={LANG[state.lang].auth.backToSignIn}
          className="text-xl font-bold"
        />
      </div>
    </form>
  );
}
