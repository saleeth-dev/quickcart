import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar";

import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import CartPage from "./components/CartPage";

import { products } from "./data/products";

import "./styles/App.css";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("quickcart-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("quickcart-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }

  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (

    <BrowserRouter>

      <div className="app">

        <Header
          cartItemCount={getTotalItems()}
          onCartClick={toggleCart}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                />
              }
            />

            <Route
              path="/category/:category"
              element={
                <CategoryPage
                  products={products}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />

          </Routes>

        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={toggleCart}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

      </div>

    </BrowserRouter>

  );
}

export default App;