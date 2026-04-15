import React, { useState } from "react";
import "./Sidebar.css"; // هنستخدم نفس ستايل السايدبار
import "./Navbar.css"; // ملف خفيف إضافي لتعديل الاتجاه فقط

function Navbar({ darkMode, onAddSaleClick, onManageProductsClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <h2>Menu</h2>
      </div>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <a href="#">Dashboard</a>
        <a href="#">Sales</a>
        <a href="#">Customers</a>
        <a href="#">Reports</a>
        <a href="#">Settings</a>

        <button className="add-sale-btn" onClick={onAddSaleClick}>
          Add Sale
        </button>
        <button className="manage-products-btn" onClick={onManageProductsClick}>
          Manage Products
        </button>
      </nav>

      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
