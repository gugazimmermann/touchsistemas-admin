import CryptoJS from 'crypto-js';

function encode(data) {
	return CryptoJS.AES.encrypt(data, process.env.REACT_APP_CRYPTO_SECRECT).toString();
}

function decode(data) {
	if (data) {
		const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_CRYPTO_SECRECT);
		return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
	}
	return null;
}

const Cookies = { encode, decode };

export default Cookies;
