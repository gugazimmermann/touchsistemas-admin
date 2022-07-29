export default async function getAddressFromCEP(zipCode) {
  let cleanCep = '';
  if (zipCode.length > 1) cleanCep = zipCode.replace(/\D/g, '');
  if (cleanCep.length === 8) {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    if (!data?.erro) {
      return {
        state: data.uf,
        street: data.logradouro,
        city: data.localidade,
      };
    }
    throw new Error(`CEP não encontrado.`);
  }
  return null;
}
