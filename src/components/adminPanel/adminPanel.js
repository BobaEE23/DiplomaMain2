import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, saveProduct, removeProduct } from '../../actions';
import useProductForm from '../../hooks/useProductForm';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProducts.products);

  const { product, handleInputChange, resetForm, setEditingProduct } = useProductForm({
    id: '',
    name: '',
    price: '',
    photo: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(p => p._id === productId); // изменить на _id
    if (productToEdit) {
      setEditingProduct(productToEdit);
    } else {
      console.error('Товар не найден');
    }
  };
  
  const handleSaveProduct = () => {
    if (product._id) {  // изменить на _id
      dispatch(saveProduct(product));
    } else {
      console.error('ID товара отсутствует');
    }
    resetForm();
  };
  

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <div className="container">
      <div className="adminPanel">
        <div className="adminChangeBlock">
          <h5>Редактирование товара</h5>
          <input
            className="adminInput"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Название"
          />
          <input
            className="adminInput"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Цена"
          />
          <input
            className="adminInput"
            name="photo"
            value={product.photo}
            onChange={handleInputChange}
            placeholder="Фото"
          />
          <select
            className="adminSelect"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="Системы оповещения">Системы оповещения</option>
            <option value="Монтажные услуги">Монтажные услуги</option>
            <option value="Огнетушители">Огнетушители</option>
            <option value="Снаряжение для безопасности">Снаряжение для безопасности</option>
            <option value="Системы пожаротушения">Системы пожаротушения</option>
          </select>
          <button onClick={handleSaveProduct} disabled={!product._id}>
            Сохранить
          </button>
        </div>
        <div className="adminInfo">
          {products.map(product => (
            <div key={product._id} className="productItem">
              
              <span className="productName">{product.name}</span>
              <span className="productPrice">{product.price}</span>
              <span className="productCategory">{product.category}</span>
              <button className="editButton" onClick={() => handleEditProduct(product._id)}>Редактировать</button>
              <button className="deleteButton" onClick={() => handleDeleteProduct(product._id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};