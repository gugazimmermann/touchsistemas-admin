import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LANGUAGES, CONTEXT } from "../ts/enums";
import { AppContext } from "../context";
import { useCloseModal } from "../helpers";
import { ROUTES } from "../languages";
import BR from "../images/flags/br.svg";
import EN from "../images/flags/en.svg";
import ES from "../images/flags/es.svg";
import ArrowIcon from "../images/ArrowIcon";

const Flags = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const ref = useCloseModal(open, setOpen);

  const showFlag = (l: LANGUAGES) => {
    if (l === LANGUAGES.EN)
      return <img src={EN} alt="English" className="w-6 h-6" />;
    if (l === LANGUAGES.ES)
      return <img src={ES} alt="Español" className="w-6 h-6" />;
    return <img src={BR} alt="Português" className="w-6 h-6" />;
  }

  const handleChangeLanguage = (l: LANGUAGES) => {
    const nextRoute = Object.values(ROUTES[l])[
      Object.values(ROUTES[state.lang])
        .map((x) => x)
        .indexOf(location.pathname)
    ];
    dispatch({ type: CONTEXT.UPDATE_LANGUAGE, payload: l });
    navigate(nextRoute);
    setOpen(false);
  }

  return (
    <div className="z-10">
      <button
        type="button"
        className="flex items-center px-1"
        onClick={() => setOpen(!open)}
      >
        {showFlag(state.lang)}
        <ArrowIcon styles={`ml-1 w-4 h-4 ${open && "rotate-180"}`} />
      </button>
      <ul
        ref={ref}
        className={`flex flex-col items-start pl-1 mt-2 ${!open && "hidden"}`}
      >
        {Object.values(LANGUAGES)
          .filter((l) => l !== state.lang)
          .map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => handleChangeLanguage(l as LANGUAGES)}
              >
                {showFlag(l as LANGUAGES)}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Flags;
