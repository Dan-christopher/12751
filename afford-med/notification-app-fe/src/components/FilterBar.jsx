import { useState } from "react";
import "../styles/FilterBar.css";

function FilterBar({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <h3 className="filter-title">📋 Filter Notifications</h3>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${selectedFilter === "high" ? "active" : ""}`}
            onClick={() => handleFilterChange("high")}
          >
            High Priority
          </button>
          <button
            className={`filter-btn ${selectedFilter === "medium" ? "active" : ""}`}
            onClick={() => handleFilterChange("medium")}
          >
            Medium
          </button>
          <button
            className={`filter-btn ${selectedFilter === "low" ? "active" : ""}`}
            onClick={() => handleFilterChange("low")}
          >
            Low
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
