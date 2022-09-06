export default function SurveysCard({ title, value, color, icon }) {
	return (
		<div className="my-4">
			<div className="relative bg-white py-2 px-4 rounded-lg shadow-md">
				<div
					className={`text-white flex sm:hidden md:flex items-center absolute rounded-full shadow-md text-3xl p-2 right-4 -top-4 ${color}`}
				>
					{icon}
				</div>
				<div>
					<p className="text-lg font-bold">{title}</p>
					<div className="border-t-2 mb-2" />
					<div className="flex justify-between">
						<div className="w-full text-center">
							<p>Total</p>
						</div>
						<div className="w-full flex justify-center items-end">
							<p>{value || 0}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
