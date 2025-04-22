const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    housewareId: {
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    quantity: {
      type: Number,
      default: 0
    },
    status: {
      type: String
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId
    },
    price: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
