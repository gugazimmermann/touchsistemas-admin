export default function Loading() {
	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-90 overflow-y-auto h-full w-full z-50">
			<div className="flex flex-col justify-center items-center h-full w-full">
				<div className="mb-4 text-primary text-2xl font-bold" data-testid="loading">
					Aguarde...
				</div>
				<div className="animate-spin rounded-full h-32 w-32 border-b-8 border-primary" />
			</div>
		</div>
	);
}
