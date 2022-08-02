import { useEffect, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { API, graphqlOperation } from 'aws-amplify';
import { createOwner, updateOwner, deleteOwner } from '../../graphql/mutations';
import { normalizePhone, validateEmail } from '../../helpers';
import Dialog from '../../components/Dialog';

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
		setUpdate(false)
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
			<form className="flex flex-wrap mx-4">
				<div className="w-full md:w-4/12 pr-4 mb-4">
					<Input
						value={!update ? owner?.name : selected?.name}
						onChange={(e) => {
							if (!update) setOwner({ ...owner, name: e.target.value });
							else setSelected({ ...selected, name: e.target.value });
						}}
						type="text"
						color="orange"
						variant="standard"
						label="Nome do Responsável"
					/>
				</div>
				<div className="w-full md:w-4/12 pr-4 mb-4">
					<Input
						value={!update ? owner?.phone : selected?.phone[0] === '+' ? selected?.phone.slice(4) : selected?.phone}
						onChange={(e) => handleChangePhone(e.target.value)}
						type="text"
						color="orange"
						variant="standard"
						label="Telefone"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<Input
						value={!update ? owner?.email : selected?.email}
						onChange={(e) => {
							if (!update) setOwner({ ...owner, email: e.target.value });
							else setSelected({ ...selected, email: e.target.value });
						}}
						type="email"
						color="orange"
						variant="standard"
						label="Email"
					/>
				</div>
				<div className="w-full flex justify-center">
					<Button
						size="sm"
						onClick={() => {
							if (!update) handleAdd();
							else handleUpdate();
						}}
						className={!update ? 'bg-primary' : 'bg-warning'}
					>
						{!update ? 'Adicionar' : 'Atualizar'} Responsável
					</Button>
				</div>
			</form>
		);
	}

	function renderTable() {
		return (
			<div className="overflow-x-auto p-4">
				<table className="items-center w-full bg-transparent border-collapse">
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
			<Dialog
				open={confirmDelete}
				setOpen={setConfirmDelete}
				handleConfirm={handleDelete}
				title="Remover Responsável"
				cancelText="Cancelar"
				confirmText="Remover"
			>
				Deseja remover o responsável {selected?.name}?
			</Dialog>
		);
	}

	return (
		<>
			<h3 className={`text-primary text-xl p-2 ${!update ? 'text-primary' : 'text-warning'}`}>
				{!update ? 'Adicionar' : 'Atualizar'} Responsável
			</h3>
			{renderForm()}
			{ownersList.length > 0 && renderTable()}
			{renderDeleteDialog()}
		</>
	);
}