import { ContextActions, ContextStateType } from "../ts/types";
import { CONTEXT, LANGUAGES } from "../ts/enums";
import LocalStorage from "../api/local-storage";

const saveState = (state: ContextStateType) =>
  LocalStorage.Save("state", state, true);

const updateLang = (state: ContextStateType, payload: LANGUAGES) => {
  const newState = { ...state, lang: payload };
  saveState(newState);
  return newState;
};

export const ContextReducer = (
  state: ContextStateType,
  { type, payload }: ContextActions
): ContextStateType => {
  switch (type) {
    case CONTEXT.UPDATE_LANGUAGE:
      return updateLang(state, payload as LANGUAGES);
    default:
      throw new Error("TYPE NOT FOUND");
  }
};
