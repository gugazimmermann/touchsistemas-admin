import { useCallback, useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { COOKIES, Logger } from "../../helpers";
import Auth from "../../api/auth";
import { Loading, Nav } from "../../components";
import { AppContext } from "../../context";
import { ALERT, CONTEXT, LANGUAGES } from "../../ts/enums";
import Queries from "../../api/queries";
import { ROUTES, LANG } from '../../languages/index';
import { AlertType } from "../../ts/types";

export default function Layout() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [cookies, , removeCookie] = useCookies([COOKIES.NAME]);
  const [loading, setLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    await Auth.SignOut();
    removeCookie(COOKIES.NAME);
    navigate(ROUTES[state.lang].HOME);
  }, [navigate, removeCookie, state.lang]);

  const clientAlert = useCallback(() => {
    setLoading(true);
    const alerts = [] as AlertType[];
    if (!state.client?.phone) alerts.push({type: ALERT.WARNING, text: LANG[state.lang].alerts.register})
    dispatch({ type: CONTEXT.UPDATE_ALERTS, payload: alerts });
    setLoading(false);
  }, [dispatch, state.client?.phone, state.lang]);

  const loadClient = useCallback(async (force?: boolean) => {
    setLoading(true);
    const getCookie = COOKIES.Decode(cookies[COOKIES.NAME]);
    if (!getCookie?.email) navigate("/");
    if (!state.client?.user || force === true) {
      try {
        const attributes = await Auth.GetUser();
        const client = await Queries.ClientByEmail(attributes.email);
        if (!client) await handleSignOut();
        Logger("Layout Client", client);
        dispatch({
          type: CONTEXT.UPDATE_LANGUAGE,
          payload: attributes.locale as LANGUAGES,
        });
        dispatch({
          type: CONTEXT.UPDATE_CLIENT,
          payload: { ...client, user: attributes },
        });
      } catch (error) {
        navigate("/");
      }
    }
    setLoading(false);
    clientAlert();
  }, [clientAlert, cookies, dispatch, handleSignOut, navigate, state.client?.user]);

  useEffect(() => {
    loadClient();
  }, [loadClient]);

  return (
    <main className="layout flex flex-col h-screen justify-between container mx-auto max-w-5xl">
      {loading && <Loading />}
      <Nav handleSignOut={handleSignOut} />
      <div className="layout mb-auto h-full p-4 bg-slate-100">
        <Outlet context={{ loadClient, setLoading }} />
      </div>
      {/* <footer className="h-10 bg-blue-500">Footer</footer> */}
    </main>
  );
}
