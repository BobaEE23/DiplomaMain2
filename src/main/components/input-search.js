import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch as BaseInputSearch } from '../../reUseComponents/Input';
import { setSearchQuery, filterProductsBySearch } from '../../actions';

export const InputSearch = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); 

  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query)); 
    dispatch(filterProductsBySearch({ products })); 
  };

  return (
    <BaseInputSearch
      placeholder="Поиск товара / услуги..."
      onChange={handleSearchChange}
    />
  );
};