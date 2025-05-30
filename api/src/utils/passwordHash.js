const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hashed) => {
  const result = await bcrypt.compare(password, hashed);
  return result;
};

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.ENCRYPT_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { hashPassword, comparePassword, decryptPassword };
