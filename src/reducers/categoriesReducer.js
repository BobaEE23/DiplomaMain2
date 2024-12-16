// src/reducers/categoriesReducer.js
const initialState = {
  selectedCategories: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        selectedCategories: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;