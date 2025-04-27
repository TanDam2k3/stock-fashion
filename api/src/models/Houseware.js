const mongoose = require('mongoose');

const housewareSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      type: String,
      default: ''
    },
    status: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Houseware', housewareSchema);
