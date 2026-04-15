import React, { useState, useEffect } from "react";
import "./productspopup.css";

function ProductsPopup({ onClose, onProductAdded }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCost, setProductCost] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // جلب المنتجات الموجودة
  const fetchProducts = () => {
    fetch("https://backend-production-f569.up.railway.app//products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productCost) {
      alert("Please fill all fields!");
      return;
    }

    fetch("https://backend-production-f569.up.railway.app/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        price: parseFloat(productPrice),
        cost: parseFloat(productCost)
      })
    })
      .then(res => res.json())
      .then(() => {
        setMessage("Product added successfully!");
        setProductName("");
        setProductPrice("");
        setProductCost("");
        fetchProducts();
        
      })
      .catch(err => {
        console.error("Error adding product:", err);
        setMessage("Error adding product.");
      });
  };

  const handleDelete = (id) => {
  console.log("Deleting ID:", id);

  if (!window.confirm("Are you sure you want to delete this product?")) return;

  fetch(`https://backend-production-f569.up.railway.app//products/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      console.log("DELETE RESPONSE:", data);

      setMessage("Product deleted!");
      fetchProducts(); // refresh list
    })
    .catch(err => {
      console.error("Error deleting product:", err);
      setMessage("Error deleting product.");
    });
};
  return (
    <div className="products-popup-overlay">
      <div className="products-popup-content">
        <h2>Manage Products</h2>
        {message && <p className="products-message">{message}</p>}

        {/* Form لإضافة منتجات */}
        <form onSubmit={handleSubmit}>
          <div className="products-form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="products-form-group">
            <label>Price:</label>
            <input
              type="number"
              min="0"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="products-form-group">
            <label>Cost:</label>
            <input
              type="number"
              min="0"
              value={productCost}
              onChange={e => setProductCost(e.target.value)}
              required
            />
          </div>
          <div className="products-form-buttons">
            <button type="submit">Add Product</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>

        {/* قائمة المنتجات مع زر مسح */}
        <h3>Existing Products</h3>
        <ul className="products-list">
          {products.map(p => (
            <li key={p.id}>
              {p.name} - ${p.price} - Cost: ${p.cost}
              <button className="products-delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsPopup;
