export default function Grid({ children }) {
	return (
		<div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">{children}</div>
	);
}
