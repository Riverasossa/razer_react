import { Routes, Route } from "react-router-dom";
import LoginPage from "./views/login-page";
import SignupPage from "./views/signup-page";
import HomePage from "./views/home-page";
import ProductsListPage from "./views/products-list-page";
import ProductDetailsPage from "./views/product-details-page";
import CartPage from "./views/cart-page";
import CheckoutPage from "./views/checkout-page";
import BackofficePage from "./views/backoffice-page";
import UpdateProductPage from "./views/update-product-page";
import WishlistPage from "./views/wishlist-page";
import UserOrdersPage from "./views/user-orders-page";
import AddProductPage from "./views/add-product-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/products-list" element={<ProductsListPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/user-orders/*" element={<UserOrdersPage />} />
      <Route
        path="/backoffice/products/edit/:id"
        element={<UpdateProductPage />}
      />
      <Route path="/backoffice/products/add" element={<AddProductPage />} />
      <Route path="/backoffice/*" element={<BackofficePage />} />
      <Route path="/wishlist/*" element={<WishlistPage />} />
    </Routes>
  );
};

export default App;
