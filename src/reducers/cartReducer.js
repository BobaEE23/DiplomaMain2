const initialState = {
  items: [], // Список товаров в корзине
  total: 0, // Итоговая стоимость корзины (число)
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        const updatedItems = state.items.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + newItem.price, // Увеличиваем итоговую стоимость
        };
      } else {
        // Если товара нет, добавляем его в корзину
        const updatedItems = [...state.items, { ...newItem, quantity: 1 }];
        return {
          ...state,
          items: updatedItems,
          total: state.total + newItem.price, // Увеличиваем итоговую стоимость
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const itemToRemove = action.payload;
      const itemInCart = state.items.find(item => item.id === itemToRemove.id);

      if (itemInCart.quantity > 1) {
        // Если количество товара больше 1, уменьшаем количество
        const updatedItems = state.items.map(item =>
          item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToRemove.price, // Уменьшаем итоговую стоимость
        };
      } else {
        // Если количество товара равно 1, удаляем его из корзины
        const updatedItems = state.items.filter(item => item.id !== itemToRemove.id);
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToRemove.price, // Уменьшаем итоговую стоимость
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
        total: state.total + itemToIncrease.price, // Увеличиваем итоговую стоимость
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
        total: state.total - itemToDecrease.price, // Уменьшаем итоговую стоимость
      };
    }

    default:
      return state;
  }
};

export default cartReducer;