const housewareModel = require('../models/Houseware');
const httpErrorService = require('./httpErrorService');

const create = async (payload) => {
  try {
    if(!payload) return null;
    const data = {
      name: payload?.name || null,
      address: payload?.address || null,
      status: 'active'
    };
    const houseware = await housewareModel.create(data);
    return houseware;
  } catch (e) {
    await httpErrorService.create(e, 'Create houseware Service');    
    return null;
  }
};

const getList = async (query) => {
  try {
    const data = await housewareModel.find(query).lean();
    return data;
  } catch (e) {
    await httpErrorService.create(e, 'Get list houseware Service');    
    return [];
  }
};

const deleteHouseware = async (payload) => {
  try {
    const data = await housewareModel.updateOne(
      { _id: payload?._id },
      {
        $set: {
          status: 'inactive'
        }
      }
    );
    return true;
  } catch (e) {
    await httpErrorService.create(e, 'Delete houseware Service');    
    return false;
  }
};

const updatedHouseware = async (payload) => {
  try {
    if(!payload) return false;
    const updated = await housewareModel.findOneAndUpdate(
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
    await httpErrorService.create(e, 'Update houseware Service');    
    return false;
  }
};

module.exports = {
  create,
  getList,
  deleteHouseware,
  updatedHouseware
};
