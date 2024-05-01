import React from "react";
import ProductDetailsPage from "../../components/product-details";
import ProductsCarousel from "../../components/carousel";

const ProductsListPage = () => {
  return (
    <div>
      <ProductDetailsPage></ProductDetailsPage>
      <ProductsCarousel></ProductsCarousel>
    </div>
  );
};

export default ProductsListPage;
