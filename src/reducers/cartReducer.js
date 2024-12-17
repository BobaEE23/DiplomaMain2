const initialState = {
  items: [], 
  total: 0, 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
       
        const updatedItems = state.items.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + newItem.price, 
        };
      } else {
        
        const updatedItems = [...state.items, { ...newItem, quantity: 1 }];
        return {
          ...state,
          items: updatedItems,
          total: state.total + newItem.price, 
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const itemToRemove = action.payload;
      const itemInCart = state.items.find(item => item.id === itemToRemove.id);

      if (itemInCart.quantity > 1) {
       
        const updatedItems = state.items.map(item =>
          item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToRemove.price, 
        };
      } else {
        
        const updatedItems = state.items.filter(item => item.id !== itemToRemove.id);
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToRemove.price, 
        };
      }
    }

    case 'INCREASE_QUANTITY': {
      const itemToIncrease = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === itemToIncrease.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        items: updatedItems,
        total: state.total + itemToIncrease.price,
      };
    }

    case 'DECREASE_QUANTITY': {
      const itemToDecrease = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === itemToDecrease.id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        total: state.total - itemToDecrease.price, 
      };
    }

    default:
      return state;
  }
};

export default cartReducer;