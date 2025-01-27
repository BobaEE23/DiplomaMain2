const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Проверяем, является ли пользователь администратором
    if (req.user.role_id !== 0) { // Предполагаем, что `0` — это админ
      return res.status(403).json({ msg: 'Доступ запрещен. Требуются права администратора.' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Токен недействителен' });
  }
};
