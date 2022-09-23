import { Dispatch, createContext, ReactNode, ReactElement, useReducer } from "react";
import LocalStorage from "../api/local-storage";
import { LANGUAGES } from "../ts/enums";
import { AlertType, ContextActions, ContextClientType, ContextStateType } from "../ts/types";
import { ContextReducer } from "./reducers";

const initial: ContextStateType = {
  lang: LocalStorage.GetItem("state", true)?.lang || LANGUAGES.BR,
  client: LocalStorage.GetItem("state", true)?.client ||  {} as ContextClientType,
  alerts: [] as AlertType[],
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
