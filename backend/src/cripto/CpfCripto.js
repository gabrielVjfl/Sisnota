const crypto = require('crypto')
const key = require('./key/cryptSecure')


const Credencials = {
  algorithm: 'aes-256-ctr',
  secret: `${key}`
}


module.exports = function Criptografia(text){
var cipher = crypto.createCipher(Credencials.algorithm, Credencials.secret)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}