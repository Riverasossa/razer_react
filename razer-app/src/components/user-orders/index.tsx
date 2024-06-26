import { useState, useEffect } from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { useOrderService } from "../../services/order-service";
import { Order } from "../../models/order";
import "./user-orders.scss";

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const orderService = useOrderService();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const userOrders = await orderService.getUserOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching user orders: ", error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="orders">
      <h1 className="table-title">Your Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order N.º</th>
            <th>Status</th>
            <th>Taxes</th>
            <th>Shipping Cost</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th> {/* Nueva columna de acciones */}
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.status}</td>
              <td>{order.taxes}</td>
              <td>{order.shippingCoast}</td>
              <td>{order.total}</td>
              <td>{formatDateString(order.orderDate)}</td>
              <td>
                <i
                  className="bi bi-eye-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewOrderDetails(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={handlePrevious}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={handleNext}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Modal
        className="order-details"
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order N.º:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {formatDateString(selectedOrder.orderDate)}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Taxes:</strong> {selectedOrder.taxes}
              </p>
              <p>
                <strong>Shipping Cost:</strong> {selectedOrder.shippingCoast}
              </p>
              <p>
                <strong>Total:</strong> {selectedOrder.total}
              </p>
              <p>
                <strong>Products:</strong>
              </p>
              <ul>
                {selectedOrder.orderProducts.map((orderProduct) => (
                  <li key={orderProduct.orderProductId}>
                    {orderProduct.product.name} - Price: $
                    {orderProduct.product.price}, Quantity:{" "}
                    {orderProduct.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserOrders;
