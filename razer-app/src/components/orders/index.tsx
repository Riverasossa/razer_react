import { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  DropdownButton,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import { useOrderService } from "../../services/order-service";
import { Order, Status } from "../../models/order";
import "./orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const orderService = useOrderService();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orders = await orderService.getOrders();
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const handleStatusChange = async (orderId: number, status: Status) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      const updatedOrders = orders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

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
    <div>
      <h1 className="table-title">Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order N.º</th>
            <th>Status</th>
            <th>Taxes</th>
            <th>Shipping Cost</th>
            <th>Total</th>
            <th>User</th>
            <th>Date</th>
            <th>Actions</th> {/* Nueva columna de acciones */}
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                <DropdownButton className="order-dropdown" title={order.status}>
                  <Dropdown.Item
                    onClick={() => handleStatusChange(order.orderId, "PENDING")}
                  >
                    Pending
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleStatusChange(order.orderId, "CONFIRMED")
                    }
                  >
                    Confirmed
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleStatusChange(order.orderId, "CANCELLED")
                    }
                  >
                    Cancelled
                  </Dropdown.Item>
                </DropdownButton>
              </td>
              <td>{order.taxes}</td>
              <td>{order.shippingCoast}</td>
              <td>{order.total}</td>
              <td>{order.user.fullName}</td>
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
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
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
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
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
                <strong>User:</strong> {selectedOrder.user.fullName}
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
                <strong>Shipping Coast:</strong> {selectedOrder.shippingCoast}
              </p>
              <p>
                <strong>Total:</strong> {selectedOrder.total}
              </p>
              <p>
                <strong>Card:</strong> {selectedOrder.card}
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

export default Orders;
