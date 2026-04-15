// src/pages/AddSale.js
import React, { useState, useEffect } from "react";

function AddSale({ onClose, onSaleAdded }) {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [message, setMessage] = useState("");

  // جلب المنتجات من السيرفر
  useEffect(() => {
    fetch("https://backend-production-f569.up.railway.app/products") // تأكد إن هذا المسار يجيب المنتجات
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !quantity || !saleDate) {
      alert("Please fill all fields!");
      return;
    }

    fetch("https://backend-production-f569.up.railway.app/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        quantity,
        sale_date: saleDate
      })
    })
      .then(res => res.json())
      .then(() => {
        setMessage("Sale added successfully!");
        setProductId("");
        setQuantity("");
        setSaleDate("");
        onSaleAdded(); // تحديث الداشبورد
        setTimeout(() => onClose(), 1000); // اقفل الفورم بعد ثانية
      })
      .catch(err => {
        console.error("Error adding sale:", err);
        setMessage("Error adding sale.");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add New Sale</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product:</label>
            <select
              value={productId}
              onChange={e => setProductId(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sale Date:</label>
            <input
              type="date"
              value={saleDate}
              onChange={e => setSaleDate(e.target.value)}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Add Sale</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSale;
