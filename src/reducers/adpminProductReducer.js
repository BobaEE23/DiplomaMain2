
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
          product._id === action.payload._id ? action.payload : product 
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload), 
      };
      case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p => 
          p._id === action.payload._id ? action.payload : p
        )
      };
    default:
      return state;
  }
};

export default adminProductReducer;

