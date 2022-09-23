import {
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactElement,
} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import slugify from "slugify";
import Queries from "../../api/queries";
import { AppContext } from "../../context";
import { LANGUAGES } from "../../ts/enums";
import { PlansTypes } from "../../models/index";
import { LANG, ROUTES } from "../../languages";
import { useOutletContextProfileProps } from "../../ts/types";
import { ConfirmationDialog } from "../../components";

type FormatPlansType = {
  [key in LANGUAGES]: FormatPlansLangType;
};

type FormatPlansLangType = {
  [key in PlansTypes]: FormatPlansContentType;
};

type FormatPlansContentType = {
  id: string;
  type: PlansTypes;
  name?: string;
  detail?: string[];
  price?: number;
  currency?: string;
};

type FormatPlansContentNameType = {
  language: LANGUAGES;
  name: string;
};

type FormatPlansContentDetailType = {
  language: string;
  detail: string[];
};

type FormatPlansContentPriceType = {
  language: string;
  currency: string;
  price: number;
};

type PlansCardInfoType = {
  color: string;
  icon: ReactElement;
};

type PlansModalType = {
  plan: FormatPlansContentType;
  info: PlansCardInfoType;
};

export default function PlanSelection() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { setLoading } = useOutletContext<useOutletContextProfileProps>();
  const [plans, setPlans] = useState<FormatPlansType>();
  const [open, setOpen] = useState(false);
  const [planModal, setPlanModal] = useState<PlansModalType>();

  const getPlans = useCallback(async (): Promise<void> => {
    setLoading(true);

    const extractPlanName = (name: string, l: LANGUAGES): string => {
      const parsed = JSON.parse(name) as FormatPlansContentNameType[];
      const parsedLang = parsed.find((p) => p.language === l);
      return parsedLang ? parsedLang.name : "";
    };

    const extractPlanDetails = (details: string, l: LANGUAGES): string[] => {
      const parsed = JSON.parse(details) as FormatPlansContentDetailType[];
      const parsedLang = parsed.find((p) => p.language === l);
      return parsedLang ? parsedLang.detail : [];
    };

    const extractPlanPrice = (price: string, l: LANGUAGES): number => {
      const parsed = JSON.parse(price) as FormatPlansContentPriceType[];
      const parsedLang = parsed.find((p) => p.language === l);
      return parsedLang ? parsedLang.price : 0;
    };

    const extractPlanCurrency = (price: string, l: LANGUAGES): string => {
      const parsed = JSON.parse(price) as FormatPlansContentPriceType[];
      const parsedLang = parsed.find((p) => p.language === l);
      return parsedLang ? parsedLang.currency : "";
    };

    const activeplans = await Queries.listPlans();
    const languages = Object.values(LANGUAGES);
    const formatPlans = {} as FormatPlansType;
    if (activeplans) {
      languages.forEach((l) => {
        formatPlans[l] = {} as FormatPlansLangType;
        activeplans.forEach((p) => {
          formatPlans[l][p.type] = {} as FormatPlansContentType;
          formatPlans[l][p.type] = {
            id: p.id,
            type: p.type as PlansTypes,
            name: extractPlanName(p.name, l),
            detail: extractPlanDetails(p.detail, l),
            price: extractPlanPrice(p.price, l),
            currency: extractPlanCurrency(p.price, l),
          };
        });
      });
    }
    setPlans(formatPlans);
    setLoading(false);
  }, [setLoading]);

  const plansCardInfo = (type: PlansTypes): PlansCardInfoType => {
    if (type === PlansTypes.BASIC) {
      return {
        color: "bg-emerald-500",
        icon: (
          <i className="bx bx-mail-send text-6xl mb-4 hover:text-emerald-500" />
        ),
      };
    }
    if (type === PlansTypes.ADVANCED) {
      return {
        color: "bg-orange-500",
        icon: (
          <i className="bx bxs-message-detail text-6xl mb-4 hover:text-orange-500" />
        ),
      };
    }
    return {
      color: "bg-sky-500",
      icon: <i className="bx bx-calendar text-6xl mb-4 hover:text-sky-500" />,
    };
  };

  function choosePlan(name: string | undefined): void {
    if (name)
      navigate(`${ROUTES[state.lang].NEW}/${slugify(name, { lower: true })}`);
  }

  const handlePlanInfo = (p: FormatPlansContentType): void => {
    setPlanModal({
      plan: p,
      info: plansCardInfo(p.type),
    });
    setOpen(true);
  };

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  const renderPlanCard = (p: FormatPlansContentType): ReactElement => {
    const cardInfo = plansCardInfo(p.type);
    return (
      <div className="relative shadow-md text-center bg-white">
        <button
          type="button"
          onClick={() => handlePlanInfo(p)}
          className="absolute top-2 right-2 text-slate-500 z-10"
        >
          <i className="bx bxs-info-circle text-3xl" />
        </button>
        <button
          type="button"
          onClick={() => choosePlan(p.name)}
          className={`p-8 hover:text-${cardInfo.color.split('bg-')[1]}`}
        >
          {cardInfo.icon}
          <h1 className="text-lg font-bold">{p.name}</h1>
        </button>
      </div>
    );
  };

  const renderPlanPrice = (price: number, currency: string, type: PlansTypes): string => {
    let res = currency === "brl" ? `R$ ${price},00` : `USD$ ${price},00`;
    res +=
      type === PlansTypes.SUBSCRIPTION
        ? ` ${LANG[state.lang].payments.type.monthly}`
        : type === PlansTypes.BASIC
        ? ` ${LANG[state.lang].payments.type.byEvent}`
        : `* ${LANG[state.lang].payments.type.byEvent}`;
    return res;
  }

  const renderInfoModal = (p: FormatPlansContentType): ReactElement => {
    if (p) {
      return (
        <>
          <h1 className="text-lg font-bold mb-4">{p.name}</h1>
          {p.detail &&
            p.detail.map((d) => (
              <p key={d} className="border-b mb-2 pb-2">
                {d}
              </p>
            ))}
          <h2 className="font-bold mt-4">
            {renderPlanPrice(p.price || 0, p.currency || 'brl', p.type)}
          </h2>
        </>
      );
    }
    return <></>;
  }

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {plans && (
        <>
          {renderPlanCard(plans[state.lang].BASIC)}
          {renderPlanCard(plans[state.lang].ADVANCED)}
          {renderPlanCard(plans[state.lang].SUBSCRIPTION)}
        </>
      )}
      {planModal && planModal.plan && (
        <ConfirmationDialog
          open={open}
          setOpen={setOpen}
          handleConfirm={() => choosePlan(planModal?.plan?.name)}
          icon={planModal?.info?.icon}
          cancelText={LANG[state.lang].close}
          confirmText={LANG[state.lang].select}
          confirmColor={planModal?.info?.color || ""}
        >
          {renderInfoModal(planModal.plan)}
        </ConfirmationDialog>
      )}
    </div>
  );
}
