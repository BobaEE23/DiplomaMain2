const initialState = {
  searchQuery: '', // Текущий поисковый запрос
  filteredProducts: [], // Отфильтрованные товары
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      const query = action.payload.toLowerCase();
      return {
        ...state,
        searchQuery: query,
      };
    case 'FILTER_PRODUCTS_BY_SEARCH':
      const { products } = action.payload; // Передаем все товары для фильтрации
      const filteredProducts = products ? products.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery)
      ) : []; // Проверяем, что products не undefined
      return {
        ...state,
        filteredProducts,
      };
    default:
      return state;
  }
};

export default searchReducer;