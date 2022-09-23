import LocalStorage from "../api/local-storage";
import { LANGUAGES, CONTEXT } from "../ts/enums";
import { AlertType, ContextStateType, ContextActions, ContextClientType } from "../ts/types";

const saveState = (state: ContextStateType) =>
  LocalStorage.Save("state", state, true);

const updateLang = (state: ContextStateType, payload: LANGUAGES) => {
  const newState = { ...state, lang: payload };
  saveState(newState);
  return newState;
};

const updateUser = (state: ContextStateType, payload: any) => {
  const newState = { ...state, client: payload };
  saveState(newState);
  return newState;
};

const updateAlerts = (state: ContextStateType, payload: AlertType[]) => {
  const newState = { ...state, alerts: payload };
  saveState(newState);
  return newState;
};

export const ContextReducer = (state: ContextStateType, { type, payload }: ContextActions): ContextStateType => {
  switch (type) {
    case CONTEXT.UPDATE_LANGUAGE:
      return updateLang(state, payload as LANGUAGES);
    case CONTEXT.UPDATE_CLIENT:
      return updateUser(state, payload as ContextClientType);
    case CONTEXT.UPDATE_ALERTS:
      return updateAlerts(state, payload as AlertType[]);
    default:
      throw new Error("TYPE NOT FOUND");
  }
};
