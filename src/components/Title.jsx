import { Link } from 'react-router-dom';

export default function Title({ text, color, back, onClick }) {
	return (
		<h2 className={`${!color ? 'text-primary' : color} font-bold text-xl mb-2`}>
			{back && (
				<Link to={back}>
					<i className="bx bx-left-arrow-circle mr-2" />
				</Link>
			)}
			{onClick && (
				<button type="button" onClick={onClick}>
					<i className="bx bx-minus-circle mr-2" />
				</button>
			)}
			{text}
		</h2>
	);
}
