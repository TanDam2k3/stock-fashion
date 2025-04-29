const { ObjectId } = require('mongodb');
const productModel = require('../models/Product');
const httpErrorService = require('./httpErrorService');
const fileService = require('./fileService');

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

const create = async (payload) => {
  try {
    if (!payload) return null;
    const data = {
      housewareId: isValidObjectId(payload?.housewareId) ? new ObjectId(payload.housewareId) : null,
      name: payload?.name || null,
      type: payload?.type,
      quantity: payload?.quantity || 0,
      status: 'active',
      fileId: isValidObjectId(payload?.fileId) ? new ObjectId(payload.fileId) : null,
      price: payload?.price || 0,
      userId: isValidObjectId(payload?.userId) ? new ObjectId(payload.userId) : null
    };

    const product = await productModel.create(data);
    return product;
  } catch (e) {
    await httpErrorService.create(e, 'Create product Service');
    return null;
  }
};

const getList = async (query, user) => {
  try {
    if (!query.userId && user.role === 'user') return [];
    const data = await productModel.find(query).lean();
    if (!data?.length) return [];

    const fileIds = data.map((d) => d?.fileId);
    const files = await fileService.getList({ _id: { $in: fileIds } });

    const filesMap = new Map(files.map((f) => [`${f._id}`, f.fileUrl])) || new Map();
    const dataRespont = data.map((d) => ({
      ...d,
      imageUrl: `${process.env.DOMAIN}/${filesMap.get(`${d.fileId}`)}`
    }));
    return dataRespont;
  } catch (e) {
    await httpErrorService.create(e, 'Get list product Service');
    return [];
  }
};

const deleteProduct = async (payload) => {
  try {
    await productModel.updateOne(
      { _id: payload._id },
      {
        $set: {
          status: 'inactive'
        }
      }
    );
    return true;
  } catch (e) {
    await httpErrorService.create(e, 'Delete product Service');
    return false;
  }
};

const updatedProduct = async (payload) => {
  try {
    const { _id, quantity, ...dataUpdate } = payload;
    const updated = await productModel.findOneAndUpdate(
      {
        _id: new ObjectId(_id)
      },
      {
        $inc: {
          quantity: quantity ? Number(quantity) : 0
        },
        $set: {
          ...dataUpdate,
          updatedAt: new Date()
        }
      },
      {
        new: true
      }
    );
    return !!updated;
  } catch (e) {
    await httpErrorService.create(e, 'Update product Service');
    return false;
  }
};

module.exports = {
  create,
  getList,
  deleteProduct,
  updatedProduct
};
