import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart.item) || [];
  const handleCart = () => {
    navigate('/cart');
  };
  const itemNum = cartItem.reduce((total, item) => total + item.count, 0);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="cart-icon" onClick={handleCart}>
          <FaCartPlus />
          <span className="cart-count">{itemNum}</span>
        </div>
        <div className="nav-links">
          <NavLink className="link" to="/categories/groceries">
            Groceries
          </NavLink>
          <NavLink className="link" to="/categories/furniture">
            Furniture
          </NavLink>
          <NavLink className="link" to="/categories/fragrances">
            Fragrances
          </NavLink>
          <NavLink className="link" to="/categories/beauty">
            Beauty
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
