import React, { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import WishlistItem from "../wishlist-item";
import { useCart } from "../../services/cart-service";
import { useWishlist } from "../../services/wishlist-service";

const Wishlist: React.FC = () => {
  const { wishlist, clearWishlist, fetchWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleClearWishlist = () => {
    clearWishlist();
  };

  if (Object.keys(wishlist).length === 0) {
    return (
      <Alert variant="info" className="cart-empty">
        Your wishlist is empty.
      </Alert>
    );
  }

  const handleAddAllToCart = () => {
    const productIds: number[] = [];
    Object.values(wishlist).forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        productIds.push(item.product.productId);
      }
    });
    addToCart(productIds);
    clearWishlist();
  };

  return (
    <div>
      <h1>Wishlist</h1>
      {Object.values(wishlist).map((item) => (
        <WishlistItem
          key={item.product.productId}
          product={item.product}
          quantity={item.quantity}
        />
      ))}
      <Button onClick={handleClearWishlist}>Clear Wishlist</Button>
      <Button onClick={handleAddAllToCart}>Add All to Cart</Button>
    </div>
  );
};

export default Wishlist;
