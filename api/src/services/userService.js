const { ObjectId } = require('mongodb');
const userModel = require('../models/User');
const { hashPassword, comparePassword, decryptPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwtHelper');
const httpErrorService = require('./httpErrorService');
const fileService = require('./fileService');

const deleted = async (payload) => {
  try {
    if (!payload) return null;
    const isDeleted = await userModel.findOneAndUpdate(
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
    return !!isDeleted;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Delete user from admin Service' });
    return null;
  }
};

const getDetail = async (query) => {
  try {
    if (!query?._id) return null;
    const user = await userModel.findById(new ObjectId(query._id)).lean();

    if (!user || user.status === 'inactive') return null;
    const file = await fileService.findById(user.avatarId);
    const dataRespont = {
      ...user,
      ...(file && { avatar: `${process.env.DOMAIN}/${file.fileUrl}` })
    };

    return dataRespont;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Finde detail user fail Service' });
    return null;
  }
};

const update = async (payload) => {
  try {
    if (!payload || !payload?._id) return null;
    const dataUpdate = {
      ...(payload?.name && { name: payload.name }),
      ...(payload?.address && { address: payload.address }),
      ...(payload?.phone && { phone: payload.phone }),
      ...(payload?.email && { email: payload.email })
    };
    const updatedUser = await userModel.findOneAndUpdate(
      {
        _id: new ObjectId(payload._id)
      },
      {
        $set: {
          ...dataUpdate,
          updatedAt: new Date()
        }
      },
      {
        new: true
      }
    );
    return updatedUser;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Update user from admin fail Service' });
    return null;
  }
};

module.exports = {
  update,
  deleted,
  getDetail
};
