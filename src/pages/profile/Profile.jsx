import { useOutletContext } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';

export default function Profile() {
  const [client] = useOutletContext();
	return (
		<>
			<h2 className="text-primary text-xl p-2">Cadastro</h2>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full lg:w-6/12 pr-4 mb-4">
						<Input value={client?.name || ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Nome" />
					</div>
					<div className="w-full lg:w-6/12 mb-4">
						<Input value={client?.phone|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Telefone" />
					</div>
					<div className="w-full lg:w-6/12 pr-4 mb-4">
						<Input value={client?.email|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Email" disabled />
					</div>
					<div className="w-full lg:w-6/12 mb-4">
						<Input value={client?.website|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="WebSite" />
					</div>
					<div className="w-full lg:w-4/12 pr-4 mb-4">
						<Input value={client?.zipCode|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="CEP" />
					</div>
					<div className="w-full lg:w-4/12 pr-4 mb-4">
						<Input value={client?.city|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Cidade" />
					</div>
					<div className="w-full lg:w-4/12 mb-4">
						<Input value={client?.state|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Estado" />
					</div>
          <div className="w-full lg:w-8/12 pr-4 mb-4">
						<Input value={client?.street|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Rua" />
					</div>
					<div className="w-full lg:w-4/12 mb-4">
						<Input value={client?.number|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Número" />
					</div>
          <div className="w-full flex justify-center">
						<Button className='bg-primary'>Atualizar Cadastro</Button>
					</div>
				</div>
			</form>
      <h3 className="text-primary text-xl p-2">Proprietário</h3>
			<form className="mx-4">
				<div className="flex flex-wrap">
					<div className="w-full lg:w-4/12 pr-4 mb-4">
						<Input value={client?.owner?.name || ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Nome" />
					</div>
					<div className="w-full lg:w-4/12 pr-4 mb-4">
						<Input value={client?.owner?.phone|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Telefone" />
					</div>
					<div className="w-full lg:w-4/12 mb-4">
						<Input value={client?.owner?.email|| ''} onChange={() => {}} type="text" color="orange" variant="standard" label="Email" />
					</div>
          <div className="w-full flex justify-center">
						<Button className='bg-primary'>Atualizar Proprietário</Button>
					</div>
				</div>
			</form>
		</>
	);
}
