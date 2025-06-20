import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(ciphertext) {
    try {
        if (!ciphertext || typeof ciphertext !== 'string') {
            console.warn('decryptData: Boş veya geçersiz ciphertext geldi.', ciphertext);
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedStr) {
            console.warn('decryptData: Çözüm başarısız, boş çıktı döndü.', ciphertext);
            return null;
        }

        const decryptedData = JSON.parse(decryptedStr);
        return decryptedData;
    } catch (error) {
        console.error('Çözme hatası:', error, 'ciphertext:', ciphertext);
        return null;
    }
}

