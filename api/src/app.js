const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockTransactionRoutes = require('./routes/stockTransactionRoutes');
const housewareRoutes = require('./routes/housewareRoutes');
const fileRoutes = require('./routes/fileRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stocks', stockTransactionRoutes);
app.use('/api/houseware', housewareRoutes);
app.use('/api/files', fileRoutes);
app.use(express.static('public'));

app.use(errorHandler);

module.exports = app;
