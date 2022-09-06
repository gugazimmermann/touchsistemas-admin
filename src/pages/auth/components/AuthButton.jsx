export default function AuthButton({ text, disabled, handler }) {
	return (
		<button
			type="button"
			onClick={handler}
			disabled={disabled}
			className={`${
				disabled
					? 'bg-gray-600 cursor-not-allowed'
					: 'bg-primary cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md'
			} inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
		>
			{text}
		</button>
	);
}
