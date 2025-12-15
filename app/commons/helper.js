const config = require('../../config.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.hashSenha = (senha) => {
  const hash = crypto.createHash('sha256'); //instancia de Hash
  hash.update(senha); //atualiza o conteudo dele com a senha para processar
  return hash.digest('hex'); //digest = resumo, valor do hash em hexadecimal
};

exports.gerarTokenAcesso = (nome, id) => {
  return jwt.sign({ nome, id }, config.jwt.secret, {
    expiresIn: config.jwt.expiration,
  });
};

exports.verifyRecaptchaToken = (token) => {
  return new Promise((resolve, reject) => {
    const secret = config.recaptcha && config.recaptcha.secret;
    if (!secret) return reject(new Error('RECAPTCHA_SECRET_KEY not configured'));

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const https = require('https');
    const options = {
      hostname: 'www.google.com',
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params.toString()),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const obj = JSON.parse(data);
          resolve(obj);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(params.toString());
    req.end();
  });
};
