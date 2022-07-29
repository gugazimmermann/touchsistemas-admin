export default function Loading() {
	return (
		<div className="fixed inset-0 bg-grey-800 bg-opacity-50 overflow-y-auto h-full w-full">
			<div className="flex flex-col justify-center items-center h-full w-full z-50">
				<div className="mb-4 text-white text-2xl font-bold">Carregando...</div>
				<div className="animate-spin rounded-full h-32 w-32 border-b-8 border-white" />
			</div>
		</div>
	);
}
