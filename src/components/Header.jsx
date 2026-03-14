import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ cartItemCount, onCartClick, searchTerm, onSearchChange }) {

  return (
    <header className="header">
      <div className="header-container">

        {/* Top row */}
        <div className="header-content">

          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
          </Link>

          <button className="cart-icon-btn" onClick={onCartClick}>
            🛒
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>

        </div>

        {/* Navigation */}
        <nav className="header-nav">

          <Link to="/" className="nav-link">Home</Link>

          <Link to="/category/Electronics" className="nav-link">
            Electronics
          </Link>

          <Link to="/category/Accessories" className="nav-link">
            Accessories
          </Link>

          <Link to="/category/Home" className="nav-link">
            Home
          </Link>

          <Link to="/category/Sports" className="nav-link">
            Sports
          </Link>

          <Link to="/cart" className="nav-link">
            Cart
          </Link>

        </nav>

        {/* Search */}
        <div className="search-container">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />

        </div>

      </div>
    </header>
  );
}

export default Header;