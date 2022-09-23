import { lazy, Suspense, useContext, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CONTEXT, LANGUAGES } from "./ts/enums";
import { AppContext } from "./context";
import { ROUTES } from "./languages";
import { Loading } from "./components";

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const RedefinePassword = lazy(() => import("./pages/auth/RedefinePassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ConfirmSignUp = lazy(() => import("./pages/auth/ConfirmSignUp"));

const Layout = lazy(() => import("./pages/layout/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Alerts = lazy(() => import("./pages/alerts/Alerts"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const ProfileCognito = lazy(() => import("./pages/profile/ProfileCognito"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(AppContext);

  const verifyLang = useCallback(() => {
    let lang = state.lang;
    lang = (searchParams.get("lang") || "").toLocaleUpperCase() as LANGUAGES;
    if (lang) {
      dispatch({ type: CONTEXT.UPDATE_LANGUAGE, payload: lang as LANGUAGES });
      const nextRoute = Object.values(ROUTES[lang as LANGUAGES])[
        Object.values(ROUTES[state.lang])
          .map((x) => x)
          .indexOf(location.pathname)
      ];
      navigate(`${nextRoute}${location.search}`);
    }
  }, [dispatch, location.pathname, location.search, navigate, searchParams, state.lang]);

  useEffect(() => {
    verifyLang();
  }, [verifyLang]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES[state.lang].HOME} element={<SignIn />} />
          <Route
            path={ROUTES[state.lang].FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={ROUTES[state.lang].REDIFINE_PASSWORD}
            element={<RedefinePassword />}
          />
          <Route path={ROUTES[state.lang].REGISTER} element={<SignUp />} />
          <Route
            path={ROUTES[state.lang].CONFIRM_REGISTRATION}
            element={<ConfirmSignUp />}
          />
        </Route>
        <Route element={<Layout />}>
          <Route path={ROUTES[state.lang].DASHBOARD} element={<Home />} />
          <Route path={ROUTES[state.lang].ALERTS} element={<Alerts />} />
          <Route path={ROUTES[state.lang].PROFILE} element={<Profile />} />
          <Route path={ROUTES[state.lang].PROFILEADVANCED} element={<ProfileCognito />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
