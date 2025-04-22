const stockTransactionModel = require('../models/StockTransaction');
const httpErrorService = require('./httpErrorService');

const create = async (payload) => {
  try {
    if (!payload) return null;
    const data = {
      housewareId: payload?.housewareId || null,
      productId: payload?.productId || null,
      userId: payload?.userId || null,
      type: payload?.type,
      status: 'success',
      quantity: payload?.quantity,
      price: payload?.price || 0
    };
    const transaction = await stockTransactionModel.create(data);
    return transaction;
  } catch (e) {
    await httpErrorService.create(e, 'Create stock transaction Service');
    return null;
  }
};

const getTransactions = async (query) => {
  try {
    const data = await stockTransactionModel.find(query).lean();
    return data;
  } catch (e) {
    await httpErrorService.create(e, 'Get list stock transaction Service');
    return [];
  }
};

module.exports = {
  create,
  getTransactions
};
