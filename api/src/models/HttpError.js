const mongoose = require('mongoose');

const httpErrorSchema = new mongoose.Schema(
  {
    error: {
      type: String
    },
    location: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('httpError', httpErrorSchema);
