export default function Alert({ type, children }) {
	const seeType = (t) => {
		if (t === 'danger') return 'bg-red-100 text-red-700';
		if (t === 'warning') return 'bg-yellow-100 text-yellow-700';
		if (t === 'info') return 'bg-blue-100 text-blue-700';
		if (t === 'success') return 'bg-green-100 text-green-700';
		return 'bg-yellow-100 text-yellow-700';
	};
	return (
		<div className={`${seeType(type)} mx-4 my-4 rounded-lg py-5 px-6 text-base`} role="alert">
			{children}
		</div>
	);
}
