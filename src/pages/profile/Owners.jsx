import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createOwner, updateOwner, deleteOwner } from '../../graphql/mutations';
import { normalizePhone, validateEmail } from '../../helpers';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const initial = { name: '', phone: '', email: '' };

export default function Owners({ clientID, ownersList, setError, setErrorMsg, setLoading, loadClient }) {
	const [owner, setOwner] = useState(initial);
	const [selected, setSelected] = useState();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		if (!update && selected) setSelected(initial);
	}, [update]);

	async function handleAdd() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!owner.email || !owner.name || !owner.phone) {
			setErrorMsg('Preencha todos os dados do Responsável!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (owner.phone.length < 15) {
			setErrorMsg('Telefone do Responsável inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (!validateEmail(owner.email)) {
			setErrorMsg('Email do Responsável inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		await API.graphql(
			graphqlOperation(createOwner, {
				input: {
					name: owner.name,
					phone: `+55 ${owner.phone}`,
					email: owner.email,
					clientID,
				},
			})
		);
		loadClient();
		setOwner(initial);
		setLoading(false);
		return true;
	}

	async function handleUpdate() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		await API.graphql(
			graphqlOperation(updateOwner, {
				input: {
					id: selected.id,
					name: selected.name,
					phone: selected.phone[0] !== '+' ? `+55 ${selected.phone}` : selected.phone,
					email: selected.email,
					clientID,
				},
			})
		);
		loadClient();
		setUpdate(false);
		setOwner(initial);
		setLoading(false);
	}

	async function handleDelete() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		await API.graphql(
			graphqlOperation(deleteOwner, {
				input: {
					id: selected.id,
				},
			})
		);
		setConfirmDelete(false);
		loadClient();
		setLoading(false);
	}

	function handleChangePhone(value) {
		if (!update) setOwner({ ...owner, phone: normalizePhone(value) });
		else setSelected({ ...selected, phone: normalizePhone(value) });
	}

	function renderForm() {
		return (
			<form className="flex flex-wrap mb-4">
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? owner?.name : selected?.name}
						onChange={(e) => {
							if (!update) setOwner({ ...owner, name: e.target.value });
							else setSelected({ ...selected, name: e.target.value });
						}}
						type="text"
						placeholder="Nome do Responsável"
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? owner?.phone : selected?.phone[0] === '+' ? selected?.phone.slice(4) : selected?.phone}
						onChange={(e) => handleChangePhone(e.target.value)}
						type="text"
						placeholder="Telefone"
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<input
						value={!update ? owner?.email : selected?.email}
						onChange={(e) => {
							if (!update) setOwner({ ...owner, email: e.target.value });
							else setSelected({ ...selected, email: e.target.value });
						}}
						type="email"
						color="orange"
						placeholder="Email"
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full flex justify-center">
					<button
						type="button"
						onClick={() => {
							if (!update) handleAdd();
							else handleUpdate();
						}}
						className={`${
							!update ? 'bg-primary' : 'bg-warning'
						} px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg transition duration-150 ease-in-out`}
					>
						{!update ? 'Adicionar' : 'Atualizar'} Responsável
					</button>
				</div>
			</form>
		);
	}

	function renderTable() {
		return (
			<div className="overflow-x-auto">
				<table className="items-center w-full bg-white shadow border-collapse mb-4">
					<thead>
						<tr>
							<th className="px-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								Nome do Responsável
							</th>
							<th className="px-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								Telefone
							</th>
							<th className="px-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								Email
							</th>
							<th
								colSpan={2}
								className="px-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left"
							/>
						</tr>
					</thead>
					<tbody>
						{ownersList.map((o) => (
							<tr key={o.email}>
								<td className="border-b text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
									{o.name}
								</td>
								<td className="border-b text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
									{o.phone.slice(4)}
								</td>
								<td className="border-b text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
									{o.email}
								</td>
								<td
									className="border-b border-gray-200 align-middle py-2 text-right cursor-pointer"
									onClick={() => {
										setSelected(o);
										setUpdate(!update);
									}}
								>
									{!update ? (
										<i className="bx bx-message-square-edit text-xl text-primary" />
									) : (
										<i className="bx bx-message-square-minus text-xl text-warning" />
									)}
								</td>
								<td
									className="border-b border-gray-200 align-middle py-2 text-right cursor-pointer"
									onClick={() => {
										setSelected(o);
										setConfirmDelete(true);
									}}
								>
									<i className="bx bx-message-square-x text-xl text-primary" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	function renderDeleteDialog() {
		return (
			<ConfirmationDialog
				open={confirmDelete}
				setOpen={setConfirmDelete}
				handleConfirm={handleDelete}
				cancelText="Cancelar"
				confirmText="Remover"
			>
				Deseja remover o responsável {selected?.name}?
			</ConfirmationDialog>
		);
	}

	return (
		<>
			<h3 className={`text-primary text-xl py-4 ${!update ? 'text-primary' : 'text-warning'}`}>
				{!update ? 'Adicionar' : 'Atualizar'} Responsável
			</h3>
			{renderForm()}
			{ownersList.length > 0 && renderTable()}
			{renderDeleteDialog()}
		</>
	);
}
