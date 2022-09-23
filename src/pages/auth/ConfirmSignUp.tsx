import { useContext, useState, useEffect } from "react";
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Input, Button, Link } from "../../components";
import { AppContext } from "../../context";
import { validateEmail } from "../../helpers";
import { LANG, ROUTES } from "../../languages";
import { LocationType, AlertType, useOutletContextProps } from "../../ts/types";
import Image from "../../images/auth/ConfirmSignUp.svg";

export default function ConfirmSignUp() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const {
    setAlert,
    setImage,
    setTitle,
    resendConfirmationCode,
    confirmSignUp,
  }: useOutletContextProps = useOutletContext();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(
    () => setTitle(LANG[state.lang].auth.ConfirmSignUp),
    [setTitle, state.lang]
  );

  useEffect(() => {
    if (searchParams.get("email")) setEmail(searchParams.get("email") || "");
    if (searchParams.get("code")) setCode(searchParams.get("code") || "");
  }, [searchParams]);

  const disabled = () =>
    email === "" || !validateEmail(email) || code === "" || code.length < 6;

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
          type="text"
          placeholder={LANG[state.lang].code}
          value={code}
          handler={(e) => setCode(e.target.value)}
        />
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
        <Link
          to={ROUTES[state.lang].HOME}
          text={LANG[state.lang].auth.backToSignIn}
          className="text-xl font-bold"
        />
      </div>
    </form>
  );
}
