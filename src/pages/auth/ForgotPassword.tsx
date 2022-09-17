import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useLocation } from "react-router-dom";
import { AlertType, useOutletContextProps, LocationType } from '../../ts/types';
import { LANG, ROUTES } from '../../languages/index';
import { AppContext } from '../../context';
import { isValidEmail } from "../../helpers";
import { Button, Input, Link } from "../../components";
import Image from '../../images/auth/ForgorPassword.svg';

export default function ForgorPassword() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const { setAlert, setImage, setTitle, sendForgotPasswordCode }: useOutletContextProps = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(() => setTitle(LANG[state.lang].auth.forgotPassword), [setTitle, state.lang]);

  const disabled = () => email === "" || !isValidEmail(email);

  return (
    <form>
      <div className="mb-4">
        <Input
          type="email"
          placeholder={LANG[state.lang].email}
          value={email}
          handler={setEmail}
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
        <Link to={ROUTES[state.lang].HOME} text={LANG[state.lang].auth.backToSignIn} className="text-xl font-bold" />
      </div>
    </form>
  );
}
