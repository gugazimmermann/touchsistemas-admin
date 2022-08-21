import { useNavigate } from 'react-router-dom';
import { translatePlanUrl } from '../../../helpers';

export default function PlanSelection() {
	const navigate = useNavigate();

	function choosePlan(plan) {
		navigate(`/cadastrar/${translatePlanUrl(plan)}`);
	}

	// TODO: Show Plans Information to users
	return (
		<div className="grid sm:grid-cols-3 gap-4">
			<div
				role="presentation"
				onClick={() => choosePlan('BASIC')}
				className="shadow text-center p-8 bg-white hover:bg-green-50 hover:cursor-pointer"
			>
				<i className="bx bx-mail-send text-6xl mb-4" />
				<h1 className="text-lg font-bold">Básico</h1>
			</div>
			<div
				role="presentation"
				onClick={() => choosePlan('ADVANCED')}
				className="shadow text-center p-8 bg-white hover:bg-orange-50 hover:cursor-pointer"
			>
				<i className="bx bxs-message-detail text-6xl mb-4" />
				<h1 className="text-lg font-bold">Avançado</h1>
			</div>
			<div
				role="presentation"
				onClick={() => choosePlan('SUBSCRIPTION')}
				className="shadow text-center p-8 bg-white hover:bg-sky-50 hover:cursor-pointer"
			>
				<i className="bx bx-calendar text-6xl mb-4" />
				<h1 className="text-lg font-bold">Assinatura</h1>
			</div>
		</div>
	);
}
