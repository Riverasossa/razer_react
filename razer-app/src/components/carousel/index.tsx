import { useEffect, useState } from "react";
import { getCarouselProducts } from "../../services/product-service";
import { Carousel, CardGroup } from "react-bootstrap";
import ProductCard from "../card/";
import { Product } from "../../models/product";
import "./carousel.scss";
import { useNavigate } from "react-router-dom";

const ProductsCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarouselProducts = async () => {
      try {
        const products = await getCarouselProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching carousel products: ", error);
      }
    };

    fetchCarouselProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Actualizar el estado según el tamaño de la pantalla
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const determineSlidesToShow = () => {
    return isMobile ? 1 : 3; // Determinar la cantidad de productos por slide según el tamaño de la pantalla
  };

  const slidesToShow = determineSlidesToShow();
  const totalSlides = Math.ceil(products.length / slidesToShow);

  const handleViewAllProducts = () => {
    navigate("/products-list");
  };

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">BEST SELLERS</h2>
      <section className="disclaimer">
        <p className="disclaimer__description">
          Join the hype train with the hottest products in our arsenal
        </p>
        <button onClick={handleViewAllProducts} className="disclaimer__link">
          View All Products
        </button>
      </section>
      <Carousel interval={null}>
        {[...Array(totalSlides)].map((_, index) => (
          <Carousel.Item key={index} className={isMobile ? "mobile-slide" : ""}>
            <CardGroup>
              {products
                .slice(index * slidesToShow, (index + 1) * slidesToShow)
                .map((product, innerIndex) => (
                  <ProductCard key={innerIndex} product={product} />
                ))}
            </CardGroup>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
