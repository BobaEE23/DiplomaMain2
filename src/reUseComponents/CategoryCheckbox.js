import React from 'react';

export const CategoryCheckbox = ({ category, checked, onChange }) => {
  return (
    <div className="category">
      <input
        type="checkbox"
        id={category}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={category}>{category}</label>
    </div>
  );
};