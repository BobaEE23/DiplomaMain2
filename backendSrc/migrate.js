require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Role = require('./models/Role');

const users = [
  {
    id: "001",
    login: "admin",
    password: "qwerty123",
    registed_at: "2024-05-25",
    role_id: 0,
    email: "admin@example.com", 
  },
  {
    id: "93bf",
    login: "user",
    password: "qwerty123",
    registed_at: "2053-03-14 23:01",
    role_id: 1,
    email: "user@example.com", 
  },
  {
    id: "c0ab",
    login: "user2",
    password: "qwerty",
    email: "alex2@yandex.ru",
    role_id: 3,
  },
  {
    id: "3937",
    login: "user7",
    password: "123456789",
    email: "alex200@yandex.ru",
    role_id: 1,
  },
];

const products = [
  {
    id: "9",
    name: "Тепловой извещатель",
    price: 3333,
    photo: "https://via.placeholder.com/150",
    category: "Системы оповещения",
  },
  {
    id: "11",
    name: "Пожарный гидрант",
    price: 9000,
    photo: "https://via.placeholder.com/150",
    category: "Монтажные услуги",
  },
  {
    id: "12",
    name: "Пожарный щит",
    price: 6000,
    photo: "https://via.placeholder.com/150",
    category: "Монтажные услуги",
  },
  {
    id: "33",
    name: "Пожарный огнетушитель",
    price: 3000,
    photo: "https://via.placeholder.com/150",
    category: "Огнетушители",
  },
  {
    id: "34",
    name: "Пожарный рукав 25м",
    price: 12000,
    photo: "https://via.placeholder.com/150",
    category: "Огнетушители",
  },
  {
    id: "14",
    name: "Пожарный костюм",
    price: 10000,
    photo: "https://via.placeholder.com/150",
    category: "Снаряжение для безопасности",
  },
  {
    id: "24",
    name: "Автоматическая система пожаротушения с датчиками",
    price: 65000,
    photo: "https://via.placeholder.com/150",
    category: "Системы пожаротушения",
  },
  {
    id: "25",
    name: "Дымовой извещатель с подсветкой",
    price: 2200,
    photo: "https://via.placeholder.com/150",
    category: "Системы пожаротушения",
  },
];

const roles = [
  {
    id: 0,
    name: "Администратор",
  },
  {
    id: 1,
    name: "Читатель",
  },
  {
    id: 3,
    name: "Гость",
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB подключена');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exit(1);
  }
};

const migrateData = async () => {
  await connectDB();

  // Удаляем старые данные
  await User.deleteMany();
  await Product.deleteMany();
  await Role.deleteMany();

  // Добавляем новые данные
  await User.insertMany(users);
  await Product.insertMany(products);
  await Role.insertMany(roles);

  console.log('Данные успешно перенесены');
  process.exit();
};

migrateData();