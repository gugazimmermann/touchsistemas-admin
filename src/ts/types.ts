import { ALERT, CONTEXT, LANGUAGES } from "./enums";

export type GenericObject = { [key: string]: any };

type ContextPayload = {
  [CONTEXT.UPDATE_LANGUAGE]: LANGUAGES;
};

export type ContextActions =
  ContextActionMap<ContextPayload>[keyof ContextActionMap<ContextPayload>];

export type ContextActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ContextStateType = {
  lang: LANGUAGES;
};

export type AlertType = {
  type?: ALERT;
  text?: string;
};

export type LocationType = {
  state: {
    email?: string;
    alert?: AlertType;
  }
};

export type useOutletContextProps = {
  setAlert: (alert: AlertType) => void;
  setImage: (text: string) => void;
  setTitle: (text: string) => void;
  signIn: (email: string, pwd: string, remember: boolean) => void;
  sendForgotPasswordCode: (email: string) => void;
  redefinePassword: (email: string, code: string, pwd: string) => void;
  resendConfirmationCode: (email: string) => void;
  confirmSignUp: (email: string, code: string) => void;
  signUp: (email: string, pwd: string) => void;
};