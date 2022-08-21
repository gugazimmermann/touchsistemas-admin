import { useEffect, useState } from 'react';
import moment from 'moment';
import { useOutletContext } from 'react-router-dom';
import { Title } from '../../../components';
import { orderEventsByLastDay } from '../../../helpers';

export default function Payments() {
	const [client] = useOutletContext();
	const [payments, setPayments] = useState();
	const [cardOwner, setCardOwner] = useState();

	const titulos = ['Evento', 'Plano', 'Data', 'Valor', 'Status'];

	const planName = (plan) => {
		if (plan === 'Básico') return 'Básico';
		if (plan === 'Avançado') return 'Avançado';
		return 'Pró';
	};

	const planValue = (plan) => {
		if (plan === 'Básico') return '500,00';
		if (plan === 'Avançado') return '800,00';
		return '1.500,00';
	};

	const statusRow = (tipo) => {
		if (tipo === 'aguardando') return <i className="bx bxs-hourglass text-primary text-lg mr-2" />;
		if (tipo === 'falha') return <i className="bx bx-x-circle text-danger text-xl mr-2" />;
		return <i className="bx bx-check-circle text-secondary text-xl mr-2" />;
	};

	useEffect(() => {
		if (client) {
			setCardOwner(client.Owners.items[0].name);
			const orderEvents = orderEventsByLastDay(client.Events.items, 'DESC');
			const eventsPayments = [];
			orderEvents.forEach((event) => {
				eventsPayments.push({
					evento: event.name,
					plano: planName(event.plan),
					data: moment(event.lastDay).add(1, 'day').format('DD/MM/YY'),
					valor: planValue(event.plan),
					status: 'paid',
				});
			});
			setPayments(eventsPayments);
		}
	}, [client]);

	function renderPayments() {
		return (
			<>
				<Title text="Pagamentos" />
				<div className="overflow-x-auto">
					<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
						<thead>
							<tr>
								{titulos.map((t) => (
									<th
										key={t}
										className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal"
									>
										{t}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{payments &&
								payments.map((c) => (
									<tr key={`${c.evento}${c.status}`}>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.evento}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.plano}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.data}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											R$ {c.valor}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{statusRow(c.status)}
										</th>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</>
		);
	}

	function renderCard() {
		return (
			<>
				<Title text="Cartão Cadastrado" />
				<div className="overflow-x-auto">
					<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
						<thead>
							<tr>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
									Nome
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
									Número
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
									Validade
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
									Bandeira
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
									{cardOwner}
								</th>
								<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
									1234 ... 5678
								</th>
								<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
									10/28
								</th>
								<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
									VISA
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	}

	return (
		<>
			{payments && renderPayments()}
			{cardOwner && renderCard()}
		</>
	);
}
