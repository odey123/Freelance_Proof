const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const KEYS_DIR = path.join(__dirname, '../keys');
const PRIVATE_KEY_PATH = path.join(KEYS_DIR, 'private.pem');
const PUBLIC_KEY_PATH = path.join(KEYS_DIR, 'public.pem');

class CryptoService {
  initKeys() {
    if (process.env.JWT_PRIVATE_KEY && process.env.JWT_PUBLIC_KEY) {
      console.log('Valid RSA keys found in Environment Variables.');
      return;
    }

    if (!fs.existsSync(KEYS_DIR)) {
      fs.mkdirSync(KEYS_DIR);
    }
    
    if (!fs.existsSync(PRIVATE_KEY_PATH) || !fs.existsSync(PUBLIC_KEY_PATH)) {
      console.log('Generating RSA Keypair...');
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      });
      fs.writeFileSync(PUBLIC_KEY_PATH, publicKey);
      fs.writeFileSync(PRIVATE_KEY_PATH, privateKey);
    } else {
      console.log('RSA Keypair loaded from local disk.');
    }
  }

  getPrivateKey() {
    if (process.env.JWT_PRIVATE_KEY) return process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
    return fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  }

  getPublicKey() {
    if (process.env.JWT_PUBLIC_KEY) return process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
    return fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');
  }

  generateToken(payload, expiresIn = '90d') {
    const privateKey = this.getPrivateKey();
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
  }

  verifyToken(token) {
    const publicKey = this.getPublicKey();
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  }
}

module.exports = new CryptoService();
