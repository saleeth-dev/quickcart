import React from "react";
import ProductList from "./ProductList";

function HomePage({ products, onAddToCart, searchTerm }) {

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {searchTerm && (
        <p>Found {filteredProducts.length} products</p>
      )}

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

export default HomePage;