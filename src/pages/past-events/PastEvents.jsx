import moment from 'moment';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function PastEvents() {
	const navigate = useNavigate();
	const [client] = useOutletContext();

	function handleEvent(id) {
		navigate(`/evento/${id}`);
	}

	return (
		<>
			<h2 className="text-primary text-xl p-2 mt-4">Eventos Passados</h2>
			<div className="overflow-x-auto">
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Nome
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Localização
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Data
							</th>
						</tr>
					</thead>
					{client && client.Events && client.Events?.items.length > 0 && (
						<tbody>
							{client.Events.items.map((event) => (
								<tr key={event.id} onClick={() => handleEvent(event.id)} className="cursor-pointer hover:bg-gray-100">
									<th className="border-b border-gray-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{event.name}
									</th>
									<th className="border-b border-gray-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{`${event.city} / ${event.state}`}
									</th>
									<th className="border-b border-gray-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
										{event.dates.map((d) => `${moment(d).format('DD/MM/YYYY')}`).join(', ').slice(0, -2)}
									</th>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</>
	);
}
