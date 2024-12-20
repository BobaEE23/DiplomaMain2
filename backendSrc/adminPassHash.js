const bcrypt = require('bcryptjs');

// Пароль администратора
const password = 'qwerty123';

// Хеширование пароля
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  // Вывод хешированного пароля
  console.log('Хешированный пароль:', hash);
});