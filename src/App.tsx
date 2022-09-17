import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CONTEXT, LANGUAGES } from './ts/enums';
import { AppContext } from "./context";
import { ROUTES } from './languages';
import { Loading } from "./components";

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const RedefinePassword = lazy(() => import("./pages/auth/RedefinePassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ConfirmSignUp = lazy(() => import("./pages/auth/ConfirmSignUp"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
	const { state, dispatch } = useContext(AppContext);

	useEffect(() => {
    const lang = (searchParams.get('lang') || "").toLocaleUpperCase();
    if (lang) {
      dispatch({ type: CONTEXT.UPDATE_LANGUAGE, payload: lang as LANGUAGES});
      const nextRoute = Object.values(ROUTES[lang as LANGUAGES])[
        Object.values(ROUTES[state.lang])
          .map((x) => x)
          .indexOf(location.pathname)
      ];
      navigate(`${nextRoute}${location.search}`);
    }
	}, [dispatch, location.pathname, location.search, navigate, searchParams, state.lang]);
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES[state.lang].HOME} element={<SignIn />} />
          <Route path={ROUTES[state.lang].FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES[state.lang].REDIFINE_PASSWORD} element={<RedefinePassword />} />
          <Route path={ROUTES[state.lang].REGISTER} element={<SignUp />} />
          <Route path={ROUTES[state.lang].CONFIRM_REGISTRATION} element={<ConfirmSignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
