import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./views/login-page";
import HomePage from "./views/home-page";
import ProductsListPage from "./views/products-list-page";
import ProductDetailsPage from "./views/product-details-page";
import CartPage from "./views/cart-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products-list" element={<ProductsListPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default App;
