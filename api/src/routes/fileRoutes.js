const express = require('express');

const router = express.Router();
const { upload, processAndSaveWebp } = require('../middlewares/uploadMiddleware');
const { uploadFile } = require('../controllers/fileController');

router.post('/upload', upload.single('file'), processAndSaveWebp, uploadFile);

module.exports = router;
