const { ObjectId } = require('mongodb');
const fileModel = require('../models/File');
const httpErrorService = require('./httpErrorService');

const create = async (payload) => {
  try {
    const data = {
      originalName: payload?.originalname,
      mimeType: payload?.mimetype,
      size: payload?.size,
      path: payload?.path,
      fileUrl: `/images/${payload?.filename}`
    };

    const file = await fileModel.create(data);
    return file;
  } catch (e) {
    await httpErrorService.create(e, 'Upload file Service');
    return null;
  }
};

const getList = async (query) => {
  try {
    const file = await fileModel.find(query).lean();
    return file;
  } catch (e) {
    await httpErrorService.create(e, 'Get list file Service');
    return null;
  }
};

const findById = async (_id) => {
  try {
    const file = await fileModel.findById(new ObjectId(_id));
    return file;
  } catch (e) {
    await httpErrorService.create(e, 'Find by id file fail Service');
    return null;
  }
};

module.exports = {
  create,
  getList,
  findById
};
