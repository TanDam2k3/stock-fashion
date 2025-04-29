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

    const { password, ...response } = dataRespont;

    return response;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Finde detail user fail Service' });
    return null;
  }
};

const findDetailByIds = async (userIds) => {
  try {
    if (!userIds?.length) return null;
    const users = await userModel.find({
      _id: { $in: userIds }
    }).lean();

    if (!users?.length) return [];

    const fileIds = users.map((u) => u.avatarId);

    const files = await fileService.getList({ _id: { $in: fileIds } });
    const dataResponse = users.map((u) => {
      const file = files.find((f) => `${f._id}` === `${u.avatarId}`);
      const { password, ...response } = u;
      return {
        ...response,
        ...(file && { avatar: `${process.env.DOMAIN}/${file.fileUrl}` })
      };
    });

    return dataResponse;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Finde list detail user fail Service' });
    return null;
  }
};

const update = async (payload) => {
  try {
    if (!payload || !payload?._id) return null;
    const { _id, ...newDate } = payload;

    const rawPassword = newDate?.password && await decryptPassword(newDate?.password);
    const hashed = rawPassword && await hashPassword(rawPassword);

    const dataUpdate = {
      ...(newDate?.username && { username: newDate.username }),
      ...(newDate?.name && { name: newDate.name }),
      ...(newDate?.password && { password: hashed }),
      ...(newDate?.address && { address: newDate.address }),
      ...(newDate?.phone && { phone: newDate.phone }),
      ...(newDate?.email && { email: newDate.email }),
      ...(newDate?.avatarId && { avatarId: newDate.avatarId })
    };
    const updatedUser = await userModel.findOneAndUpdate(
      {
        _id: new ObjectId(_id)
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
    await httpErrorService.create({ error: e, localtion: 'Update user fail Service' });
    return null;
  }
};

module.exports = {
  update,
  deleted,
  getDetail,
  findDetailByIds
};
