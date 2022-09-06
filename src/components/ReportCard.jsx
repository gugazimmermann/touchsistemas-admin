import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import slugify from 'slugify';
import { AppContext } from '../context';
import { LANGUAGES, ROUTES } from '../constants';

export default function ReportCard({ id, name, visitors }) {
	const navigate = useNavigate();
	const { state } = useContext(AppContext);
	const [headers, setHeaders] = useState();
	const [data, setData] = useState();

	function createReport(v) {
		const resportHeaders = [
			{ label: LANGUAGES[state.lang].subscriptions.details.report.name, key: 'name' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.phone, key: 'phone' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.email, key: 'email' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.state, key: 'state' },
			{ label: LANGUAGES[state.lang].subscriptions.details.report.city, key: 'city' },
		];
		const resportData = [];
		v.forEach((vi) =>
			resportData.push({
				name: vi.name,
				phone: vi.phone,
				email: vi.email,
				state: vi.state,
				city: vi.city,
			})
		);
		setHeaders(resportHeaders);
		setData(resportData);
	}

	useEffect(() => {
		if (visitors?.length) createReport(visitors);
	});

	return (
		<div className="bg-white shadow-md rounded-lg sm:w-3/12 flex flex-col justify-around mb-4">
			<div
				role="presentation"
				onClick={() => navigate(`${ROUTES[state.lang].DASHBOARD}/${id}`)}
				className={`w-full p-1 flex flex-col justify-center items-center text-secondary ${
					visitors?.length && 'cursor-pointer'
				}`}
			>
				<i className="bx bxs-pie-chart-alt-2 text-9xl" />
				<h2 className="text-lg font-bold">{LANGUAGES[state.lang].subscriptions.details.dashboard.report}</h2>
			</div>
			{visitors && data && (
				<CSVLink
					data={data}
					headers={headers}
					filename={slugify(name, { lower: true })}
					className="px-2 py-1 mx-8 my-2 bg-secondary text-white rounded-lg shadow-md text-center font-bold"
				>
					<i className="bx bxs-download" /> {LANGUAGES[state.lang].subscriptions.details.dashboard.export}
				</CSVLink>
			)}
		</div>
	);
}
