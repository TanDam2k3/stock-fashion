/* eslint-disable no-unsafe-optional-chaining */
const httpErrorService = require('../services/httpErrorService');
const userService = require('../services/userService');

exports.findDetail = async (req, res, next) => {
  try {
    if (!req.query) return null;
    const user = await userService.getDetail(req?.query);
    res.status(200).json(user);
  } catch (e) {
    await httpErrorService.create(e, 'Finde detail of user fail');
    res.status(400).json(null);
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!req?.body) res.status(400).json({ message: 'Error update' });
    const isUpdated = await userService.update(req.body);

    const text = isUpdated ? 'Updated success' : 'Update fail';
    const status = isUpdated ? 200 : 400;
    res.status(status).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'User update fail');
    next(e);
  }
};
