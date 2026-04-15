import React from "react";

function FilterComponent({ filter, setFilter, options, label }) {
  return (
    
    <div className="filter-component" style={{ margin: "20px 0" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>{label}:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "120px",
        }}
      >
        <option value="">All</option> {/* اختيار All */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        
      </select>
    </div>
  );
}

export default FilterComponent;
