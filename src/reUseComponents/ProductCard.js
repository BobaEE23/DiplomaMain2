import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="product"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <img src={product.photo || 'https://via.placeholder.com/150'} alt={product.name} />
      <div className="productInfo">
        
        <div>Название: {product.name}</div>
        <div>Стоимость: {product.price} руб.</div>
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        onAddToCart(product);
      }}>
        Добавить в корзину
      </button>
    </Link>
  );
};