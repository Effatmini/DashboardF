import React from "react";
import "./Navbar.css";

function Navbar({
  darkMode,
  onAddSaleClick,
  onManageProductsClick,
  onDarkModeToggle,
  selectedMonth,
  setSelectedMonth,
  months,
}) {
  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <h2 className="logo">V Dashboard </h2>
      </div>

      <div className="navbar-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-select"
        >
          <option value="All">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="navbar-right">
        <button className="nav-btn" onClick={onAddSaleClick}>
          ➕ Add Sale
        </button>
        <button className="nav-btn" onClick={onManageProductsClick}>
          🛠 Manage Products
        </button>
        <button className="nav-btn" onClick={onDarkModeToggle}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
