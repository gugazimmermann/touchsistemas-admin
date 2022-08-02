import { Alert as MaterialAlert } from '@material-tailwind/react';

export default function Alert({ type, children }) {
	const seeType = (t) => {
		if (t === 'danger') return 'red';
		if (t === 'warning') return 'orange';
		if (t === 'info') return 'blue';
    if (t === 'success') return 'green';
		return 'green';
	};
	return (
		<div className="mx-4 my-4">
			<MaterialAlert color={seeType(type)}>{children}</MaterialAlert>
		</div>
	);
}
