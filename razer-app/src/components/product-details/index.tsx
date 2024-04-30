import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/product-service"; // Importa el servicio ProductService
import { Product } from "../../models/product"; // Importa el tipo de dato Product desde el modelo
import "./details.scss";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null); // Especifica el tipo del estado product
  const { id } = useParams<{ id: string }>(); // Asegúrate de que id sea siempre una cadena

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return; // Si id es undefined, no hagas la petición

        const products = await ProductService.getProducts(); // Obtén la lista de productos usando el servicio
        const foundProduct = products.find(
          (product) => product.id === parseInt(id)
        ); // Encuentra el producto con el ID correspondiente

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="img-details-container">
        <img
          src={`/${product.image}`}
          alt="Product Image"
          className="img-fluid"
        />
      </div>

      <div className="info-details-container ">
        <h2 id="product-name-details">{product.name}</h2>
        <p>{product.summary}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
