import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { wishlistState } from "../states/wishlist-state";
import { authState } from "../states/auth-state";

const API_URL = "http://localhost:8081/wishlist/me";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const auth = useRecoilValue(authState);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Fetched wishlist data:", response.data); 
      setWishlist(response.data.products);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      await axios.post(
        "http://localhost:8081/wishlist/me/add-products",
        { productIds: [productId] },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchWishlist();
    } catch (error) {
      console.error("Error adding product to wishlist: ", error);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8081/wishlist/me/remove-product/${productId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error removing product from wishlist: ", error);
    }
  };

  const decreaseProductQuantity = async (productId: number) => {
    try {
      await axios.patch(`http://localhost:8081/wishlist/me/decrease-product-quantity/${productId}`, null,{
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error decreasing product quantity: ", error);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete("http://localhost:8081/wishlist/me/clear-wishlist", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error clearing wishlist: ", error);
    }
  };
  return { wishlist, fetchWishlist, addToWishlist, removeFromWishlist, decreaseProductQuantity, clearWishlist };
};
