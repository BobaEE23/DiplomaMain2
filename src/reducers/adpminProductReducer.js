// src/reducers/adminProductReducer.js
const initialState = {
  products: [],
};

const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product // фильтрация по _id
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload), // фильтрация по _id
      };
    default:
      return state;
  }
};

export default adminProductReducer;

