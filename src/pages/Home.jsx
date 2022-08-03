import { useCookies } from 'react-cookie';

export default function App() {
	const [cookies, setCookie] = useCookies(['name']);
	function onChange(newName) {
		setCookie('name', newName, { path: '/' });
	}

	return (
		<div>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<input name={cookies.name} onChange={(e) => onChange(e.target.value)} />
			{cookies.name && <h1>Hello {cookies.name}!</h1>}
			<i className="bx bx-search-alt-2" />
			<button type='button'>Button</button>
		</div>
	);
}
