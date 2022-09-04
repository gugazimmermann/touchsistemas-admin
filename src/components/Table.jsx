export default function Table({ header, body }) {
	return (
		<div className="overflow-x-auto">
			<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
				<thead>{header}</thead>
				<tbody>{body}</tbody>
			</table>
		</div>
	);
}
