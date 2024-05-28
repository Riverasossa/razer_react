import axios from "axios";
import { Product } from "../models/product";

const API_URL = "http://localhost:8081/products";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  },

  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}: `, error);
      return null;
    }
  },

  async deleteProduct(id: number, token: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting product with id ${id}: `, error);
    }
  },

  async createProduct(product: Product, token: string): Promise<void> {
    try {
      await axios.post(API_URL, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  },

  async updateProduct(id: number, product: Product, token: string): Promise<void> {
    try {
      await axios.put(`${API_URL}/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error updating product with id ${id}: `, error);
    }
  },
};

export const getCarouselProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 9);
  } catch (error) {
    console.error("Error fetching carousel products: ", error);
    return [];
  }
};
