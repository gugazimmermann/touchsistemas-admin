import { useContext, useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Input, RememberMe, Button, Link } from "../../components";
import { AppContext } from "../../context";
import { validateEmail } from "../../helpers";
import { LANG, ROUTES } from "../../languages";
import { LocationType, AlertType, useOutletContextProps } from "../../ts/types";
import Image from "../../images/auth/SignIn.svg";

export default function SignIn() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const { setAlert, setImage, setTitle, signIn }: useOutletContextProps =
    useOutletContext();
  const [email, setEmail] = useState(location.state?.email || "");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(
    () => setTitle(LANG[state.lang].auth.signIn),
    [setTitle, state.lang]
  );

  const disabled = () => email === "" || !validateEmail(email) || pwd === "";

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
        <Input
          type="password"
          placeholder={LANG[state.lang].password}
          value={pwd}
          handler={(e) => setPwd(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <RememberMe remember={remember} setRemember={setRemember} />
        <Link
          to={ROUTES[state.lang].FORGOT_PASSWORD}
          text={LANG[state.lang].auth.forgotPassword}
        />
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
