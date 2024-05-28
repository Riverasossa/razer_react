import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../states/cart-state";
import { authState } from "../states/auth-state";

const API_URL = "http://localhost:8081/shopping-cart/me";

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const auth = useRecoilValue(authState);

  const fetchCart = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Fetched cart data:", response.data); 
      setCart(response.data.products);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await axios.post(
        "http://localhost:8081/shopping-cart/me/add-products",
        { productIds: [productId] },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8081/shopping-cart/me/remove-product/${productId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  const decreaseProductQuantity = async (productId: number) => {
    try {
      await axios.patch(`http://localhost:8081/shopping-cart/me/decrease-product-quantity/${productId}`, null,{
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error decreasing product quantity: ", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:8081/shopping-cart/me/clear-cart", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };
  return { cart, fetchCart, addToCart, removeFromCart, decreaseProductQuantity, clearCart };
};
