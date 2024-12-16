import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../actions';

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  return (
    <div className="cart">
      <div className="container">
        <input
          className="searchInput"
          placeholder="Поиск в корзине..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h2>Корзина</h2>
        <div className="cartContent">
          <div className="cartProducts">
            {filteredCartItems.map(item => (
              <div key={item.id} className="cartProduct">
                <div className="cartProductPhoto">Photo</div>
                
                <h5 className="cartProductName">{item.name}</h5>
                <div className="quantityControl">
                  <button className="cartProductBtn" onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <h5 className="cartProductCount">{item.quantity}</h5>
                  <button className="cartProductBtn" onClick={() => handleIncreaseQuantity(item)}>+</button>
                </div>
                <h5 className="cartProductPrice">{item.price} руб.</h5>
                <button className="cartProductBtn" onClick={() => handleRemoveFromCart(item)}>Удалить из корзины</button>
              </div>
            ))}
          </div>
          <div className="cartSum">
            <div className="sum">Итого: {total} руб.</div>
            <button className="createZakaz">оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
};