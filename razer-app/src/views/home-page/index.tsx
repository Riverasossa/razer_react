import React from "react";
import Hero from "../../components/hero";
import InfoCards from "../../components/info-cards";
import ProductsCarousel from "../../components/carousel";

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <ProductsCarousel></ProductsCarousel>
      <InfoCards></InfoCards>
    </div>
  );
};

export default HomePage;
