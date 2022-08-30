export default function Alert({ error, type, text }) {
	return (
		<div className={`${!type ? 'text-danger' : 'text-secondary'} my-2 text-center ${!error && 'hidden'}`}>
			<p>{text || 'Ocorreu um erro, tente novamente.'}</p>
		</div>
	);
}
