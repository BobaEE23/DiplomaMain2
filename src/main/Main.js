import React, { useState } from 'react';
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";

export const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mainPage">
      <div className="container">
        <input
          className="searchInput"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="mainContentPage">
          <Categories />
          <div className="productsSection">
            <Sort />
            <Products searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};