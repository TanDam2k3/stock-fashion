const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const {deleted} = require('../controllers/adminController');

router.delete('/deleted', authenticateToken, deleted);
router.post('/login', login);

module.exports = router;
