const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const {
  deleted, getList, create, update
} = require('../controllers/adminController');

router.delete('/deleted', authenticateToken, deleted);

router.get('/list', authenticateToken, getList);

router.post('/create', authenticateToken, create);

router.post('/update', authenticateToken, update);

module.exports = router;
