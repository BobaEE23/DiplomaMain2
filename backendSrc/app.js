// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db'); // Подключение к базе данных
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Настройка CORS для всех источников
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware для работы с JSON
app.use(express.json());

// Обслуживание статических файлов из папки public
app.use(express.static(path.resolve(__dirname, '../public')));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Возвращаем index.html для всех маршрутов, которые не соответствуют API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

module.exports = app; // Экспортируем объект app