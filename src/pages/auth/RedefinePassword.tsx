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
import {  } from "../../ts/types/outlet-context";
import Image from "../../images/auth/RedefinePassword.svg";

export default function RedefinePassword() {
  const { state } = useContext(AppContext);
  const location: LocationType = useLocation();
  const {
    setAlert,
    setImage,
    setTitle,
    redefinePassword,
  }: useOutletContextProps = useOutletContext();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");

  useEffect(
    () => setAlert((location.state?.alert as AlertType) || {}),
    [location.state?.alert, setAlert]
  );
  useEffect(() => setImage(Image), [setImage]);
  useEffect(
    () => setTitle(LANG[state.lang].auth.redefine),
    [setTitle, state.lang]
  );

  useEffect(() => {
    if (searchParams.get("email")) setEmail(searchParams.get("email") || "");
    if (searchParams.get("code")) setCode(searchParams.get("code") || "");
  }, [searchParams]);

  const disabled = () =>
    email === "" ||
    !validateEmail(email) ||
    code === "" ||
    code.length < 6 ||
    pwd === "" ||
    repeat === "" ||
    pwd !== repeat;

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
      <div className="mb-4">
        <Input
          type="password"
          placeholder={LANG[state.lang].password}
          value={pwd}
          handler={(e) => setPwd(e.target.value)}
          showTooltip
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder={LANG[state.lang].auth.repeatPassword}
          value={repeat}
          handler={(e) => setRepeat(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Button
          text={LANG[state.lang].auth.redefine}
          disabled={disabled()}
          handler={() => redefinePassword(email, code, pwd)}
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
