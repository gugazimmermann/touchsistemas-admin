import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { partnersByReferralCode } from '../../graphql/queries';
import { createEvent } from '../../graphql/mutations';
import { Loading, Alert, Title } from '../../components';
import { getAddressFromCEP, normalizeCEP, validateEmail } from '../../helpers';

const initial = {
	name: '',
	website: '',
	email: '',
	zipCode: '',
	state: '',
	city: '',
	street: '',
	number: '',
	complement: '',
  plan: '',
  referralCode: '',
  logo: ''
};

export default function SubscriptionsForm() {
	const navigate = useNavigate();
	const [client, loadClient] = useOutletContext();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState();
	const [loading, setLoading] = useState(false);
	const [formSubscription, setFormSubscription] = useState(initial);
	const [subscriptionLogo, setSubscriptionLogo] = useState();

	function handleChangeCEP(value) {
		setFormSubscription({ ...formSubscription, zipCode: normalizeCEP(value) });
	}

	async function getAddress() {
		setErrorMsg();
		setError(false);
		setLoading(true);
		try {
			const address = await getAddressFromCEP(formSubscription.zipCode.replace(/\D/g, ''));
			setSubscriptionLogo({
				...formSubscription,
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
		if (formSubscription?.zipCode?.length === 10) getAddress();
	}, [formSubscription.zipCode]);

	function handleFile(e) {
		setErrorMsg('');
		setError(false);
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			if (file.size > 1024 * 1024 * 2) {
				setErrorMsg('Imagem pode ter no máximo 2mb!');
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedTypes = ['image/png', 'image/jpeg'];
			if (!acceptedTypes.includes(file.type)) {
				setErrorMsg('Imagem deve ser PNG ou JPG!');
				setError(true);
				setLoading(false);
				return null;
			}
			const acceptedExtensions = ['jpg', 'jpeg', 'png'];
			if (!acceptedExtensions.includes(file.name.split('.').pop())) {
				setErrorMsg('Imagem deve ser PNG ou JPG!');
				setError(true);
				setLoading(false);
				return null;
			}
			setErrorMsg('');
			setError(false);
			setLoading(false);
			setSubscriptionLogo(file);
		}
		setErrorMsg('');
		setError(false);
		setLoading(false);
		return null;
	}

	async function graphCreateEvent(partnerID) {
		const { data } = await API.graphql(
			graphqlOperation(createEvent, {
				input: {
					name: formSubscription.name,
					website: formSubscription.website || null,
					email: formSubscription.email || null,
					zipCode: formSubscription.zipCode,
					state: formSubscription.state,
					city: formSubscription.city,
					street: formSubscription.street,
					number: formSubscription.number,
					complement: formSubscription.complement,
          referralCode: formSubscription.referralCode || null,
					plan: formSubscription.plan,
					clientID: client.id,
					partnerID,
				},
			})
		);
		return data.createEvent;
	}

	async function addEventMap(newEvent) {
		const eventAddress = encodeURIComponent(
			`${newEvent.street}, ${newEvent.number} - ${newEvent.city} - ${newEvent.state}, ${newEvent.zipCode}`
		);
		const eventMarker = `markers=color:0xf59e0b%7Clabel:${newEvent.name[0]}%7C${eventAddress}`;
		const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${eventAddress}&zoom=17&size=1280x1280&scale=2&${eventMarker}&key=${process.env.REACT_APP_API_KEY}`;
		const res = await fetch(mapURL);
		const blob = await res.blob();
		const file = new File([blob], `${newEvent.id}.png`);
		await Storage.put(`maps/${newEvent.id}.png`, file, {
			contentType: 'image/png',
		});
	}

	async function addEventLogo(newEvent) {
		await Storage.put(`logo/${newEvent.id}.${subscriptionLogo.name.split('.').pop()}`, subscriptionLogo, {
			contentType: subscriptionLogo.type,
		});
	}

	async function handleAdd() {
		setErrorMsg('');
		setError(false);
		setLoading(true);
		if (!formSubscription.name || !formSubscription.zipCode || !formSubscription.state || !formSubscription.city) {
			setErrorMsg('Preencha todos os dados assinalados!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formSubscription.email && !validateEmail(formSubscription.email)) {
			setErrorMsg('Email inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		if (formSubscription.zipCode.length < 10) {
			setErrorMsg('CEP inválido!');
			setError(true);
			setLoading(false);
			return null;
		}
		let partnerID = null;
		if (formSubscription.referralCode) {
			const getPartner = await API.graphql(
				graphqlOperation(partnersByReferralCode, { referralCode: formSubscription.referralCode })
			);
			if (getPartner?.data?.partnersByReferralCode?.items.length <= 0) {
				setErrorMsg('Parceiro não encontrado!');
				setError(true);
				setLoading(false);
				return null;
			}
			partnerID = getPartner.data.partnersByReferralCode.items[0].id;
		}
		const newSubscription = await graphCreateEvent(partnerID);
		if (subscriptionLogo) await addEventLogo(newSubscription);
		await addEventMap(newSubscription);
		loadClient();
		setFormSubscription(initial);
		setLoading(false);
		navigate(`/assinaturas/${newSubscription.id}`, { state: { success: true } });
		return true;
	}

	return (
		<>
			{loading && <Loading />}
			{error && <Alert type="danger">{errorMsg}</Alert>}
			<Title text="Nova Assinatura" />
			<form className="flex flex-wrap bg-white p-4 mb-4 rounded-md shadow">
				<div className="flex flex-wrap">
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.name || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, name: e.target.value })}
							type="text"
							placeholder="Nome *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.website || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, website: e.target.value })}
							type="text"
							placeholder="WebSite"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<input
							value={formSubscription.email || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, email: e.target.value })}
							type="email"
							placeholder="Email"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.zipCode || ''}
							onChange={(e) => handleChangeCEP(e.target.value)}
							type="text"
							placeholder="CEP *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.city || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, city: e.target.value })}
							type="text"
							placeholder="Cidade *"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-4/12 mb-4">
						<select
							value={formSubscription.state || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, state: e.target.value })}
							placeholder="Estado *"
							className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						>
							<option value="">Selecione *</option>
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
							value={formSubscription.street || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, street: e.target.value })}
							type="text"
							placeholder="Rua"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 sm:pr-4 mb-4">
						<input
							value={formSubscription.number || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, number: e.target.value })}
							type="text"
							placeholder="Número"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-3/12 mb-4">
						<input
							value={formSubscription.complement || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, complement: e.target.value })}
							type="text"
							placeholder="Complemento"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full md:w-6/12 sm:pr-4 mb-4">
						<select
							onChange={(e) => setFormSubscription({ ...formSubscription, plan: e.target.value })}
							placeholder="Selecione o Plano *"
							className="bg-white block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
              disabled
						>
							<option value="SUBSCRIPTION" selected>Assinatura - R$ 250,00 / Mensal</option>
						</select>
					</div>
					<div className="w-full md:w-6/12 mb-4">
						<input
							value={formSubscription.referralCode || ''}
							onChange={(e) => setFormSubscription({ ...formSubscription, referralCode: e.target.value })}
							type="text"
							placeholder="Código de Referência"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full mb-4">
						<input
							onChange={(e) => handleFile(e)}
							type="file"
							placeholder="Logo"
							accept=".jpg,.jpeg,.png,image/png,image/jpeg"
							className=" block w-full px-4 py-2 font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-primary focus:outline-none"
						/>
					</div>
					<div className="w-full flex justify-center">
						<button
							type="button"
							onClick={() => handleAdd()}
							className="bg-primary px-4 py-1.5 text-sm text-white font-semibold uppercase rounded shadow-md cursor-pointer hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg transition duration-150 ease-in-out"
						>
							Cadastrar
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
