import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useLocation } from "react-router-dom";
import { AlertType, useOutletContextProps, LocationType } from '../../ts/types';
import { LANG, ROUTES } from '../../languages/index';
import { AppContext } from '../../context';
import { isValidEmail } from "../../helpers";
import { Button, Input, Link, RememberMe } from "../../components";
import Image from '../../images/auth/SignIn.svg';

export default function SignIn() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const { setAlert, setImage, setTitle, signIn }: useOutletContextProps = useOutletContext();
  const [email, setEmail] = useState(location.state?.email || "");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(() => setTitle(LANG[state.lang].auth.signIn), [setTitle, state.lang]);

  const disabled = () => email === "" || !isValidEmail(email) || pwd === "";

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
        <Input
          type="password"
          placeholder={LANG[state.lang].password}
          value={pwd}
          handler={setPwd}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <RememberMe remember={remember} setRemember={setRemember} />
        <Link to={ROUTES[state.lang].FORGOT_PASSWORD} text={LANG[state.lang].auth.forgotPassword} />
      </div>
      <div className="mb-4">
        <Button
          text={LANG[state.lang].auth.signIn}
          disabled={disabled()}
          handler={() => signIn(email, pwd, remember)}
          full
        />
      </div>
      <div className="w-full text-center mt-4">
        <Link
          to={ROUTES[state.lang].REGISTER}
          text={LANG[state.lang].auth.newSignUp}
          className="text-xl font-bold"
        />
      </div>
    </form>
  );
}
