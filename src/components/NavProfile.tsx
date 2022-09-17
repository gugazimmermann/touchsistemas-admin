import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context";
import { useCloseModal } from "../helpers";
import { LANG, ROUTES } from '../languages/index';

type NavProfileProps = {
  handleSignOut: () => void;
};

const NavProfile = ({ handleSignOut }: NavProfileProps) => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useCloseModal(open, setOpen);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const renderProfileMenu = () => (
    <ul
      ref={ref}
      className={`${
        open ? "absolute" : "hidden"
      } list-style-none w-48 right-0 top-9 border inverted z-50`}
    >
      <li className="p-2 text-center">
        <Link to={ROUTES[state.lang].PROFILE}>{LANG[state.lang].nav.profile}</Link>
      </li>
      <li className="p-2 text-center">
        <Link to={ROUTES[state.lang].PAYMENTS}>{LANG[state.lang].nav.payments}</Link>
      </li>
      <li className="p-2 text-center">
        <button type="button" onClick={() => handleSignOut()}>
          {LANG[state.lang].nav.logout}
        </button>
      </li>
    </ul>
  );

  return (
    <div className="relative">
      <button
        type="button"
        aria-controls="navbarAvatarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="flex items-center px-1"
        onClick={() => setOpen(!open)}
      >
        <i className="bx bx-user-circle text-3xl" />
      </button>
      <nav>{renderProfileMenu()}</nav>
    </div>
  );
};

export default NavProfile;
