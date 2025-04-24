const productModel = require('../models/Product');
const httpErrorService = require('./httpErrorService');
const fileService = require('../services/fileService');

const create = async (payload) => {
  try {
    if(!payload) return null;
    const data = {
      housewareId: payload?.housewareId || null,
      name: payload?.name || null,
      type: payload?.type,
      quantity: payload?.quantity || 0,
      status: 'active',
      fileId: payload?.fileId,
      price: payload?.price || 0
    };
    const product = await productModel.create(data);
    return product;
  } catch (e) {
    await httpErrorService.create(e, 'Create product Service');
    return null;
  }
};

const getList = async (query) => {
  try {
    const data = await productModel.find(query).lean();
    if(!data?.length) return [];

    const fileIds = data.map(d=> d?.fileId);
    const files = await fileService.getList({_id: {$in: fileIds}});

    const filesMap = new Map(files.map(f=> [`${f._id}`, f.fileUrl])) || new Map();
    const dataRespont = data.map(d=> {
      return {
        ...d,
        imageUrl: `${process.env.DOMAIN}/${filesMap.get(d.fileId)}`
      }
    });
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
    const updated = await productModel.findOneAndUpdate(
      {
        _id: payload._id
      },
      {
        $set: {
          ...payload,
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
