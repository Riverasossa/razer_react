import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../states/auth-state";
import { userState } from "../states/user-state";
import { User } from "../models/user";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [, setUser] = useRecoilState(userState);

  const login = async (user: User) => {
    try {
      const response = await axios.post("http://localhost:8081/auth/login", user);
      const { token } = response.data;
      setAuth({ isAuthenticated: true, token });
      localStorage.setItem("token", token);

      const userDataResponse = await axios.get("http://localhost:8081/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userDataResponse.data;
      setUser(userData);

      const isValidEmail = validateEmail(user.email);
      if (!isValidEmail) {
        throw new Error("*Please enter a valid email address");
      }
    } catch (error) {
      throw new Error("*Invalid username or password");
    }
  };

  const signup = async (user: { fullName: string; email: string; password: string }) => {
    try {
      await axios.post("http://localhost:8081/auth/signup", user);
    } catch (error) {
      throw new Error("*Error signing up");
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null });
    localStorage.removeItem("token");
    setUser({ fullName: "", email: "", role: "" });
  };

  return { auth, login, signup, logout };
};

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
