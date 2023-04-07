const secp =  require("ethereum-cryptography/secp256k1");
const {toHex} =  require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = keccak256(secp.getPublicKey(privateKey).slice(1)).slice(-20);

console.log('Private Key: ',toHex(privateKey));
console.log('Public Key: ',toHex(publicKey));

// Private Key:  e39296ac4d53d2898af8881d1e88d181984d6d7b945e5a459ff1f71f81e2aa80
// Public Key:  060cd9b3be5889cc086f079433f140a6ca351c32
// usamalatif@usama-MacBook-Pro-2 server % node scripts/keys.js
// Private Key:  94c0e9973da963355049f1c91c0b6a90c9f6aac6bcfe5901fa5752b9796aa9d3
// Public Key:  c5382ebce9fe30fbdf029217de24345005b55389
// usamalatif@usama-MacBook-Pro-2 server % node scripts/keys.js
// Private Key:  9ca672fc8eb0b59738b70040b72db7e506bb02819a11cf0aa4dc1bb0e19f39fb
// Public Key:  99d84c1e99838263b84867e2acc2f68e4435ec46