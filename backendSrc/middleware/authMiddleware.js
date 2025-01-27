module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' });
  }

  try {
    // Принимаем любой токен как успешную авторизацию
    req.user = { role_id: 0 };  // Назначаем роль администратора (0 - админ)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Токен недействителен' });
  }
};
