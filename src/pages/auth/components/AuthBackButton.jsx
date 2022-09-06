import { Link } from 'react-router-dom';

export default function AuthBackButton({ text, to }) {
	return (
		<div className="w-full text-center mt-6">
			<Link to={to} className="text-xl text-primary hover:text-secondary duration-200 transition ease-in-out">
				{text}
			</Link>
		</div>
	);
}
