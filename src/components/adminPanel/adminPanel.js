import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, saveProduct, removeProduct } from '../../actions';
import useProductForm from '../../hooks/useProductForm';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProducts.products);
  const [activeTab, setActiveTab] = useState('products');

  const { product, handleInputChange, resetForm, setEditingProduct } = useProductForm({
    id: '',
    name: '',
    price: '',
    photo: '',
    category: '',
    quantity: 0,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(p => p._id === productId); 
    if (productToEdit) {
      setEditingProduct({
        ...productToEdit,
        id: productToEdit._id // Убедимся, что id установлен
      });
      setActiveTab('products');
    } else {
      console.error('Товар не найден');
    }
  };
  
  const handleSaveProduct = async () => {
    try {
      const method = product.id ? 'PUT' : 'POST';
      const url = product.id 
        ? `https://diploma-r63e.onrender.com/api/products/${product.id}`
        : 'https://diploma-r63e.onrender.com/api/products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          photo: product.photo,
          category: product.category,
          quantity: product.quantity
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка при ${product.id ? 'обновлении' : 'добавлении'} товара`);
      }

      const savedProduct = await response.json();
      
      if (product.id) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: savedProduct });
      } else {
        dispatch({ type: 'ADD_PRODUCT', payload: savedProduct });
      }
      
      resetForm();
    } catch (error) {
      console.error('Ошибка:', error);
      alert(`Ошибка при ${product.id ? 'обновлении' : 'добавлении'} товара`);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`https://diploma-r63e.onrender.com/api/products/${productId}/quantity`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: Math.max(0, newQuantity) }),
        credentials: 'omit'
      });

      if (!response.ok) throw new Error('Ошибка при обновлении количества');

      const updatedProduct = await response.json();
      dispatch({ type: 'UPDATE_PRODUCT_QUANTITY', payload: updatedProduct });
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при обновлении количества');
    }
  };

  const handleAddNewProduct = () => {
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(removeProduct(productId));
      if (product.id === productId) {
        resetForm();
      }
    }
  };

  return (
    <div className="container">
      <div className="adminPanel">
        <div className="adminTabs">
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Управление товарами
          </button>
          <button 
            className={activeTab === 'warehouse' ? 'active' : ''}
            onClick={() => setActiveTab('warehouse')}
          >
            Управление складом
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="adminChangeBlock">
            <h5>{product.id ? 'Редактирование товара' : 'Добавление нового товара'}</h5>
            
            <button onClick={handleAddNewProduct}>Новый товар</button>
            
            <input
              className="adminInput"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Название"
              required
            />
            <input
              className="adminInput"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Цена"
              type="number"
              required
            />
            <input
              className="adminInput"
              name="photo"
              value={product.photo}
              onChange={handleInputChange}
              placeholder="Ссылка на фото"
              required
            />
            <input
              className="adminInput"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              placeholder="Количество на складе"
              type="number"
              min="0"
              required
            />
            <select
              className="adminSelect"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите категорию</option>
              <option value="Системы оповещения">Системы оповещения</option>
              <option value="Монтажные услуги">Монтажные услуги</option>
              <option value="Огнетушители">Огнетушители</option>
              <option value="Снаряжение для безопасности">Снаряжение для безопасности</option>
              <option value="Системы пожаротушения">Системы пожаротушения</option>
            </select>
            
            <button onClick={handleSaveProduct}>
              {product.id ? 'Сохранить изменения' : 'Добавить товар'}
            </button>
          </div>
        )}

        {activeTab === 'warehouse' && (
          <div className="warehouseBlock">
            <h2>Управление складом</h2>
            <div className="warehouseSummary">
              <h3>Общее количество товаров на складе: {products.reduce((sum, p) => sum + (p.quantity || 0), 0)}</h3>
            </div>
          </div>
        )}
        
        <div className="adminInfo">
          {activeTab === 'products' && products.map(p => (
            <div key={p._id} className="productItem">
              <img src={p.photo} alt={p.name} width="50" />
              <span className="productName">{p.name}</span>
              <span className="productPrice">{p.price} руб.</span>
              <span className="productCategory">{p.category}</span>
              <button 
                className="editButton"
                onClick={() => handleEditProduct(p._id)}
              >
                Редактировать
              </button>
              <button 
                className="deleteButton"
                onClick={() => handleDeleteProduct(p._id)}
              >
                Удалить
              </button>
            </div>
          ))}

          {activeTab === 'warehouse' && products.map(p => (
            <div key={p._id} className="warehouseItem">
              <img src={p.photo} alt={p.name} width="50" />
              <span className="productName">{p.name}</span>
              <div className="quantityControls">
                <button 
                  onClick={() => handleUpdateQuantity(p._id, (p.quantity || 0) - 1)}
                  disabled={p.quantity <= 0}
                >
                  -
                </button>
                <span className="productQuantity">{p.quantity || 0}</span>
                <button onClick={() => handleUpdateQuantity(p._id, (p.quantity || 0) + 1)}>
                  +
                </button>
              </div>
              <input
                type="number"
                value={p.quantity || 0}
                onChange={(e) => handleUpdateQuantity(p._id, parseInt(e.target.value) || 0)}
                min="0"
                className="quantityInput"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};