import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useLocation } from "react-router-dom";
import { AlertType, useOutletContextProps, LocationType } from '../../ts/types';
import { LANG, ROUTES } from '../../languages/index';
import { AppContext } from '../../context';
import { isValidEmail } from "../../helpers";
import { Button, Input, Link } from "../../components";
import Image from '../../images/auth/ConfirmSignUp.svg';

export default function ConfirmSignUp() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const { setAlert, setImage, setTitle, resendConfirmationCode, confirmSignUp }: useOutletContextProps = useOutletContext();
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(() => setTitle(LANG[state.lang].auth.ConfirmSignUp), [setTitle, state.lang]);

  const disabled = () =>
    email === "" || !isValidEmail(email) || code === "" || code.length < 6;

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
        <Input type="text" placeholder={LANG[state.lang].code} value={code} handler={setCode} />
      </div>
      <div className="mb-4 flex justify-end duration-200 transition ease-in-out">
        <button type="button" onClick={() => resendConfirmationCode(email)}>
          {LANG[state.lang].auth.reSendCode}
        </button>
      </div>
      <div className="mb-4">
        <Button
          text={LANG[state.lang].confirm}
          disabled={disabled()}
          handler={() => confirmSignUp(email, code)}
          full
        />
      </div>
      <div className="w-full text-center mt-4">
        <Link to={ROUTES[state.lang].HOME} text={LANG[state.lang].auth.backToSignIn} className="text-xl font-bold" />
      </div>
    </form>
  );
}
