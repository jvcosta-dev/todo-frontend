import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { IUser } from "../interfaces/interfaces";
const PrivateRoute = () => {
  const { setUser, logout } = useAuth();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      logout();
      return;
    }
    try {
      const parsedUser = JSON.parse(user) as IUser;
      if (!parsedUser.id || !parsedUser.name || !parsedUser.email) {
        logout();
        return;
      }
      setUser(parsedUser);
    } catch {
      logout();
    }
  }, []);
  return <Outlet />;
};

export default PrivateRoute;
