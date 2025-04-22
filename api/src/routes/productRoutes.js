const express = require('express');

const router = express.Router();
const {
  create, deleted, update, getList
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, create);
router.get('/list', authenticateToken, getList);
router.delete('/delete', authenticateToken, deleted);
router.put('/update', authenticateToken, update);

module.exports = router;
