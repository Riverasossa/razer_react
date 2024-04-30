import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/login-page";
import HomePage from "./views/home-page";
import ProductsListPage from "./views/products-list-page";
import ProductDetailsPage from "./views/product-details-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products-list" element={<ProductsListPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default App;
