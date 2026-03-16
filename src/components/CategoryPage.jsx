import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";

function CategoryPage({ products, onAddToCart }) {

  const { category } = useParams();

  const filteredProducts = products.filter(
    product => product.category === category
  );

  return (

    <div className="category-page">

      <h2>{category} Products</h2>

      <ProductList
        products={filteredProducts}
        onAddToCart={onAddToCart}
      />

      {filteredProducts.length === 0 && (
        <p>No products found</p>
      )}

    </div>

  );
}

export default CategoryPage;