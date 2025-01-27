const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Подключаем middleware

// Все маршруты для работы с продуктами
router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct); // Проверка наличия токена
router.put('/:id', authMiddleware, productController.updateProduct); // Проверка наличия токена
router.delete('/:id', authMiddleware, productController.deleteProduct); // Проверка наличия токена

module.exports = router;
