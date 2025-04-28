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

const getList = async (query) => {
  try {
    const users = await userModel.find({
      ...query,
      username: { $ne: 'admin' }
    }).lean();
    const fileIds = users.map((u) => u?.avatarId);

    const files = await fileService.getList({ _id: { $in: fileIds } });
    const filesMap = new Map(files.map((f) => [`${f._id}`, f.fileUrl])) || new Map();

    const dataRespont = users.map((u) => ({
      ...u,
      avatar: `${process.env.DOMAIN}/${filesMap.get(`${u.avatarId}`)}`
    }));
    return dataRespont;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Get list user from admin fail Service' });
    return [];
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

const create = async (payload) => {
  try {
    if (!payload?.username || !payload?.password) return null;
    const [existing, rawPassword] = await Promise.all([
      userModel.findOne({
        $or: [
          { username: payload?.username },
          { email: payload?.email }
        ]
      }),
      decryptPassword(payload?.password)
    ]);
    if (existing) return null;
    const hashed = await hashPassword(rawPassword);

    const user = {
      avatarId: new ObjectId(payload.avatarId),
      email: payload?.email,
      username: payload?.username,
      name: payload?.name,
      phone: payload?.phone,
      address: payload?.address,
      password: hashed,
      role: 'user',
      status: 'active'
    };

    const createUser = await userModel.create(user);
    return createUser;
  } catch (e) {
    await httpErrorService.create({ error: e, localtion: 'Admin create user' });
    return null;
  }
};

module.exports = {
  create,
  update,
  deleted,
  getList
};
