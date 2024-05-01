import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../states/auth-state";
import { User } from "../models/user";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = async (user: User) => {
    try {
      const users = await fetchUsers();
      const foundUser = users.find(
        (u) => u.username === user.username && u.password === user.password
      );

      // Validar el formato del correo electrónico
      const isValidEmail = validateEmail(user.username);
      if (!isValidEmail) {
        throw new Error("*Please enter a valid email address");
      }

      if (foundUser) {
        setAuth({ isAuthenticated: true, user: { name: foundUser.username } });
      } else {
        throw new Error("*Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return { auth, login, logout };
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get("/data/users.json");
  return response.data.Users;
};

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
