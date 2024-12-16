// src/reducers/productsReducer.js
const initialState = {
  products: [], // Все товары
  filteredProducts: [], // Отфильтрованные товары
  sortBy: '', // Параметр сортировки
  searchQuery: '', // Поисковый запрос
};

// Функция сортировки товаров
export const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'priceAsc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'nameAsc':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: sortProducts(action.payload, state.sortBy),
      };
    case 'FILTER_PRODUCTS_BY_CATEGORY':
      const filteredByCategory = action.payload.length
        ? state.products.filter(product => action.payload.includes(product.category))
        : state.products;
      return {
        ...state,
        filteredProducts: sortProducts(filteredByCategory, state.sortBy),
      };
    case 'SORT_PRODUCTS':
      return {
        ...state,
        sortBy: action.payload,
        filteredProducts: sortProducts(state.filteredProducts, action.payload),
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;