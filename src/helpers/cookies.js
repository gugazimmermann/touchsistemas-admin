import CryptoJS from 'crypto-js';

export function encodeCookie(data) {
	return CryptoJS.AES.encrypt(data, process.env.REACT_APP_CRYPTO_SECRECT).toString();
}

export function decodeCookie(data) {
	if (data) {
		const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_CRYPTO_SECRECT);
		return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
	}
	return null;
}
