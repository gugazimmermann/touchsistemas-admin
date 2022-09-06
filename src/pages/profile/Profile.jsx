import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import { updateClient, updateClientLogoAndMap } from '../../api/mutations';
import { sendPublicFile } from '../../api/storage';
import { getAddressFromCEP, normalizeCEP, normalizeDocument, normalizePhone, validateFile } from '../../helpers/forms';
import { Loading, Alert, Title, Form, Uploading } from '../../components';
import { createMap } from '../../helpers/map';
import Owners from './Owners';

const initial = {
	name: '',
	phone: '',
	docType: '',
	document: '',
	email: '',
	website: '',
	zipCode: '',
	city: '',
	state: '',
	street: '',
	number: '',
	complement: '',
};

export default function Profile() {
	const navigate = useNavigate();
	const [loadClient] = useOutletContext();
	const { state } = useContext(AppContext);
	const { client } = state;
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState(initial);
	const [logo, setLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].profile.logo);
	const [progress, setProgress] = useState();

	async function getAddress() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(form.zipCode.replace(/\D/g, ''));
			setForm({
				...form,
				state: address.state,
				city: address.city,
				street: address.street,
			});
		} catch (err) {
			setErrorMsg(err.message);
			setError(true);
		}
		setLoading(false);
	}

	useEffect(() => {
		if (form?.zipCode?.length === 10) getAddress();
	}, [form.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		const file = validateFile(e.target.files);
		if (!file) return;
		if (typeof file === 'string' && file === 'imageSize') {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.imageSize);
			setError(true);
			return;
		}
		if (typeof file === 'string' && file === 'imageType') {
			setErrorMsg(LANGUAGES[state.lang].subscriptions.imageType);
			setError(true);
			return;
		}
		setFileName(file.name);
		setLogo(file);
		setErrorMsg('');
		setError(false);
	}

	function validadeForm(f) {
		if (!f.name || !f.phone || !f.docType || !f.document || !f.zipCode || !f.city || !f.state || !f.street) {
			setErrorMsg(LANGUAGES[state.lang].profile.required);
			return false;
		}
		if (f.phone.length < 14) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidPhone);
			return false;
		}
		if (f.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidZipCode);
			return false;
		}
		if ((f.docType === 'CPF' && f.document.length < 14) || (f.docType === 'CNPJ' && f.document.length < 18)) {
			setErrorMsg(f.docType === 'CPF' ? 'CPF inválido!' : 'CNPJ inválido');
			return false;
		}
		return true;
	}

	async function handleLogoAndMap() {
		let mapURL = client.map;
		let logoURL = client.logo;
		if (
			form.name !== client.name ||
			form.street !== client.street ||
			form.number !== client.number ||
			form.city !== client.city ||
			form.state !== client.state ||
			form.zipCode.replace(/[^\d]/g, '') !== client.zipCode
		) {
			const map = await createMap(
				'client',
				client.id,
				form.name,
				form.street,
				form.number,
				form.city,
				form.state,
				form.zipCode
			);
			await sendPublicFile('map', client.id, map, setProgress);
			mapURL = `${process.env.REACT_APP_IMAGES_URL}map/${map.name}?${Date.now()}`;
		}
		if (logo) {
			await sendPublicFile('logo', client.id, logo, setProgress);
			logoURL = logo
				? `${process.env.REACT_APP_IMAGES_URL}logo/${client.id}.${logo.name.split('.').pop()}?${Date.now()}`
				: null;
		}
		await updateClientLogoAndMap(client.id, logoURL, mapURL);
	}

	async function handleSubmit() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!validadeForm(form)) {
			setError(true);
			setLoading(false);
			return null;
		}
		await updateClient(client.id, form);
		await handleLogoAndMap();
		loadClient(true);
		setLoading(false);
		navigate(ROUTES[state.lang].DASHBOARD);
		return true;
	}

	function setClient(c) {
		setForm({
			name: c.name,
			phone: normalizePhone(c.phone, true),
			docType: c.doctype,
			document: normalizeDocument(c.doctype, c.document),
			email: c.email,
			website: c.website,
			zipCode: normalizeCEP(c.zipCode),
			city: c.city,
			state: c.state,
			street: c.street,
			number: c.number,
			complement: c.complement,
		});
	}

	useEffect(() => {
		if (client) setClient(client);
	}, [client]);

	return (
		<>
			{loading && <Loading />}
			{!!progress && <Uploading progress={progress} />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text={LANGUAGES[state.lang].profile.title} />
			<Form>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={form.name || ''}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.name} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 sm:pr-4 mb-4">
					<input
						value={form.phone || ''}
						onChange={(e) => setForm({ ...form, phone: normalizePhone(e.target.value) })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.phone} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-2/12 sm:pr-4 mb-4">
					<select
						value={form.docType || ''}
						onChange={(e) => setForm({ ...form, docType: e.target.value })}
						placeholder={LANGUAGES[state.lang].profile.docType}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{LANGUAGES[state.lang].profile.docType} *</option>
						<option value="CPF">CPF</option>
						<option value="CNPJ">CNPJ</option>
					</select>
				</div>
				<div className="w-full md:w-3/12 mb-4">
					<input
						value={form.document || ''}
						onChange={(e) => setForm({ ...form, document: normalizeDocument(form.docType, e.target.value) })}
						type="text"
						placeholder={form.docType || LANGUAGES[state.lang].profile.selectDoc}
						disabled={!form.docType}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<input
						value={form.email || ''}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.email}
						disabled
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 mb-4">
					<input
						value={form.website || ''}
						onChange={(e) => setForm({ ...form, website: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.website}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={form.zipCode || ''}
						onChange={(e) => setForm({ ...form, zipCode: normalizeCEP(e.target.value) })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.zipCode} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={form.city || ''}
						onChange={(e) => setForm({ ...form, city: e.target.value })}
						type="text"
						placeholder={`${LANGUAGES[state.lang].profile.city} *`}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<select
						value={form.state || ''}
						onChange={(e) => setForm({ ...form, state: e.target.value })}
						placeholder={LANGUAGES[state.lang].profile.state}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{LANGUAGES[state.lang].profile.state} *</option>
						<option value="AC">Acre</option>
						<option value="AL">Alagoas</option>
						<option value="AP">Amapá</option>
						<option value="AM">Amazonas</option>
						<option value="BA">Bahia</option>
						<option value="CE">Ceará</option>
						<option value="DF">Distrito Federal</option>
						<option value="ES">Espírito Santo</option>
						<option value="GO">Goiás</option>
						<option value="MA">Maranhão</option>
						<option value="MT">Mato Grosso</option>
						<option value="MS">Mato Grosso do Sul</option>
						<option value="MG">Minas Gerais</option>
						<option value="PA">Pará</option>
						<option value="PB">Paraíba</option>
						<option value="PR">Paraná</option>
						<option value="PE">Pernambuco</option>
						<option value="PI">Piauí</option>
						<option value="RJ">Rio de Janeiro</option>
						<option value="RN">Rio Grande do Norte</option>
						<option value="RS">Rio Grande do Sul</option>
						<option value="RO">Rondônia</option>
						<option value="RR">Roraima</option>
						<option value="SC">Santa Catarina</option>
						<option value="SP">São Paulo</option>
						<option value="SE">Sergipe</option>
						<option value="TO">Tocantins</option>
					</select>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<input
						value={form.street || ''}
						onChange={(e) => setForm({ ...form, street: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.street}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 sm:pr-4 mb-4">
					<input
						value={form.number || ''}
						onChange={(e) => setForm({ ...form, number: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.number}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 mb-4">
					<input
						value={form.complement || ''}
						onChange={(e) => setForm({ ...form, complement: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.complement}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full mb-4">
					<input
						type="file"
						id="files"
						className="hidden"
						onChange={(e) => handleFile(e)}
						accept=".jpg,.jpeg,.png,image/png,image/jpeg"
					/>
					<label
						htmlFor="files"
						className="relative file:hidden bg-white block w-full px-4 py-2 border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<i className="bx bx-file-find text-2xl absolute top-1 right-1" />
						{fileName}
					</label>
				</div>
				<div className="w-full flex justify-center">
					<button
						type="button"
						onClick={() => handleSubmit()}
						className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-md focus:bg-secondary focus:shadow-md focus:outline-none focus:ring-0 active:bg-secondary active:shadow-md transition duration-150 ease-in-out"
					>
						{LANGUAGES[state.lang].profile.update}
					</button>
				</div>
			</Form>
			{client && (
				<Owners
					clientID={client.id}
					ownersList={client.Owners.items}
					setError={setError}
					setErrorMsg={setErrorMsg}
					setLoading={setLoading}
					loadClient={loadClient}
				/>
			)}
		</>
	);
}
