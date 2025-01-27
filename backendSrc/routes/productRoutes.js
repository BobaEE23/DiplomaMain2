const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Подключаем middleware

router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct); // Проверка прав
router.put('/:id', authMiddleware, productController.updateProduct); // Проверка прав
router.delete('/:id', authMiddleware, productController.deleteProduct); // Проверка прав

module.exports = router;
