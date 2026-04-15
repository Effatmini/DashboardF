import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import SalesLineChart from "./components/SalesLineChart";
import SalesBarChart from "./components/SalesBarChart";
import SalesPieChart from "./components/SalesPieChart";
import ProductsBar from "./components/ProductsBar";
import AddSale from "./pages/AddSale";
import ProductsPopup from "./components/productspopup";
import "./App.css";

// ================== MOVE OUTSIDE COMPONENT ==================
const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAddSaleForm, setShowAddSaleForm] = useState(false);
  const [showProductsPopup, setShowProductsPopup] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalSales, setTotalSales] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [profit, setProfit] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================== Fetch Dashboard Data ==================
  const fetchDashboardData = useCallback(() => {
    setLoading(true);

    fetch("https://backend-production-f569.up.railway.app/total_sales")
      .then(res => res.json())
      .then(data => setTotalSales(data.total_sales))
      .catch(console.error);

    fetch("https://backend-production-f569.up.railway.app/customers_count")
      .then(res => res.json())
      .then(data => setCustomers(data.total_customers))
      .catch(console.error);

    fetch("https://backend-production-f569.up.railway.app/total_profit")
      .then(res => res.json())
      .then(data => setProfit(data.total_profit))
      .catch(console.error);

    fetch("https://backend-production-f569.up.railway.app/monthly_sales")
      .then(res => res.json())
      .then(data => {
        const orderedData = months.map(month => {
          const monthData = data.find(d => d.month === month);
          return monthData || { month, sales: 0, profit: 0, customers: 0 };
        });

        setMonthlyData(orderedData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ================== Initial Load ==================
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const filteredData =
    !selectedMonth || selectedMonth === "All"
      ? monthlyData
      : monthlyData.filter(item => item.month === selectedMonth);

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <Navbar
        darkMode={darkMode}
        onAddSaleClick={() => setShowAddSaleForm(true)}
        onManageProductsClick={() => setShowProductsPopup(true)}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        filteredData={filteredData}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        months={months}
      />

      <div className="main-content">

        {/* Cards */}
        <div className="cards">
          <StatsCard title="Total Sales" value={loading ? "Loading..." : `$${totalSales}`} icon="💰" />
          <StatsCard title="Customers" value={loading ? "Loading..." : customers} icon="👥" />
          <StatsCard title="Profit" value={loading ? "Loading..." : `$${profit}`} icon="📈" />
        </div>

        {/* Pie + Products */}
        <div className="pie-products-row">
          <div className="chart-pie-half">
            <SalesPieChart data={filteredData} />
          </div>

          <div className="products-bar-half">
            <ProductsBar
              selectedMonth={selectedMonth === "All" ? "" : selectedMonth}
              refreshFlag={refreshProducts}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          <div className="chart-container">
            <h2>Profit Over Months</h2>
            <SalesLineChart data={filteredData} />
          </div>

          <div className="chart-container">
            <h2>Monthly Sales</h2>
            <SalesBarChart data={filteredData} />
          </div>
        </div>

      </div>

      {/* Add Sale Modal */}
      {showAddSaleForm && (
        <AddSale
          onClose={() => setShowAddSaleForm(false)}
          onSaleAdded={() => {
            fetchDashboardData();
            setRefreshProducts(prev => prev + 1);
          }}
        />
      )}

      {/* Products Popup */}
      {showProductsPopup && (
        <ProductsPopup
          onClose={() => setShowProductsPopup(false)}
          onProductsUpdated={() => {
            fetchDashboardData();
            setRefreshProducts(prev => prev + 1);
          }}
        />
      )}
    </div>
  );
}

export default App;