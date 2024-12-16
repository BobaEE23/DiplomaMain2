import React from 'react';

export const InputSearch = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="searchInput"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};