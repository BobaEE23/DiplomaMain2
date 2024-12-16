import React from 'react';

export const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cartProduct">
      <div className="cartProductPhoto">Photo</div>
      <h4 className="cartProductId">{item.id}</h4>
      <h5 className="cartProductName">{item.name}</h5>
      <div className="quantityControl">
        <button className="cartProductBtn" onClick={() => onDecrease(item)}>-</button>
        <h5 className="cartProductCount">{item.quantity}</h5>
        <button className="cartProductBtn" onClick={() => onIncrease(item)}>+</button>
      </div>
      <h5 className="cartProductPrice">{item.price} руб.</h5>
      <button className="cartProductBtn" onClick={() => onRemove(item)}>Удалить из корзины</button>
    </div>
  );
};