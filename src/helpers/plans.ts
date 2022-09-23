import { LANGUAGES } from "../ts/enums";
import {
  FormatPlansContentNameType,
  FormatPlansContentDetailType,
  FormatPlansContentPriceType,
} from "../ts/types";

export const extractPlanName = (name: string, l: LANGUAGES): string => {
  const parsed = JSON.parse(name) as FormatPlansContentNameType[];
  const parsedLang = parsed.find((p) => p.language === l);
  return parsedLang ? parsedLang.name : "";
};

export const extractPlanDetails = (details: string, l: LANGUAGES): string[] => {
  const parsed = JSON.parse(details) as FormatPlansContentDetailType[];
  const parsedLang = parsed.find((p) => p.language === l);
  return parsedLang ? parsedLang.detail : [];
};

export const extractPlanPrice = (price: string, l: LANGUAGES): number => {
  const parsed = JSON.parse(price) as FormatPlansContentPriceType[];
  const parsedLang = parsed.find((p) => p.language === l);
  return parsedLang ? parsedLang.price : 0;
};

export const extractPlanCurrency = (price: string, l: LANGUAGES): string => {
  const parsed = JSON.parse(price) as FormatPlansContentPriceType[];
  const parsedLang = parsed.find((p) => p.language === l);
  return parsedLang ? parsedLang.currency : "";
};
