import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useOutletContext } from 'react-router-dom';
import { AppContext } from '../../../context';
import { LANGUAGES } from '../../../constants';
import { Title } from '../../../components';
import { orderEventsByLastDay, plansValues, translatePlan } from '../../../helpers';

export default function Payments() {
	const { state } = useContext(AppContext);
	const [client] = useOutletContext();
	const [payments, setPayments] = useState();
	const [cardOwner, setCardOwner] = useState();

	const titles = [
		LANGUAGES[state.lang].payments.name,
		LANGUAGES[state.lang].payments.plan,
		LANGUAGES[state.lang].payments.date,
		LANGUAGES[state.lang].payments.value,
		LANGUAGES[state.lang].payments.status,
	];

	const statusRow = (tipo) => {
		if (tipo === 'waiting') return <i className="bx bxs-hourglass text-primary text-lg mr-2" />;
		if (tipo === 'failure') return <i className="bx bx-x-circle text-danger text-xl mr-2" />;
		return <i className="bx bx-check-circle text-secondary text-xl mr-2" />;
	};

	useEffect(() => {
		if (client) {
			setCardOwner(client.Owners.items[0].name);
			const orderEvents = orderEventsByLastDay(client.Events.items, 'DESC');
			const eventsPayments = [];
			orderEvents.forEach((event) => {
				eventsPayments.push({
					name: event.name,
					plan: translatePlan(event.plan),
					date: event.dates.map((d) => moment(d, 'YYYY-MM-DD').format('DD/MM/YYYY')).join(', '),
					value: plansValues(event.plan),
					status: moment(event.lastDay, 'YYYY-MM-DD').unix() > moment().unix() ? 'waiting' : 'paid',
				});
			});
			setPayments(eventsPayments);
		}
	}, [client]);

	function renderPayments() {
		return (
			<>
				<Title text={LANGUAGES[state.lang].payments.title} />
				<div className="overflow-x-auto">
					<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
						<thead>
							<tr>
								{titles.map((t) => (
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
									<tr key={`${c.name}${c.status}`}>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.name}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.plan}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											{c.date}
										</th>
										<th className="border-t border-gray-200 align-middle text-sm font-light whitespace-nowrap px-2 py-4 text-left">
											R$ {c.value}
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
				<Title text={LANGUAGES[state.lang].payments.creditCards} />
				<div className="overflow-x-auto">
					<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
						<thead>
							<tr>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
								{LANGUAGES[state.lang].payments.name}
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
								{LANGUAGES[state.lang].payments.number}
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
								{LANGUAGES[state.lang].payments.valid}
								</th>
								<th className="p-2 text-secondary border-b border-solid border-secondary whitespace-nowrap text-left  text-sm font-normal">
								{LANGUAGES[state.lang].payments.flag}
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
