const httpErrorModel = require('../models/HttpError');

const create = async (error, localtion) => {
  try {
    await httpErrorModel.create({ error, localtion });
  } catch (e) {
    await httpErrorModel.create({ error: e, localtion: 'Create Error Service' });
  }
};

module.exports = {
  create
};
