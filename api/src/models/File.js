const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String
    },
    mimeType: {
      type: String
    },
    size: {
      type: Number
    },
    path: {
      type: String
    },
    fileUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('File', fileSchema);
