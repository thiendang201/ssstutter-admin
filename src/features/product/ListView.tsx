import { useCategories } from 'api/categoryApi';
import * as React from 'react';

const ProductListView = () => {
  const { categories } = useCategories();

  return <div>Product list view</div>;
};

export default ProductListView;
