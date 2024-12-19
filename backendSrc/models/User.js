const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role_id: { type: Number, required: true, default: 1 }, // 0 - Админ, 1 - Читатель, 3 - Гость
  registed_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);