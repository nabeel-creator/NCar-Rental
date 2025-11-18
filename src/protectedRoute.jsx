import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constans";
import { useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import api from "./api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    auth().catch((error) => {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
    });
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) return false;
    try {
      const response = await api.post("/auth/token/refresh/", { refresh });
      if (response.status === 200 && response.data?.access) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const auth = async () => {
    const access = localStorage.getItem(ACCESS_TOKEN);
    if (!access) {
      setIsAuthenticated(false);
      return;
    }

    const decode = (jwtDecode && jwtDecode.default) ? jwtDecode.default : jwtDecode;

    try {
      const decoded = decode(access);
      if (decoded?.exp * 1000 < Date.now()) {
        const refreshed = await refreshToken();
        setIsAuthenticated(Boolean(refreshed));
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error decoding token:", err);
      const refreshed = await refreshToken();
      setIsAuthenticated(Boolean(refreshed));
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
