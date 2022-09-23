import { ALERT } from "../ts/enums";
import { ContextStateType } from "../ts/types";

export const CapitalizeFirstLetter = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ShowList = (list: string[]): string => {
  const capitalize = list.map((s) => {
    let text = s;
    if (s.includes("/")) {
      const rearrange = s.split("/");
      const rearrangeMap = rearrange.map((r) => CapitalizeFirstLetter(r));
      text = rearrangeMap.join("/");
    } else {
      text = CapitalizeFirstLetter(s);
    }
    return text;
  });
  return capitalize.join(", ");
};

export const showLink = (state: ContextStateType): boolean =>
  !state.alerts.filter((a) => a.type === ALERT.WARNING)
  .length;
