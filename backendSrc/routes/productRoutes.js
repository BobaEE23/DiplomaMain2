const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // если используешь

// Получить все продукты
router.get('/', productController.getAllProducts);

// Создать продукт
router.post('/', productController.createProduct);

// Обновить продукт
router.put('/:id', productController.updateProduct);

// Удалить продукт
router.delete('/:id', productController.deleteProduct);

// Обработка preflight запроса для PATCH
router.options('/:id/quantity', (req, res) => {
  res.sendStatus(200);
});

// Обновить количество продукта (PATCH)
router.patch('/:id/quantity', productController.updateQuantity);

module.exports = router;
