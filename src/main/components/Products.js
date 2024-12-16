import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../../actions';
import useFilterProducts from '../../hooks/useFilterProducts';

export const Products = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { products, sortBy } = useSelector(state => state.products);
  const selectedCategories = useSelector(state => state.categories.selectedCategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchProducts());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredProducts = useFilterProducts(products, searchQuery, selectedCategories);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="products">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        sortedProducts.map(product => (
          <Link
            key={product._id}
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
              handleAddToCart(product);
            }}>
              Добавить в корзину
            </button>
          </Link>
        ))
      )}
    </div>
  );
};