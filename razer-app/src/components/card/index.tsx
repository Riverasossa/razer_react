import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import { useWishlist } from "../../services/wishlist-service";
import { useRecoilState } from "recoil";
import { wishlistState, WishlistItem } from "../../states/wishlist-state";
import "./card.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlist] = useRecoilState(wishlistState);
  const { addToWishlist, removeFromWishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    // Check if the product is already in the wishlist
    const item: WishlistItem | undefined = Object.values(wishlist).find(
      (item) => item.product.productId === product.productId
    );
    setIsWishlisted(!!item); // Set the heart fill status based on whether the product is in the wishlist
  }, [wishlist, product.productId]);

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      // Remove the product from the wishlist
      await removeFromWishlist(product.productId);
    } else {
      // Add the product to the wishlist
      await addToWishlist(product.productId);
    }
    // Fetch the updated wishlist after adding/removing the product
    fetchWishlist();
  };

  return (
    <Card className="m-2 product-card">
      <div className="image-container">
        <Card.Img alt="product-image" variant="top" src={`${product.image}`} />
        <i
          className={`bi ${
            isWishlisted ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"
          } heart-icon`}
          onClick={handleWishlistToggle}
        ></i>
      </div>
      <Card.Body>
        <Card.Title id="product-name">{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Link to={`/product-details/${product.productId}`}>
          <Button id="carousel-btn" variant="primary">
            VIEW DETAILS
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
