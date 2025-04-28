const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const { findDetail } = require('../controllers/userController');

router.get('/find-detail', authenticateToken, findDetail);

module.exports = router;
