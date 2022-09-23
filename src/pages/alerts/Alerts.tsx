import { useContext, ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "../../components";
import { AppContext } from "../../context";
import { LANG, ROUTES } from "../../languages";
import { ALERT } from "../../ts/enums";
import AlertCard from "./AlertCard";

export default function Alerts(): ReactElement {
  const { state } = useContext(AppContext);

  const profileLink = () => (
    <Link
      className="pl-2"
      to={ROUTES[state.lang].PROFILE}
      text={LANG[state.lang].alerts.clickHere}
    />
  );

  function handleAlertLink(text: string) {
    switch (text) {
      case LANG[state.lang].alerts.owner:
        return profileLink();
      case LANG[state.lang].alerts.register:
        return profileLink();
      default:
        return null;
    }
  }

  if (state.alerts.length > 0) {
    return (
      <>
        {state.alerts.map((a) => (
          <AlertCard key={uuidv4()} index={uuidv4()} type={a.type as ALERT}>
            <>
              {a.text}
              {handleAlertLink(a.text || "")}
            </>
          </AlertCard>
        ))}
      </>
    );
  }
  return (
    <h1 className="font-bold text-lg text-center my-4">
      {LANG[state.lang].noRecords}
    </h1>
  );
}
