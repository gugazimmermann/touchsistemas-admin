import { ReactElement } from "react";
import { PlansTypes } from "../../API";
import { LANGUAGES } from "../enums";

export type FormatPlansType = {
  [key in LANGUAGES]: FormatPlansLangType;
};

export type FormatPlansLangType = {
  [key in PlansTypes]: FormatPlansContentType;
};

export type FormatPlansContentType = {
  id: string;
  type: PlansTypes;
  name?: string;
  detail?: string[];
  price?: number;
  currency?: string;
};

export type FormatPlansContentNameType = {
  language: LANGUAGES;
  name: string;
};

export type FormatPlansContentDetailType = {
  language: string;
  detail: string[];
};

export type FormatPlansContentPriceType = {
  language: string;
  currency: string;
  price: number;
};

export type PlansCardInfoType = {
  color: string;
  icon: ReactElement;
};

export type PlansModalType = {
  plan: FormatPlansContentType;
  info: PlansCardInfoType;
};