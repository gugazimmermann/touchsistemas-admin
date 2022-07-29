import { useOutletContext } from 'react-router-dom';

export default function Dashboard() {
	const [client] = useOutletContext();
	return <pre className="p-4 w-10">{JSON.stringify(client, undefined, 2)}</pre>;
}
