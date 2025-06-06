
export const setUserRole = (role_id) => ({
  type: 'SET_USER_ROLE',
  payload: role_id,
});
export const setUserName = (name) => ({
  type: 'SET_USER_NAME',
  payload: name,
});

export const setUserAuthenticated = (isAuthenticated) => ({
  type: 'SET_USER_AUTHENTICATED',
  payload: isAuthenticated,
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const filterProductsByCategory = (categories) => ({
  type: 'FILTER_PRODUCTS_BY_CATEGORY',
  payload: categories,
});

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const sortProducts = (sortBy) => ({
  type: 'SORT_PRODUCTS',
  payload: sortBy,
});

export const editProduct = (product) => ({
  type: 'EDIT_PRODUCT',
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: 'DELETE_PRODUCT',
  payload: productId,
});


export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };
};


export const saveProduct = (product) => async (dispatch) => {
  const isEdit = !!product._id;

  const url = isEdit
    ? `https://diploma-r63e.onrender.com/products/${product._id}`
    : `https://diploma-r63e.onrender.com/products`;

  const method = isEdit ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  dispatch({
    type: isEdit ? 'EDIT_PRODUCT' : 'ADD_PRODUCT',
    payload: data,
  });
};


export const removeProduct = (productId) => {
  return async (dispatch) => {
    const token = 'token'; 
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,  // Добавляем токен в заголовок
        },
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении данных');
      }
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
    }
  };
};




export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});


export const removeFromCart = (product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});


export const increaseQuantity = (product) => ({
  type: 'INCREASE_QUANTITY',
  payload: product,
});


export const decreaseQuantity = (product) => ({
  type: 'DECREASE_QUANTITY',
  payload: product,
});

export const setSearchQuery = (query) => ({
  type: 'SET_SEARCH_QUERY',
  payload: query,
});

export const filterProductsBySearch = (products) => ({
  type: 'FILTER_PRODUCTS_BY_SEARCH',
  payload: products,
});