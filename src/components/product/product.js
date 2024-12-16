import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../actions';

export const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector(state => state.products.products);
  const product = products.find(p => p._id === id);


  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="productDetail">
      <img src={product.photo || 'https://via.placeholder.com/300'} alt={product.name} />
      <div className="productInfo">
        <h2>{product.name}</h2>
        <div>ID: {product.id}</div>
        <div>Стоимость: {product.price} руб.</div>
        <div>Категория: {product.category}</div>
      </div>
    </div>
  );
};