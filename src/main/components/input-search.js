import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch as BaseInputSearch } from '../../reUseComponents/Input';
import { setSearchQuery, filterProductsBySearch } from '../../actions';

export const InputSearch = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); // Получаем все товары

  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query)); // Сохраняем поисковый запрос в Redux
    dispatch(filterProductsBySearch({ products })); // Фильтруем товары
  };

  return (
    <BaseInputSearch
      placeholder="Поиск товара / услуги..."
      onChange={handleSearchChange}
    />
  );
};