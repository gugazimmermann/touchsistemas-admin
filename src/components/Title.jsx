import { Link } from 'react-router-dom';

export default function Title({ text, color, back }) {
	return (
		<h2 className={`${!color ? 'text-primary' : color} font-bold text-xl mb-2`}>
			{back && (
				<Link to={back}>
					<i className="bx bx-left-arrow-circle mr-2" />
				</Link>
			)}
			{text}
		</h2>
	);
}
