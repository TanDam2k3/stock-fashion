const express = require('express');

const router = express.Router();
const { importStock, exportStock, getTransactions } = require('../controllers/stockTransactionController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/import', authenticateToken, importStock);
router.post('/export', authenticateToken, exportStock);
router.get('/list', authenticateToken, getTransactions);

module.exports = router;
