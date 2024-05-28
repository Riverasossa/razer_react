import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../states/auth-state";
import { Order } from "../models/order";

export const useOrderService = () => {
  const { token } = useRecoilValue(authState);

  const getOrders = async (): Promise<Order[]> => {
    try {
      const response = await axios.get("http://localhost:8081/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      return [];
    }
  };

  const getOrderById = async (orderId: number): Promise<Order> => {
    try {
      const response = await axios.get(`http://localhost:8081/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID: ", error);
      throw error;
    }
  };

  const getUserOrders = async (): Promise<Order[]> => {
    try {
      const response = await axios.get("http://localhost:8081/orders/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders: ", error);
      return [];
    }
  };

  const updateOrderStatus = async (orderId: number, status: string): Promise<Order> => {
    try {
      const response = await axios.patch(`http://localhost:8081/orders/${orderId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status: ", error);
      throw error;
    }
  };

  return { getOrders, getOrderById, getUserOrders, updateOrderStatus };
};
