const express = require('express');
const cors = require('cors'); // Импорт CORS
const path = require('path');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Настройка CORS для всех источников
app.use(cors({
  origin: '*', // Разрешить запросы с любого домена
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  credentials: true, // Разрешить отправку куки и авторизационных данных
}));

// Middleware
app.use(express.json());

// Подключение к базе данных
connectDB();

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

module.exports = app;
