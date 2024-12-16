import { useState } from 'react';

const useProductForm = (initialState) => {
  const [product, setProduct] = useState(initialState);

  // Обработчик изменения полей формы
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Сброс формы
  const resetForm = () => {
    setProduct(initialState);
  };

  // Установка данных товара для редактирования
  const setEditingProduct = (productData) => {
    setProduct(productData);
  };

  return {
    product,
    handleInputChange,
    resetForm,
    setEditingProduct,
  };
};

export default useProductForm;