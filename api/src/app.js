const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockTransactionRoutes = require('./routes/stockTransactionRoutes');
const housewareRoutes = require('./routes/housewareRoutes');
const fileRoutes = require('./routes/fileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stocks', stockTransactionRoutes);
app.use('/api/houseware', housewareRoutes);
app.use('/api/files', fileRoutes);
app.use(express.static('public'));

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

module.exports = app;
