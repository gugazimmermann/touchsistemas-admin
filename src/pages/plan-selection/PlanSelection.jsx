import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { PLANS, LANGUAGES, ROUTES } from '../../constants';
import { AppContext } from '../../context';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { Loading } from '../../components';
import { listPlans } from '../../api/queries';

export default function PlanSelection() {
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [plans, setPlans] = useState();
	const [open, setOpen] = useState(false);
	const [planModal, setPlanModal] = useState();

	async function getPlans() {
		setLoading(true);
		const activeplans = await listPlans();
		const languages = Object.keys(LANGUAGES);
		const formatPlans = {};
		languages.forEach((l) => {
			formatPlans[`${l}`] = {};
			activeplans.forEach((p) => {
				formatPlans[`${l}`][`${p.type}`] = {
					id: p.id,
					type: p.type,
					name: JSON.parse(p.name).find((x) => x.language === l).name,
					details: JSON.parse(p.detail)
						.find((x) => x.language === l)
						.detail.map((d) => d),
					price: JSON.parse(p.price).find((x) => x.language === l).price,
					currency: JSON.parse(p.price).find((x) => x.language === l).currency,
				};
			});
		});
		setPlans(formatPlans);
		setLoading(false);
	}

	function plansCardInfo(type) {
		if (type === PLANS.BASIC) {
			return {
				color: 'emerald-500',
				icon: <i className="bx bx-mail-send text-6xl mb-4 hover:text-emerald-500" />,
			};
		}
		if (type === PLANS.ADVANCED) {
			return {
				color: 'orange-500',
				icon: <i className="bx bxs-message-detail text-6xl mb-4 hover:text-orange-500" />,
			};
		}
		return {
			color: 'sky-500',
			icon: <i className="bx bx-calendar text-6xl mb-4 hover:text-sky-500" />,
		};
	}

	function choosePlan(p) {
		navigate(`${ROUTES[state.lang].NEW}/${slugify(p.name, { lower: true })}`);
	}

	function handlePlanInfo(p) {
		setPlanModal({
			plan: p,
			info: plansCardInfo(p.type),
		});
		setOpen(true);
	}

	useEffect(() => {
		getPlans([]);
	}, []);

	function renderPlanCard(p) {
		const cardInfo = plansCardInfo(p.type);
		return (
			<div className="relative shadow-md text-center bg-white">
				<button type="button" onClick={() => handlePlanInfo(p)} className="absolute top-2 right-2 text-slate-500 z-10">
					<i className="bx bxs-info-circle text-3xl" />
				</button>
				<button type="button" onClick={() => choosePlan(p)} className={`p-8 hover:text-${cardInfo.color}`}>
					{cardInfo.icon}
					<h1 className="text-lg font-bold">{p.name}</h1>
				</button>
			</div>
		);
	}

	function renderPlanPrice(price, currency, type) {
		let res = currency === 'brl' ? `R$ ${price},00` : `USD$ ${price},00`;
		res +=
			type === PLANS.SUBSCRIPTION
				? ` ${LANGUAGES[state.lang].payments.type.monthly}`
				: type === PLANS.BASIC
				? ` ${LANGUAGES[state.lang].payments.type.byEvent}`
				: `* ${LANGUAGES[state.lang].payments.type.byEvent}`;
		return res;
	}

	function renderInfoModal(p) {
		if (p) {
			return (
				<div>
					<h1 className="text-lg font-bold mb-4">{p.name}</h1>
					{p.details.map((d) => (
						<p key={d} className="border-b mb-2 pb-2">
							{d}
						</p>
					))}
					<h2 className="font-bold mt-4">{renderPlanPrice(p.price, p.currency, p.type)}</h2>
				</div>
			);
		}
		return null;
	}

	if (loading) return <Loading />;

	return (
		<div className="grid sm:grid-cols-3 gap-4">
			{plans && (
				<>
					{renderPlanCard(plans[state.lang].BASIC)}
					{renderPlanCard(plans[state.lang].ADVANCED)}
					{renderPlanCard(plans[state.lang].SUBSCRIPTION)}
				</>
			)}
			<ConfirmationDialog
				open={open}
				setOpen={setOpen}
				handleConfirm={() => choosePlan(planModal?.plan)}
				icon={planModal?.info?.icon}
				cancelText={LANGUAGES[state.lang].close}
				confirmText={LANGUAGES[state.lang].select}
				confirmColor={planModal?.info?.color}
			>
				{renderInfoModal(planModal?.plan)}
			</ConfirmationDialog>
		</div>
	);
}
