const User = require('../models/User');

// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Получить пользователя по ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Обновить данные пользователя
exports.updateUser = async (req, res) => {
  const { login, email, role_id } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    user.login = login;
    user.email = email;
    user.role_id = role_id;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Удалить пользователя
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Пользователь не найден' });
    }

    await user.remove();
    res.json({ msg: 'Пользователь удален' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};