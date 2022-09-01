import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { updateClient } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import {
	getAddressFromCEP,
	normalizeCEP,
	normalizeDocument,
	normalizePhone,
	normalizePhoneToShow,
} from '../../helpers';
import { Loading, Alert, Title, Uploading } from '../../components';
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
	const { state } = useContext(AppContext);
	const { client } = state;
	const navigate = useNavigate();
	const [loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [formClient, setFormClient] = useState(initial);
	const [clientLogo, setClientLogo] = useState();
	const [fileName, setFileName] = useState(LANGUAGES[state.lang].profile.logo);
	const [progress, setProgress] = useState();

	function normalizeWebsite(w) {
		if (w.charAt(0).toLocaleLowerCase() !== 'h') w = `http://${w}`;
		if (w.charAt(w.length - 1) === '/') w = w.slice(0, -1);
		return w;
	}

	async function handleUpdateClient(c) {
		await API.graphql(
			graphqlOperation(updateClient, {
				input: {
					id: client.id,
					name: c.name,
					phone: `+55${c.phone.replace(/[^\d]/g, '')}`,
					doctype: c.docType,
					document: c.document.replace(/[^\d]/g, ''),
					website: normalizeWebsite(c.website),
					zipCode: c.zipCode.replace(/[^\d]/g, ''),
					city: c.city,
					state: c.state,
					street: c.street,
					number: c.number,
					complement: c.complement,
				},
			})
		);
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

	async function sendLogo(id, logo) {
		setProgress(0);
		await Storage.put(`logo/${id}.${logo.name.split('.').pop()}`, logo, {
			contentType: logo.type,
			progressCallback(p) {
				setProgress(parseInt((p.loaded / p.total) * 100, 10));
			},
		});
		setProgress(0);
	}

	async function handleSubmit() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!validadeForm(formClient)) {
			setError(true);
			setLoading(false);
			return null;
		}
		await handleUpdateClient(formClient);
		if (clientLogo) await sendLogo(client.id, clientLogo);
		loadClient(true);
		setLoading(false);
		navigate(ROUTES[state.lang].DASHBOARD);
		return true;
	}

	async function getAddress() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(formClient.zipCode.replace(/\D/g, ''));
			setFormClient({
				...formClient,
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

	function validateFile(e) {
		setErrorMsg('');
		setError(false);
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			setFileName(file.name);
			if (file.size > 2 * 1024 * 1024) {
				setErrorMsg(LANGUAGES[state.lang].profile.imageSize);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedTypes = ['image/png', 'image/jpeg'];
			if (!acceptedTypes.includes(file.type)) {
				setErrorMsg(LANGUAGES[state.lang].profile.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedExtensions = ['jpg', 'jpeg', 'png'];
			if (!acceptedExtensions.includes(file.name.split('.').pop())) {
				setErrorMsg(LANGUAGES[state.lang].profile.imageType);
				setError(true);
				setLoading(false);
				return null;
			}
			setErrorMsg('');
			setError(false);
			setLoading(false);
			setClientLogo(file);
		}
		setErrorMsg('');
		setError(false);
		setLoading(false);
		return null;
	}

	useEffect(() => {
		if (client) {
			setFormClient({
				name: client.name,
				phone: normalizePhoneToShow(client.phone),
				docType: client.doctype,
				document: normalizeDocument(client.doctype, client.document),
				email: client.email,
				website: client.website,
				zipCode: normalizeCEP(client.zipCode),
				city: client.city,
				state: client.state,
				street: client.street,
				number: client.number,
				complement: client.complement,
			});
		}
	}, [client]);

	useEffect(() => {
		if (formClient?.zipCode?.length === 10) getAddress();
	}, [formClient.zipCode]);

	return (
		<>
			{loading && <Loading />}
			{!!progress && <Uploading progress={progress} />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text={LANGUAGES[state.lang].profile.title} />
			<form className="flex flex-wrap bg-white p-4 mb-4 rounded-md shadow-md">
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formClient.name || ''}
						onChange={(e) => setFormClient({ ...formClient, name: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.name}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 sm:pr-4 mb-4">
					<input
						value={formClient.phone || ''}
						onChange={(e) => setFormClient({ ...formClient, phone: normalizePhone(e.target.value) })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.phone}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-2/12 sm:pr-4 mb-4">
					<select
						value={formClient.docType || ''}
						onChange={(e) => setFormClient({ ...formClient, docType: e.target.value })}
						placeholder={LANGUAGES[state.lang].profile.docType}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">Selecione</option>
						<option value="CPF">CPF</option>
						<option value="CNPJ">CNPJ</option>
					</select>
				</div>
				<div className="w-full md:w-3/12 mb-4">
					<input
						value={formClient.document || ''}
						onChange={(e) =>
							setFormClient({ ...formClient, document: normalizeDocument(formClient.docType, e.target.value) })
						}
						type="text"
						placeholder={formClient.docType || LANGUAGES[state.lang].profile.selectDoc}
						disabled={!formClient.docType}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 sm:pr-4 mb-4">
					<input
						value={formClient.email || ''}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.email}
						disabled
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-6/12 mb-4">
					<input
						value={formClient.website || ''}
						onChange={(e) => setFormClient({ ...formClient, website: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.website}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formClient.zipCode || ''}
						onChange={(e) => setFormClient({ ...formClient, zipCode: normalizeCEP(e.target.value) })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.zipCode}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 sm:pr-4 mb-4">
					<input
						value={formClient.city || ''}
						onChange={(e) => setFormClient({ ...formClient, city: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.city}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-4/12 mb-4">
					<select
						value={formClient.state || ''}
						onChange={(e) => setFormClient({ ...formClient, state: e.target.value })}
						placeholder={LANGUAGES[state.lang].profile.state}
						className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					>
						<option value="">{LANGUAGES[state.lang].profile.select}</option>
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
						value={formClient.street || ''}
						onChange={(e) => setFormClient({ ...formClient, street: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.street}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 sm:pr-4 mb-4">
					<input
						value={formClient.number || ''}
						onChange={(e) => setFormClient({ ...formClient, number: e.target.value })}
						type="text"
						placeholder={LANGUAGES[state.lang].profile.number}
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full md:w-3/12 mb-4">
					<input
						value={formClient.complement || ''}
						onChange={(e) => setFormClient({ ...formClient, complement: e.target.value })}
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
						onChange={(e) => validateFile(e)}
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
			</form>
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
