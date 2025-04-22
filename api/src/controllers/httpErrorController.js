const httpErrorService = require('../services/httpErrorService');

exports.create = async (error, location) => {
  try {
    await httpErrorService.create(error, location);
  } catch (e) {
    await httpErrorService.create(e, 'Create Error');
    res.status(500).json({ message: e });
  }
};
