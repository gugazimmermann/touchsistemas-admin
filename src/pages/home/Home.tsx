import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { ROUTES } from "../../languages";

export default function Home() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  
  useEffect(() => {
		if (state.alerts.length) navigate(ROUTES[state.lang].ALERTS);
	}, [navigate, state.alerts.length, state.lang]);
  
  return (
    <section>
    </section>
  );
}
