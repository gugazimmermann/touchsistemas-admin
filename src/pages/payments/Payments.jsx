export default function Payments() {
	const titulos = ['Evento', 'Plano', 'Valor', 'Status'];
	const conteudo = [
		{
			evento: 'Argon Design System',
			plano: 'Pró',
			valor: '750,00',
			status: 'aguardando',
		},
		{
			evento: 'Black Dashboard Sketch',
			plano: 'Avançado',
			valor: '500,00',
			status: 'aprovado',
		},
		{
			evento: 'NodeJS Rulez Pw0ned',
			plano: 'Avançado',
			valor: '350,00',
			status: 'Básico',
		},
		{
			evento: 'NodeJS Rulez Pw0ned',
			plano: 'Básico',
			valor: '350,00',
			status: 'falha',
		},
	];

	const statusRow = (tipo) => {
		if (tipo === 'aguardando') {
			return (
				<div className="flex flex-row items-center">
					<i className="bx bxs-hourglass text-primary text-lg mr-2" />
					<p>Aguardando</p>
				</div>
			);
		}
		if (tipo === 'falha') {
			return (
				<div className="flex flex-row items-center">
					<i className="bx bx-x-circle text-danger text-xl mr-2" />
					<p>Não Aprovado</p>
				</div>
			);
		}
		return (
			<div className="flex flex-row items-center">
				<i className="bx bx-check-circle text-secondary text-xl mr-2" />
				<p>Efetuado</p>
			</div>
		);
	};

	return (
		<>
			<h2 className="text-primary text-xl p-2">Pagamentos</h2>
			<div className="overflow-x-auto">
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>
							{titulos.map((t) => (
								<th
									key={t}
									className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left"
								>
									{t}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{conteudo.map((c) => (
							<tr key={`${c.evento}${c.status}`}>
								<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
									{c.evento}
								</th>
								<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
									{c.plano}
								</th>
								<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
									R$ {c.valor}
								</th>
								<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
									{statusRow(c.status)}
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<h2 className="text-primary text-xl p-2 mt-4">Cartão Cadastrado</h2>
			<div className="overflow-x-auto">
				<table className="items-center w-full bg-transparent border-collapse">
					<thead>
						<tr>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Nome
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Número
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Validade
							</th>
							<th className="px-2 text-primary border-b border-solid border-primary whitespace-nowrap text-left">
								Bandeira
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
								JOSE A Z NEGREIROS
							</th>
							<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
								1234 ... 5678
							</th>
							<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
								10/28
							</th>
							<th className="border-b border-grey-200 align-middle font-light whitespace-nowrap px-2 py-4 text-left">
								VISA
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
