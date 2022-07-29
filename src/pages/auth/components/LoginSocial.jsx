export default function LoginSocial() {
	return (
		<>
			<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
				<p className="text-center font-semibold mx-4 mb-0">OU</p>
			</div>
			<a
				className="px-7 py-1 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
				href="#!"
				role="button"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
			>
				<i className="bx bxl-google text-2xl mr-2" />
				Continue com Gmail
			</a>
			<a
				className="px-7 py-1 bg-blue-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
				href="#!"
				role="button"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
			>
				<i className="bx bxl-facebook-circle text-2xl mr-2" />
				Continue com Facebook
			</a>
			<a
				className="px-7 py-1 bg-blue-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
				href="#!"
				role="button"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light"
			>
				<i className="bx bxl-twitter text-2xl mr-2" />
				Continue com Twitter
			</a>
		</>
	);
}
