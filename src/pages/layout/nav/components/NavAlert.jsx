import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../context';
import { ROUTES } from '../../../../constants';

export default function NavAlert({ alerts }) {
	const { state } = useContext(AppContext);
	
	return (
		<Link to={ROUTES[state.lang].ALERTS} className="flex items-center">
			{alerts ? (
				<div className="relative">
					<i className="bx bxs-bell text-3xl" />
					<span className="absolute -top-1 -right-3 py-0 px-1.5 text-white bg-danger rounded-full text-xs">
						{alerts}
					</span>
				</div>
			) : (
				<i className="bx bx-bell text-3xl" />
			)}
		</Link>
	);
}
