const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const { findDetail, update } = require('../controllers/userController');

router.get('/find-detail', authenticateToken, findDetail);

router.put('/update', authenticateToken, update);

module.exports = router;
