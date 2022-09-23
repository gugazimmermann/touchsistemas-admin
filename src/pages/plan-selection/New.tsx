import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import slugify from "slugify";
import { AppContext } from "../../context";
import { ROUTES } from "../../languages";
import { useOutletContextProfileProps } from "../../ts/types";
import Queries from "../../api/queries";
import { Plan } from "../../models";
import { extractPlanName } from "../../helpers";

export default function New() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useContext(AppContext);
  const { setLoading } = useOutletContext<useOutletContextProfileProps>();
  const [plan, setPlan] = useState<Plan>();

  const handlePlan = useCallback(async (): Promise<void> => {
    setLoading(true);
    const activeplans = await Queries.listPlans();
    const selectedPlan = activeplans
      ?.map((a) => {
        const name = extractPlanName(a.name, state.lang);
        if (slugify(name, { lower: true }) === params.name) return a;
        return null;
      })
      .filter((n) => n)[0];
    if (!selectedPlan) navigate(`${ROUTES[state.lang].DASHBOARD}`);
    setPlan(selectedPlan as Plan);
    setLoading(false);
  }, [navigate, params.name, setLoading, state.lang]);

  useEffect(() => {
    handlePlan();
  }, [handlePlan]);

  if (plan) {
    return <div>{plan.type}</div>;
  }
  return <div></div>;
}
