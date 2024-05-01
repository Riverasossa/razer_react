import { useRecoilState } from "recoil";
import { cartState } from "../states/cart-state";
import { Product } from "../models/product"; // Importa el modelo de producto

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[product.id]) {
        updatedCart[product.id].quantity++;
      } else {
        updatedCart[product.id] = { product, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const updateCartItem = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] = { ...updatedCart[productId], quantity };
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return { cart, addToCart, updateCartItem, removeFromCart, clearCart };
};
