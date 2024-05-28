import { Route, Routes } from "react-router-dom";
import Sidebar from "../sidebar";
import Products from "../admin-product";
import Orders from "../orders";
import "./backoffice.scss";

const Backoffice = () => {
  return (
    <div className="backoffice">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Backoffice;
