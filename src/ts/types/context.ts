import { Owner } from "../../API";
import { CONTEXT, LANGUAGES } from "../enums";
import { AlertType, GenericObject } from "./general";

export type CognitoUserType = {
  sub: string;
  email_verified: boolean;
  locale: string;
  email: string;
};

type ContextPayload = {
  [CONTEXT.UPDATE_LANGUAGE]: LANGUAGES;
  [CONTEXT.UPDATE_CLIENT]: GenericObject;
  [CONTEXT.UPDATE_ALERTS]: AlertType[];
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
  client: ContextClientType;
  alerts: AlertType[];
};

export type ContextClientType = {
  user: CognitoUserType;
  id: string;
  logo: string | null | undefined;
  name?: string | null;
  phone?: string | null;
  doctype?: string | null;
  document?: string | null;
  email: string;
  website?: string | null;
  zipCode?: string | null;
  state?: string | null;
  city?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
  Owners?: (Owner | null)[] | null;
};
