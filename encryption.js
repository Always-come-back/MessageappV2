import CryptoJS from 'crypto-js';

export class Encryption {
    constructor() {
        // Her kullanıcı için benzersiz bir anahtar oluştur
        this.generateKeyPair();
    }

    generateKeyPair() {
        this.privateKey = CryptoJS.lib.WordArray.random(256/8).toString();
        this.publicKey = CryptoJS.lib.WordArray.random(256/8).toString();
    }

    // Mesajı şifrele
    encrypt(message, recipientPublicKey) {
        const sharedSecret = this.generateSharedSecret(this.privateKey, recipientPublicKey);
        return CryptoJS.AES.encrypt(message, sharedSecret).toString();
    }

    // Mesajı çöz
    decrypt(encryptedMessage, senderPublicKey) {
        const sharedSecret = this.generateSharedSecret(this.privateKey, senderPublicKey);
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, sharedSecret);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Paylaşılan gizli anahtarı oluştur
    generateSharedSecret(privateKey, publicKey) {
        return CryptoJS.SHA256(privateKey + publicKey).toString();
    }

    getPublicKey() {
        return this.publicKey;
    }
}