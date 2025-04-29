const stockTransactionModel = require('../models/StockTransaction');
const httpErrorService = require('./httpErrorService');
const productService = require('./productService');
const housewareService = require('./housewareService');
const userService = require('./userService');

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
    const [transaction] = await Promise.all([
      stockTransactionModel.create(data),
      productService.updatedProduct({ _id: data.productId, quantity: data?.type === 'import' ? Number(data.quantity) : Number(-data.quantity) })
    ]);
    return transaction;
  } catch (e) {
    await httpErrorService.create(e, 'Create stock transaction Service');
    return null;
  }
};

const getTransactions = async (query) => {
  try {
    if (!query.userId) return [];
    const { fromDate, toDate, ...payload } = query;
    const data = await stockTransactionModel.find({
      ...payload,
      ...(fromDate && toDate && {
        createdAt: {
          $gte: fromDate,
          $lte: toDate
        }
      }),
      ...(fromDate && !toDate && {
        createdAt: {
          $gte: fromDate
        }
      }),
      ...(!fromDate && toDate && {
        createdAt: {
          $lte: toDate
        }
      })
    }).lean();
    if (!data?.length) return [];
    const productIds = data.map((d) => d?.productId);
    const housewareIds = data.map((d) => d?.housewareId);
    const [products, housewares, user] = await Promise.all([
      productService.getList({ _id: { $in: productIds } }),
      housewareService.getList({ _id: { $in: housewareIds } }),
      userService.getDetail({ _id: data[0].userId })
    ]);
    const dataResponse = data.map((d) => {
      const product = products.find((p) => `${p._id}` === `${d.productId}`);
      const houseware = housewares.find((h) => `${h._id}` === `${d.housewareId}`);
      return {
        ...d,
        imageUrl: product?.imageUrl || '',
        housewareName: houseware?.name || '',
        productName: product?.name || '',
        userName: user?.username || ''
      };
    });
    return dataResponse;
  } catch (e) {
    await httpErrorService.create(e, 'Get list stock transaction Service');
    return [];
  }
};

module.exports = {
  create,
  getTransactions
};
