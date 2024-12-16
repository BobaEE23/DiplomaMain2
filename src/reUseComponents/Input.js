// src/reUseComponents/Input.js
import React from 'react';

export const Input = ({ placeholder, className, ...props }) => {
  return <input className={className} placeholder={placeholder} {...props} />;
};

export const InputSearch = ({ value, onChange, placeholder }) => {
  return (
    <Input
      className="inputMain"
      placeholder={placeholder || "Поиск..."}
      value={value}
      onChange={onChange}
    />
  );
};