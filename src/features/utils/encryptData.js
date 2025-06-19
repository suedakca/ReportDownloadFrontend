import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(ciphertext) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.error('Çözme hatası:', error);
        return null;
    }
}