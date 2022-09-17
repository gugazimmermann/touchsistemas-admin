import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { AppContext } from "./context";
import { Loading } from "./components";
import { CONTEXT, LANGUAGES } from './ts/enums';
import { ROUTES } from './languages/index';

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const RedefinePassword = lazy(() => import("./pages/auth/RedefinePassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ConfirmSignUp = lazy(() => import("./pages/auth/ConfirmSignUp"));

function App() {
  const [searchParams] = useSearchParams();
	const { state, dispatch } = useContext(AppContext);

	useEffect(() => {
    const lang = searchParams.get('lang');
		if (lang) dispatch({ type: CONTEXT.UPDATE_LANGUAGE, payload: lang.toLocaleUpperCase() as unknown as LANGUAGES});
	}, [dispatch, searchParams]);
  
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
