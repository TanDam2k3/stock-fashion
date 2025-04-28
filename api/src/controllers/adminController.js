/* eslint-disable no-unsafe-optional-chaining */
const adminService = require('../services/adminService');
const httpErrorService = require('../services/httpErrorService');

exports.deleted = async (req, res) => {
  try {
    const { role } = req?.user;
    if (!role || role !== 'admin') res.status(404).json({ message: 'Forbidden' });
    if (!req?.body) res.status(400).json({ message: 'Error deleted' });
    const deleted = await adminService.deleted(req.body);

    const text = deleted ? 'Deleted success' : 'Delete fail';
    const status = deleted ? 200 : 400;
    res.status(status).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Delete user from admin');
    res.status(500).json({ message: e });
  }
};

exports.getList = async (req, res) => {
  try {
    const { role } = req?.user;
    if (!role || role !== 'admin') res.status(404).json({ message: 'Forbidden' });
    const users = await adminService.getList(req?.query);
    res.status(201).json({ users });
  } catch (e) {
    await httpErrorService.create(e, 'Get List User');
    res.status(500).json({ message: e });
  }
};

exports.create = async (req, res, next) => {
  try {
    const { role } = req?.user;
    if (!role || role !== 'admin') res.status(404).json({ message: 'Forbidden' });
    if (!req?.body) res.status(400).json({ message: 'Error deleted' });
    const isCreate = await adminService.create(req.body);

    const text = isCreate ? 'Created success' : 'Create fail';
    const status = isCreate ? 200 : 400;
    res.status(status).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Admin create user fail');
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { role } = req?.user;
    if (!role || role !== 'admin') res.status(404).json({ message: 'Forbidden' });
    if (!req?.body) res.status(400).json({ message: 'Error update' });
    const isUpdated = await adminService.update(req.body);

    const text = isUpdated ? 'Updated success' : 'Update fail';
    const status = isUpdated ? 200 : 400;
    res.status(status).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Admin update user fail');
    next(e);
  }
};
