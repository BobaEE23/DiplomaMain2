const initialState = {
  role_id: null, 
  name: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return { ...state, role_id: action.payload }; 
    case 'SET_USER_NAME':
      return { ...state, name: action.payload };
    case 'SET_USER_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

export default userReducer;