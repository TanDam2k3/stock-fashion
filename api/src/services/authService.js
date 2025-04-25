const userModel = require('../models/User');
const { hashPassword, comparePassword, decryptPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwtHelper');
const httpErrorService = require('./httpErrorService');

const register = async (username, password, email) => {
  try {
    const [existing, rawPassword] = await Promise.all([
      userModel.findOne({
        $or: [
          { username },
          { email }
        ]
      }),
      decryptPassword(password)
    ]);

    if (existing) return false;

    const hashed = await hashPassword(rawPassword);
    const data = {
      username,
      password: hashed,
      email,
      status: 'active'
    };
    const user = await userModel.create(data);
    return !!user;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Register Service' });
    return e;
  }
};

const login = async (username, password) => {
  try {
    const [user, rawPassword] = await Promise.all([
      userModel.findOne({ username }),
      decryptPassword(password)
    ]);
    const verifyPassword = await comparePassword(rawPassword, user?.password);
    if (!user || !verifyPassword) return null;

    const token = generateToken(user);
    return token;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Login Service' });
    return e;
  }
};

module.exports = {
  register,
  login
};
