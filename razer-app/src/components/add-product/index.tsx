import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Button, Form } from "react-bootstrap";
import { authState } from "../../states/auth-state";
import { ProductService } from "../../services/product-service";
import { Product } from "../../models/product";
import "./add-product.scss";

const CreateProduct = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    productId: 0,
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await ProductService.createProduct(product, auth.token);
    navigate("/backoffice/products");
  };

  return (
    <div className="add-product">
      <h1 className="add-title">Create Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="textarea"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
