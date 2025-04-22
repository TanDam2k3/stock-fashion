const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  housewareId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  type: {
    type: String, enum: ['import', 'export']
  },
  quantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StockTransaction', stockTransactionSchema);
