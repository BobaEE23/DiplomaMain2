import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, filterProductsByCategory } from '../../actions';

export const Categories = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(state => state.categories.selectedCategories);

  const handleCategoryChange = (event) => {
    const category = event.target.id;
    const isChecked = event.target.checked;

    let newSelectedCategories = [...selectedCategories];
    if (isChecked) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories = newSelectedCategories.filter(cat => cat !== category);
    }

    dispatch(setCategories(newSelectedCategories));
    dispatch(filterProductsByCategory(newSelectedCategories));
  };

  return (
    <div className="categories">
      <div className="category">
        <input
          type="checkbox"
          id="Системы оповещения"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('Системы оповещения')}
        />
        <label htmlFor="Системы оповещения">Системы оповещения</label>
      </div>
      <div className="category">
        <input
          type="checkbox"
          id="Монтажные услуги"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('Монтажные услуги')}
        />
        <label htmlFor="Монтажные услуги">Монтажные услуги</label>
      </div>
      <div className="category">
        <input
          type="checkbox"
          id="Огнетушители"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('Огнетушители')}
        />
        <label htmlFor="Огнетушители">Огнетушители</label>
      </div>
      <div className="category">
        <input
          type="checkbox"
          id="Снаряжение для безопасности"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('Снаряжение для безопасности')}
        />
        <label htmlFor="Снаряжение для безопасности">Снаряжение для безопасности</label>
      </div>
      <div className="category">
        <input
          type="checkbox"
          id="Системы пожаротушения"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('Системы пожаротушения')}
        />
        <label htmlFor="Системы пожаротушения">Системы пожаротушения</label>
      </div>
    </div>
  );
};