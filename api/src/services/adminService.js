const userModel = require('../models/User');
const { hashPassword, comparePassword, decryptPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwtHelper');
const httpErrorService = require('./httpErrorService');

const deleted = async (payload) => {
  try {
    if(!payload) return null;
    const deleted = await userModel.findOneAndUpdate(
      {
        _id: payload._id
      },
      {
        $set: {
          status: 'inactive',
          updatedAt: new Date()
        }
      },
      {
        new: true
      }
    );
    return !!deleted;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Delete user from admin Service' });
    return null;
  }
};

const getList = async (query) => {
  try {
    const users = await userModel.find(query).lean();
    return users;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Get list user from admin fail Service' });
    return [];
  }
};

module.exports = {
  deleted,
  getList
};
