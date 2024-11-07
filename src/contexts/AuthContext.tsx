import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/interfaces";

type FetchWithAuth = <T>(
  url: string,
  options?: RequestInit
) => Promise<T | null>;

interface AuthContextType {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  login: (data: LoginData) => Promise<null | string>;
  register: (data: RegisterData) => Promise<null | string>;
  deleteUser: () => Promise<null | string>;
  logout: () => void;
  fetchWithAuth: FetchWithAuth;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    imageUrl: "default.webp",
  });
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/JSON",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return error.message || "Login failed";
      }

      const res = await response.json();

      if (res) {
        console.log(res.user);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      }

      return null;
    } catch (error) {
      return "An error occurred. Please try again.";
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/JSON",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return error.message || "Register failed";
      }

      const res = await response.json();

      if (res) {
        console.log(res.user);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      }

      return null;
    } catch (error) {
      return "An error occurred. Please try again.";
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        return "Error deleting user";
      }
      return null;
    } catch (error) {
      return "An error occurred. Please try again.";
    }
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      email: "",
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchWithAuth: FetchWithAuth = async (
    url: string,
    options: RequestInit = {}
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        ...options,
        credentials: "include",
      });

      if (response.status === 401) {
        logout();
        return null;
      }

      if (response.status === 204) {
        return null;
      }

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        return Promise.reject(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        deleteUser,
        logout,
        fetchWithAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
