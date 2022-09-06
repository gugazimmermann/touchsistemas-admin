export default function Input({ type, placeholder, value, handler }) {
	return (
		<input
			type={type}
			value={value}
			onChange={(e) => handler(e.target.value)}
			className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
			placeholder={placeholder}
		/>
	);
}
