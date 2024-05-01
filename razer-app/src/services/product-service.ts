import axios from "axios";
import { Product } from "../models/product";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get("/data/products.json");
      return response.data.Products;
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  }
};


export const getCarouselProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get("/data/products.json");
    return response.data.Products.slice(0, 9);
  } catch (error) {
    console.error("Error fetching carousel products: ", error);
    return [];
  }
};
