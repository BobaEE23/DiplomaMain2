const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Регистрация
exports.register = async (req, res) => {
  const { login, password, email, role_id } = req.body;

  try {
    let user = await User.findOne({ login });
    if (user) {
      return res.status(400).json({ msg: 'Пользователь уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      login,
      password: hashedPassword,
      email,
      role_id,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};

// Вход
exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
    let user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ msg: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Неверный логин или пароль' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
};