import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useReducer,
} from "react";
import { LANGUAGES } from "../ts/enums";
import { ContextActions, ContextStateType } from "../ts/types";
import { ContextReducer } from "./reducers";

const initial = {
  lang: LANGUAGES.BR,
};

type AppContextType = {
  state: ContextStateType;
  dispatch: Dispatch<ContextActions>;
};

const AppContext = createContext<AppContextType>({
  state: initial,
  dispatch: () => null,
});

const mainReducer = (state: ContextStateType, action: ContextActions) =>
  ContextReducer(state, action);

const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initial);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
