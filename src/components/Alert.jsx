export default function Alert({ type, children }) {
	const seeType = (t) => {
		if (t === 'danger') return 'bg-red-100 border border-red-300 text-red-500';
		if (t === 'warning') return 'bg-amber-100 border border-amber-300 text-amber-500';
		if (t === 'info') return 'bg-sky-100 border border-sky-300 text-sky-500';
		if (t === 'success') return 'bg-emerald-100 border border-emerald-300 text-emerald-500';
		return 'bg-amber-100 text-amber-700';
	};
	return (
		<div className={`${seeType(type)} mb-2 rounded-lg py-3 px-4 flex items-center shadow font-bold`} role="alert">
			<i className="bx bxs-error-circle text-2xl pr-2" />
			{children}
		</div>
	);
}
