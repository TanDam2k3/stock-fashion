const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const httpErrorService = require('../services/httpErrorService');

// Dùng memoryStorage để giữ file trong RAM (chưa ghi ra disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const processAndSaveWebp = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const filename = `Image-${Date.now()}.webp`;
    const outputPath = path.join(__dirname, '../../public/images', filename);

    // Chuyển file buffer sang webp rồi lưu xuống ổ đĩa
    await sharp(req.file.buffer)
      .webp({ quality: 80 }) // chất lượng 80%
      .toFile(outputPath);

    // Gắn thông tin file mới vào req để controller dùng
    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (err) {
    await httpErrorService.create(err, 'Upload file middleware');
    return res.status(500).json({ message: 'Lỗi xử lý file' });
  }
};

module.exports = {
  upload, // multer middleware
  processAndSaveWebp // xử lý sharp
};
