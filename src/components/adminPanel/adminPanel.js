import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, saveProduct, removeProduct } from '../../actions';
import useProductForm from '../../hooks/useProductForm';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProducts.products);
  const [activeTab, setActiveTab] = useState('products'); // 'products' или 'warehouse'

  const { product, handleInputChange, resetForm, setEditingProduct } = useProductForm({
    id: '',
    name: '',
    price: '',
    photo: '',
    category: '',
    quantity: 0, // Добавляем поле количества
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(p => p._id === productId); 
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setActiveTab('products'); // Переключаем на вкладку продуктов при редактировании
    } else {
      console.error('Товар не найден');
    }
  };
  
  const handleSaveProduct = async () => {
    const isExistingProduct = products.some(p =>
      p.name === product.name &&
      p.price === product.price &&
      p.category === product.category
    );

    if (isExistingProduct) {
      alert('Товар с такими параметрами уже существует!');
      return;
    }

    try {
      const response = await fetch('https://diploma-r63e.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении товара');
      }

      const newProduct = await response.json();
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      resetForm();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при добавлении товара');
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
  try {
    const response = await fetch(`https://diploma-r63e.onrender.com/api/products/${productId}/quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
      credentials: 'omit' // Важно при использовании '*'
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении количества');
    }

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
    dispatch(removeProduct(productId));
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
            <h5>{product._id ? 'Редактирование товара' : 'Добавление нового товара'}</h5>
            
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
              {product._id ? 'Сохранить изменения' : 'Добавить товар'}
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
          {activeTab === 'products' && products.map(product => (
            <div key={product._id} className="productItem">
              <img src={product.photo} alt={product.name} width="50" />
              <span className="productName">{product.name}</span>
              <span className="productPrice">{product.price} руб.</span>
              <span className="productCategory">{product.category}</span>
              <button onClick={() => handleEditProduct(product._id)}>Редактировать</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Удалить</button>
            </div>
          ))}

          {activeTab === 'warehouse' && products.map(product => (
            <div key={product._id} className="warehouseItem">
              <img src={product.photo} alt={product.name} width="50" />
              <span className="productName">{product.name}</span>
              <div className="quantityControls">
                <button onClick={() => handleUpdateQuantity(product._id, (product.quantity || 0) - 1)}>-</button>
                <span className="productQuantity">{product.quantity || 0}</span>
                <button onClick={() => handleUpdateQuantity(product._id, (product.quantity || 0) + 1)}>+</button>
              </div>
              <input
                type="number"
                value={product.quantity || 0}
                onChange={(e) => handleUpdateQuantity(product._id, parseInt(e.target.value) || 0)}
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