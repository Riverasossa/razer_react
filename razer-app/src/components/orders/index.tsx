import { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import { useOrderService } from "../../services/order-service";
import { Order, Status } from "../../models/order";
import "./orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const orderService = useOrderService();

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
    </div>
  );
};

export default Orders;
