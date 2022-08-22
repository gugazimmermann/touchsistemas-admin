export default function NavInfo({ alerts }) {
	return (
		<div className="flex items-center">
			{alerts ? (
				<div className="relative">
					<i className="bx bxs-message-rounded-error text-3xl" />
					<span className="absolute -top-1 -right-3 py-0 px-1.5 text-white bg-warning rounded-full text-xs">
						{alerts}
					</span>
				</div>
			) : (
				<i className="bx bx-message-rounded-check text-3xl" />
			)}
		</div>
	);
}
