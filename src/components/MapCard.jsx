export default function MapCard({ map }) {
	return (
		<a href={map} target="_blank" className="flex flex-col justify-between shadow-md rounded-lg" rel="noreferrer">
			<div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
				<img alt="map" src={map} className="w-full h-full object-center object-cover" />
			</div>
			<h3 className="p-4 text-center">Localização</h3>
		</a>
	);
}
