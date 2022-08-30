import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { updateClient } from '../../graphql/mutations';
import { AppContext } from '../../context';
import { LANGUAGES, ROUTES } from '../../constants';
import {
	delay,
	getAddressFromCEP,
	normalizeCEP,
	normalizeDocument,
	normalizePhone,
	normalizePhoneToShow,
} from '../../helpers';
import { Loading, Alert, Title } from '../../components';
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

	async function handleUpdate() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (
			!formClient.name ||
			!formClient.phone ||
			!formClient.docType ||
			!formClient.document ||
			!formClient.zipCode ||
			!formClient.city ||
			!formClient.state ||
			!formClient.street
		) {
			setErrorMsg(LANGUAGES[state.lang].profile.required);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formClient.phone.length < 15) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidPhone);
			setError(true);
			setLoading(false);
			return null;
		}
		if (formClient.zipCode.length < 10) {
			setErrorMsg(LANGUAGES[state.lang].profile.invalidZipCode);
			setError(true);
			setLoading(false);
			return null;
		}
		if (
			(formClient.docType === 'CPF' && formClient.document.length < 14) ||
			(formClient.docType === 'CNPJ' && formClient.document.length < 18)
		) {
			setErrorMsg(formClient.docType === 'CPF' ? 'CPF inválido!' : 'CNPJ inválido');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formClient.website) {
			if (formClient.website.charAt(0).toLocaleLowerCase !== 'h') formClient.website = `http://${formClient.website}`;
		}
		await API.graphql(
			graphqlOperation(updateClient, {
				input: {
					id: client.id,
					name: formClient.name,
					phone: `+55${formClient.phone.replace(/[^\d]/g, '')}`,
					doctype: formClient.docType,
					document: formClient.document.replace(/[^\d]/g, ''),
					website: formClient.website,
					zipCode: formClient.zipCode.replace(/[^\d]/g, ''),
					city: formClient.city,
					state: formClient.state,
					street: formClient.street,
					number: formClient.number,
					complement: formClient.complement,
				},
			})
		);
		if (clientLogo) {
			await Storage.put(`logo/${client.id}.${clientLogo.name.split('.').pop()}`, clientLogo, {
				contentType: clientLogo.type,
			});
		}
		await delay(3000);
		loadClient();
		navigate(ROUTES[state.lang].DASHBOARD);
		setLoading(false);
		return true;
	}

	function handleChangePhone(value) {
		setFormClient({ ...formClient, phone: normalizePhone(value) });
	}

	function handleChangeCEP(value) {
		setFormClient({ ...formClient, zipCode: normalizeCEP(value) });
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

	useEffect(() => {
		if (formClient?.zipCode?.length === 10) getAddress();
	}, [formClient.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
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

	function handleChangeDocument(value) {
		setFormClient({ ...formClient, document: normalizeDocument(formClient.docType, value) });
	}

	return (
		<>
			{loading && <Loading />}
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
						onChange={(e) => handleChangePhone(e.target.value)}
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
						onChange={(e) => handleChangeDocument(e.target.value)}
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
						onChange={(e) => handleChangeCEP(e.target.value)}
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
						onChange={(e) => handleFile(e)}
						type="file"
						placeholder={LANGUAGES[state.lang].profile.logo}
						accept=".jpg,.jpeg,.png,image/png,image/jpeg"
						className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
					/>
				</div>
				<div className="w-full flex justify-center">
					<button
						type="button"
						onClick={() => handleUpdate()}
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
