const Product = require('../models/Product');

// Получить все продукты
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStringId = products.map(product => ({
      ...product.toObject(),
      id: product._id.toString(),
    }));
    res.json(productsWithStringId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Создать новый продукт
exports.createProduct = async (req, res) => {
  const { name, price, photo, category, quantity } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      photo,
      category,
      quantity, // поддержка quantity при создании
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Обновить продукт
exports.updateProduct = async (req, res) => {
  const { name, price, photo, category, quantity } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Продукт не найден' });
    }

    product.name = name;
    product.price = price;
    product.photo = photo;
    product.category = category;
    if (quantity !== undefined) product.quantity = quantity;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Удалить продукт
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Продукт не найден' });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Продукт удален' });
  } catch (err) {
    console.error('Ошибка при удалении данных:', err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// 🔧 Новый контроллер PATCH — обновить количество
exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Продукт не найден' });
    }

    product.quantity = quantity;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error('Ошибка при обновлении количества:', err.message);
    res.status(500).send('Ошибка сервера');
  }
};
