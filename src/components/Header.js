import React from "react";
import "./Header.css";

function Header({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="header-right">
        {/* Dark/Light Mode Toggle */}
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Notification */}
        <div className="notification">🔔</div>

        {/* User Avatar */}
        <div className="avatar">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
