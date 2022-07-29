export default function Alert({ error }) {
	return (
		<div className={`text-danger my-2 text-center ${!error && 'hidden'}`}>
			<p>Ocorreu um erro, tente novamente.</p>
		</div>
	);
}
