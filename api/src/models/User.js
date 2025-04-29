const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  avatarId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    default: 'active'
  }
});

module.exports = mongoose.model('User', userSchema);
