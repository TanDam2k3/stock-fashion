const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  create,
  update,
  deleted,
  getList
} = require('../controllers/housewareController');

router.post('/create', authenticateToken, create);

router.get('/list', authenticateToken, getList);

router.delete('/delete', authenticateToken, deleted);

router.put('/update', authenticateToken, update);

module.exports = router;
