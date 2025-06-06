const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 }, // новое поле
});

module.exports = mongoose.model('Product', ProductSchema);
