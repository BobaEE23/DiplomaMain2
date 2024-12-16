// src/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from "./reducer";
import productsReducer from './productReducer';
import categoriesReducer from './categoriesReducer';
import adminProductReducer from './adpminProductReducer';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer'; // Добавьте новый редьюсер

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  categories: categoriesReducer,
  adminProducts: adminProductReducer,
  cart: cartReducer,
  search: searchReducer, // Добавляем новый редьюсер
  // другие редьюсеры
});

export default rootReducer;