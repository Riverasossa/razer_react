import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/header/index.tsx";
import Footer from "./components/footer/index.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </RecoilRoot>
);
