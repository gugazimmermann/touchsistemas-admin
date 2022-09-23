import { useContext, ReactElement } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context";
import { showLink } from "../helpers";
import { ROUTES } from "../languages";
import NavAlert from "./NavAlert";
import NavInfo from "./NavInfo";
import NavProfile from "./NavProfile";
import LogoIcon from "../images/LogoIcon";

type NavProps = {
  handleSignOut: () => void;
}

const Nav = ({ handleSignOut }: NavProps): ReactElement => {
	const { state } = useContext(AppContext);
	const location = useLocation();

	return (
		<nav className="w-full shadow-md z-30 px-2 py-1.5 bg-white text-slate-500">
			<div className="container mx-auto flex flex-wrap justify-center sm:justify-between">
				<Link
					to={showLink(state) ? ROUTES[state.lang].DASHBOARD : ROUTES[state.lang].ALERTS}
					className="flex flex-row items-center text-primary mb-2 sm:mb-0"
				>
					<LogoIcon styles="h-8 w-8" />
					<p className="text-2xl">{process.env.REACT_APP_TITLE}</p>
				</Link>
				<div className="w-auto flex flex-row gap-4 items-center">
					{showLink(state) ? (
						<Link to={ROUTES[state.lang].DASHBOARD}>
							<i
								className={`bx ${location.pathname === ROUTES[state.lang].DASHBOARD ? 'bxs' : 'bx'}-grid-alt text-3xl`}
							/>
						</Link>
					) : (
						<i className="bx bx-grid-alt text-3xl" />
					)}
					{showLink(state) ? (
						<Link to={ROUTES[state.lang].NEW}>
							<i
								className={`bx ${location.pathname === ROUTES[state.lang].NEW ? 'bxs' : 'bx'}-message-alt-add text-3xl`}
							/>
						</Link>
					) : (
						<i className="bx bx-message-alt-x text-3xl" />
					)}
					<NavInfo qtd={0} />
					{/* {state.alerts.length > 0 && <NavAlert alerts={state.alerts.length} />} */}
					<NavAlert />
					<NavProfile handleSignOut={handleSignOut} qtd={0} />
				</div>
			</div>
		</nav>
	);
}

export default Nav;
