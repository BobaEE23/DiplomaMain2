const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршруты для пользователей
router.get('/', userController.getAllUsers); // Получить всех пользователей
router.get('/:id', userController.getUserById); // Получить пользователя по ID
router.put('/:id', userController.updateUser); // Обновить данные пользователя
router.delete('/:id', userController.deleteUser); // Удалить пользователя

module.exports = router;