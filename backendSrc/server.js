// server.js
const app = require('./app'); // Импортируем объект app из app.js
const { connectDB } = require('./config/db'); // Подключение к базе данных

// Функция для старта сервера
const startServer = async () => {
  try {
    // Подключаемся к базе данных
    await connectDB(); // Ожидаем успешного подключения к базе данных

    // После успешного подключения запускаем сервер
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error.message);
    process.exit(1); // Если произошла ошибка при подключении к базе данных, завершаем приложение
  }
};

// Запуск сервера
startServer();