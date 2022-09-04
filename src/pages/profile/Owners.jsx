import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';
import { createOwner, deleteOwner, updateOwner } from '../../api/mutations';
import { normalizePhone, validateEmail } from '../../helpers/forms';
import { Title, Form, Table, ConfirmationDialog } from '../../components';

const initial = { name: '', phone: '', email: '' };

export default function Owners({ clientID, ownersList, setError, setErrorMsg, setLoading, loadClient }) {
	const { state } = useContext(AppContext);
	const [formOwner, setFormOwner] = useState(initial);
	const [selected, setSelected] = useState();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		if (!update && selected) setSelected(initial);
	}, [update]);

	function validadeForm(f) {
		if (!f.email || !f.name || !f.phone) {
			setErrorMsg(LANGUAGES[state.lang].profile.required);
			return false;
		}
		if (f.phone.length < 14) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidPhone);
			return false;
		}
		if (!validateEmail(f.email)) {
			setErrorMsg(LANGUAGES[state.lang].profile.requiredEmail);
			return false;
		}
		return true;
	}

	async function handleSubmit(u) {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!validadeForm(!u ? formOwner : selected)) {
			setError(true);
			setLoading(false);
			return null;
		}
		if (!u) await createOwner(formOwner, clientID);
		else await updateOwner(selected);
		setUpdate(false);
		loadClient(true);
		setFormOwner(initial);
		setLoading(false);
		return true;
	}

	async function handleDelete() {
		setLoading(true);
		await deleteOwner(selected.id);
		setConfirmDelete(false);
		loadClient(true);
		setLoading(false);
	}

	function renderForm() {
		return (
			<Form>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? formOwner.name : selected.name}
						onChange={(e) => {
							if (!update) setFormOwner({ ...formOwner, name: e.target.value });
							else setSelected({ ...selected, name: e.target.value });
						}}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.name} *`}
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={!update ? formOwner.phone : selected.phone}
						onChange={(e) => {
							if (!update) setFormOwner({ ...formOwner, phone: normalizePhone(e.target.value) });
							else setSelected({ ...selected, phone: normalizePhone(e.target.value) });
						}}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.phone} *`}
						className="form-control block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<input
						value={!update ? formOwner.email : selected.email}
						onChange={(e) => {
							if (!update) setFormOwner({ ...formOwner, email: e.target.value });
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
							if (!update) handleSubmit();
							else handleSubmit(true);
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
			</Form>
		);
	}

	function header() {
		return (
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
		);
	}

	function body() {
		return ownersList.map((o) => (
			<tr key={o.email}>
				<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 pl-2 text-left">
					{o.name}
				</td>
				<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
					{normalizePhone(o.phone, true)}
				</td>
				<td className="border-t text-sm border-gray-200 align-middle font-light whitespace-nowrap py-2 text-left">
					{o.email}
				</td>
				<td
					className="border-t border-gray-200 align-middle py-2 text-right cursor-pointer"
					onClick={() => {
						setSelected({ ...o, phone: normalizePhone(o.phone, true) });
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
		));
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
			{ownersList.length > 0 && <Table header={header()} body={body()} />}
			{renderDeleteDialog()}
		</>
	);
}
