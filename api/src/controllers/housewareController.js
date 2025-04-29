const housewareService = require('../services/housewareService');
const httpErrorService = require('../services/httpErrorService');

exports.create = async (req, res) => {
  try {
    if (!req.body) res.status(400).json({ message: 'Please fill in all information' });
    const houseware = await housewareService.create(req.body);
    if (houseware) {
      res.status(201).json({ houseware });
    } else {
      res.status(400).json({ message: 'Error create houseware!!!' });
    }
  } catch (e) {
    await httpErrorService.create(e, 'Create houseware');
    res.status(500).json({ message: e });
  }
};

exports.update = async (req, res) => {
  try {
    const { payload } = req.body;
    if (!payload._id || !payload) res.status(400).json({ message: 'Please fill in all information' });
    const updated = await housewareService.updatedHouseware(payload);
    const text = updated ? 'Updated houseware success' : 'Updated houseware fail';
    res.status(200).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Update houseware');
    res.status(500).json({ message: e });
  }
};

exports.deleted = async (req, res) => {
  try {
    if (!req.body) res.status(400).json({ message: 'Please fill in all information.' });
    const deleted = await housewareService.deleteHouseware(req.body);
    const text = deleted ? 'Deleted houseware success' : 'Delete houseware fail';
    res.status(200).json({ message: text });
  } catch (e) {
    await httpErrorService.create(e, 'Delete houseware');
    res.status(500).json({ message: e });
  }
};

exports.getList = async (req, res) => {
  try {
    const housewares = await housewareService.getList(req?.query, req?.user);
    res.status(200).json({
      data: housewares
    });
  } catch (e) {
    await httpErrorService.create(e, 'Get list houseware');
    res.status(500).json({ message: e });
  }
};
