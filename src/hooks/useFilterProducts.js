import { useMemo } from 'react';

const useFilterProducts = (products, searchQuery, selectedCategories) => {
  const filteredProducts = useMemo(() => {
    // Фильтрация по категориям
    const filteredByCategory = products.filter(product =>
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    );

    // Фильтрация по поисковому запросу
    const filteredBySearch = filteredByCategory.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredBySearch;
  }, [products, searchQuery, selectedCategories]);

  return filteredProducts;
};

export default useFilterProducts;