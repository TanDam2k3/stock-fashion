const productService = require('../services/productService');
const httpErrorService = require('../services/httpErrorService');

exports.create = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    if (product) {
      res.status(201).json({ product });
    } else {
      res.status(400).json({ message: 'Error create Product!!!' });
    }
  } catch (e) {
    await httpErrorService.create(e, 'Create product');
    res.status(500).json({ message: e });
  }
};

exports.getList = async (req, res) => {
  try {
    const products = await productService.getList(req?.query);
    res.status(201).json({ products });
  } catch (e) {
    await httpErrorService.create(e, 'Get list product');
    res.status(500).json({ message: e });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) res.status(400).json({ message: 'Please fill in all information' });
    const updated = await productService.updatedProduct(req.body);
    const text = updated ? 'Updated product success' : 'Updated product fail';
    res.status(200).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Update product');
    res.status(500).json({ message: e });
  }
};

exports.deleted = async (req, res) => {
  try {
    if (!req?.body) res.status(400).json({ message: 'Please fill in all information.' });
    const deleted = await productService.deleteProduct(req.body);
    const text = deleted ? 'Deleted product success' : 'Delete product fail';
    res.status(200).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Delete product');
    res.status(500).json({ message: e });
  }
};
