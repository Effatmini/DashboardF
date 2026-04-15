import React, { useState, useEffect } from "react";

function ProductsBar({ refreshFlag, selectedMonth }) {
  const [products, setProducts] = useState([]);

  const fetchTopProducts = () => {
    let url = "https://backend-production-f569.up.railway.app/top_products";
    if (selectedMonth) url += `?month=${selectedMonth}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTopProducts();
  }, [refreshFlag, selectedMonth]);

  const maxSold =
    products.length > 0
      ? Math.max(...products.map(p => p.total_sold))
      : 0;

  return (
    <div
      style={{
        padding: 15,
        borderRadius: 16,

        background: "#1e293b",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",

        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* TITLE */}
      <h3 style={{ color: "#6366f1", marginBottom: 15 }}>
        Top Products
      </h3>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>Loading...</p>
      ) : (
        products.map((product, index) => {
          const widthPercent =
            maxSold > 0
              ? (product.total_sold / maxSold) * 100
              : 0;

          return (
            <div key={index} style={{ marginBottom: 15 }}>
              
              {/* NAME + COUNT */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span style={{ color: "#e2e8f0", fontWeight: 500 }}>
                  {product.name}
                </span>

                <span style={{ color: "#94a3b8", fontSize: 12 }}>
                  {product.total_sold.toLocaleString()} sold
                </span>
              </div>

              {/* PROGRESS BAR BG */}
              <div
                style={{
                  background: "#0f172a",
                  height: 10,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* PROGRESS */}
                <div
                  style={{
                    width: `${widthPercent}%`,
                    height: "100%",

                    background:
                      "linear-gradient(90deg, #6366f1, #22c55e)",

                    borderRadius: 8,
                    transition: "0.4s ease",
                  }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProductsBar;