const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Обслуживание статических файлов из папки public
app.use(express.static(path.resolve(__dirname, '../public')));

// Подключение к базе данных
connectDB();

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Возвращаем index.html для всех маршрутов, которые не соответствуют API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));

});

module.exports = app;