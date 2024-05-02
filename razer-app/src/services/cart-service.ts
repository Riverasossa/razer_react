import { useRecoilState } from "recoil";
import { cartState } from "../states/cart-state";
import { Product } from "../models/product";

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
    setCart((prevCart) =>
      Object.keys(prevCart).reduce((updatedCart, key) => {
        const numericKey = parseInt(key);
        if (!isNaN(numericKey) && numericKey === productId) {
          updatedCart[numericKey] = { ...prevCart[numericKey], quantity };
        } else {
          updatedCart[numericKey] = prevCart[numericKey];
        }
        return updatedCart;
      }, {} as Record<number, { product: Product; quantity: number }>)
    );
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
