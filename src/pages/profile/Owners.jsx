import { useEffect, useState, useContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createOwner, updateOwner, deleteOwner } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';
import { normalizePhone, validateEmail } from '../../helpers';
import { Title, ConfirmationDialog } from '../../components';

const initial = { name: '', phone: '', email: '' };

export default function Owners({ clientID, ownersList, setError, setErrorMsg, setLoading, loadClient }) {
	const { state } = useContext(AppContext);
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
			setErrorMsg(LANGUAGES[state.lang].profile.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (owner.phone.length < 14) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidPhone);
			setError(true);
			setLoading(false);
			return null;
		}
		if (!validateEmail(owner.email)) {
			setErrorMsg(LANGUAGES[state.lang].profile.requiredEmail);
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
					ClientID: clientID,
				},
			})
		);
		loadClient(true);
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
					ClientID: clientID,
				},
			})
		);
		loadClient(true);
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
		loadClient(true);
		setLoading(false);
	}

	function handleChangePhone(value) {
		if (!update) setOwner({ ...owner, phone: normalizePhone(value) });
		else setSelected({ ...selected, phone: normalizePhone(value) });
	}

	function renderForm() {
		return (
			<form className="flex flex-wrap bg-white p-4 mb-4 rounded-md shadow-md">
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? owner?.name : selected?.name}
						onChange={(e) => {
							if (!update) setOwner({ ...owner, name: e.target.value });
							else setSelected({ ...selected, name: e.target.value });
						}}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.name} *`}
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? owner?.phone : selected?.phone[0] === '+' ? selected?.phone.slice(4) : selected?.phone}
						onChange={(e) => handleChangePhone(e.target.value)}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.phone} *`}
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
						placeholder={`${LANGUAGES[state.lang].profile.email} *`}
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
						} px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out`}
					>
						{`${!update ? LANGUAGES[state.lang].profile.addOwner : LANGUAGES[state.lang].profile.updateOwner} ${
							LANGUAGES[state.lang].profile.owner
						}`}
					</button>
				</div>
			</form>
		);
	}

	function renderTable() {
		return (
			<div className="overflow-x-auto">
				<table className="items-center w-full rounded-md bg-white shadow border-collapse mb-4">
					<thead>
						<tr>
							<th className="p-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								{LANGUAGES[state.lang].profile.name}
							</th>
							<th className="p-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								{LANGUAGES[state.lang].profile.phone}
							</th>
							<th className="p-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left">
								{LANGUAGES[state.lang].profile.email}
							</th>
							<th
								colSpan={2}
								className="p-2 text-sm font-normal text-secondary border-b border-solid border-secondary whitespace-nowrap text-left"
							/>
						</tr>
					</thead>
					<tbody>
						{ownersList.map((o) => (
							<tr key={o.email}>
								<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 pl-2 text-left">
									{o.name}
								</td>
								<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
									{o.phone.slice(4)}
								</td>
								<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
									{o.email}
								</td>
								<td
									className="border-t border-gray-200 align-middle py-2 text-right cursor-pointer"
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
									className="border-t border-gray-200 align-middle py-2 pr-2 text-right cursor-pointer"
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
			<Title
				text={`${!update ? LANGUAGES[state.lang].profile.addOwner : LANGUAGES[state.lang].profile.updateOwner} ${
					LANGUAGES[state.lang].profile.owner
				}`}
				color={update && 'text-warning'}
			/>
			{renderForm()}
			{ownersList.length > 0 && renderTable()}
			{renderDeleteDialog()}
		</>
	);
}
