const File = require('../models/File');
const fileService = require('../services/fileService');
const httpErrorService = require('../services/httpErrorService');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const file = await fileService.create(req.file);
    const text = file ? 'Upload file success' : 'Upload file fail';
    const status = file ? 200 : 400;

    res.status(status).json({ message: text, file: file || null });
  } catch (e) {
    await httpErrorService.create(e, 'Upload file');
  }
};
