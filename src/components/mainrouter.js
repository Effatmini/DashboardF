import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import AddSale from ".pages/AddSale";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-sale" element={<AddSale />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
