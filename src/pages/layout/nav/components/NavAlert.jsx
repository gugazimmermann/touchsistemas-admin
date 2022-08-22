export default function NavAlert({ alerts }) {
	return (
		<div className="flex items-center">
			{alerts ? (
				<div className="relative">
					<i className="bx bxs-bell text-3xl" />
					<span className="absolute -top-1 -right-3 py-0 px-1.5 text-white bg-secondary rounded-full text-xs">
						{alerts}
					</span>
				</div>
			) : (
				<i className="bx bx-bell text-3xl" />
			)}
		</div>
	);
}
