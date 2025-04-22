const stockTransactionService = require('../services/stockTransactionService');
const httpErrorService = require('../services/httpErrorService');

exports.importStock = async (req, res) => {
  try {
    const transaction = await stockTransactionService.create(req.body);
    const text = transaction ? 'Stock imported success' : 'Stock imported fail';
    const status = transaction ? 200 : 400;
    res.status(status).json({ message: text, transaction });
  } catch (e) {
    await httpErrorService.create(e, 'Stock transaction import');
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.exportStock = async (req, res) => {
  try {
    const transaction = await stockTransactionService.create(req?.body);
    const text = transaction ? 'Stock export success' : 'Stock export fail';
    const status = transaction ? 200 : 400;
    res.status(status).json({ message: text, transaction });
  } catch (e) {
    await httpErrorService.create(e, 'Stock transaction export');
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await stockTransactionService.getTransactions(req?.query);
    res.json(transactions);
  } catch (e) {
    await httpErrorService.create(e, 'Get list transaction');
    res.status(500).json({ message: 'Server Error' });
  }
};
