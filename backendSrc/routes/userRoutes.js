const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController'); // Добавляем контроллер для регистрации

// Маршруты для пользователей
router.get('/', userController.getAllUsers); // Получить всех пользователей
router.get('/:id', userController.getUserById); // Получить пользователя по ID
router.put('/:id', userController.updateUser); // Обновить данные пользователя
router.delete('/:id', userController.deleteUser); // Удалить пользователя

// Добавляем маршрут для регистрации
router.post('/', authController.register);

module.exports = router;