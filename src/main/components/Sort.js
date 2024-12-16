import React from 'react';
import { useDispatch } from 'react-redux';
import { sortProducts } from '../../actions';

export const Sort = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(sortProducts(event.target.value));
  };

  return (
    <div className="sortDiv">
      <select className="sortSelect" onChange={handleSortChange}>
        <option value="priceAsc">Цена: по возрастанию</option>
        <option value="priceDesc">Цена: по убыванию</option>
        <option value="nameAsc">Имя: от А до Я</option>
        <option value="nameDesc">Имя: от Я до А</option>
      </select>
    </div>
  );
};