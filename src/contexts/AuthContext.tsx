import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";

interface AuthContextType {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  fetchWithAuth: (
    url: string,
    options?: RequestInit
  ) => Promise<Response | null>;
}

interface LoginData {
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
      const res = await response.json();
      if (res) {
        console.log(res.user);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
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

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        ...options,
        credentials: "include",
      });

      if (response.status === 401) {
        logout();
        return null;
      }

      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, fetchWithAuth }}
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
