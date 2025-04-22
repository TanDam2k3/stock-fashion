const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

const generateSalt = (byteSize = 16) => crypto.randomBytes(byteSize).toString('base64');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashed) => await bcrypt.compare(password, hashed);

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.ENCRYPT_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { hashPassword, comparePassword, decryptPassword };
