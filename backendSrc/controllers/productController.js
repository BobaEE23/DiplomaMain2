const Product = require('../models/Product');

// Получить все продукты
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Преобразуем _id в строку
    const productsWithStringId = products.map(product => ({
      ...product.toObject(), // Преобразуем документ в обычный объект
      id: product._id.toString(), // Добавляем строковый id
    }));
    res.json(productsWithStringId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Создать новый продукт
exports.createProduct = async (req, res) => {
  const { name, price, photo, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      photo,
      category,
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
  const { name, price, photo, category } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Продукт не найден' });
    }

    product.name = name;
    product.price = price;
    product.photo = photo;
    product.category = category;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};


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

