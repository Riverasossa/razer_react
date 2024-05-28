import React from "react";
import { Button, Form } from "react-bootstrap";
import { useWishlist } from "../../services/wishlist-service";
import "./wishlist-item.scss";
import { Product } from "../../models/product";

interface WishlistItemProps {
  product: Product;
  quantity: number;
}

const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  if (!isNaN(value) && value >= 0) {
    //
  }
};

const WishlistItem: React.FC<WishlistItemProps> = ({ product, quantity }) => {
  const { addToWishlist, decreaseProductQuantity, removeFromWishlist } =
    useWishlist();

  const incrementQuantity = () => {
    addToWishlist(product.productId);
  };

  const decrementQuantity = () => {
    decreaseProductQuantity(product.productId);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(product.productId);
  };

  return (
    <div className="cart-item">
      <img
        src={`${product.image}`}
        alt="Product Image"
        className="cart-item__image"
      />
      <div className="cart-item__info">
        <h5>{product.name}</h5>
      </div>
      <div className="cart-item__quantity-controls">
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <div className="quantity-controls">
            <Button
              variant="outline-success"
              onClick={decrementQuantity}
              className="quantity-control"
              disabled={quantity <= 1}
            >
              -
            </Button>
            <input
              aria-label="quantity"
              disabled
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <Button
              variant="outline-success"
              onClick={incrementQuantity}
              className="quantity-control"
            >
              +
            </Button>
          </div>
        </Form.Group>
      </div>

      <i
        onClick={handleRemoveFromWishlist}
        id="cart-icon"
        className="bi bi-trash"
      ></i>
    </div>
  );
};

export default WishlistItem;
