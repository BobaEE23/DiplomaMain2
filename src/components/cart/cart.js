import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../actions';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const handleCreateOrder = () => {
    if (cartItems.length === 0) {
      alert('Ваша корзина пуста! Добавьте товары перед оформлением заказа.');
      return;
    }
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
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
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>Ваша корзина пуста</p>
            
          </div>
        ) : (
          <div className="cartContent">
            <div className="cartProducts">
              {filteredCartItems.length > 0 ? (
                filteredCartItems.map(item => (
                  <div key={item.id} className="cartProduct">
                    <h5 className="cartProductName">{item.name}</h5>
                    <div className="quantityControl">
                      <button className="cartProductBtn" onClick={() => handleDecreaseQuantity(item)}>-</button>
                      <h5 className="cartProductCount">{item.quantity}</h5>
                      <button className="cartProductBtn" onClick={() => handleIncreaseQuantity(item)}>+</button>
                    </div>
                    <h5 className="cartProductPrice">{item.price} руб.</h5>
                    <button className="cartProductBtn" onClick={() => handleRemoveFromCart(item)}>Удалить из корзины</button>
                  </div>
                ))
              ) : (
                <p>Товары по вашему запросу не найдены</p>
              )}
            </div>
            <div className="cartSum">
              <div className="sum">Итого: {total} руб.</div>
              <button 
                className="createZakaz" 
                onClick={handleCreateOrder}
                disabled={cartItems.length === 0}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Спасибо за заказ!</h3>
            <p>Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};