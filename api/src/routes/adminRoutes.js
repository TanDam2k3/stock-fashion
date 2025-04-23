const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const {deleted, getList} = require('../controllers/adminController');

router.delete('/deleted', authenticateToken, deleted);

router.get('/user-list', authenticateToken, getList);

module.exports = router;
