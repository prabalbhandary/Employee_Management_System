import React from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const RoleBasedRoutes = ({ children, reqRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  if (!reqRole.includes(user?.role)) {
    <Navigate to="/unauthorized" />;
  }
  return user ? children : <Navigate to="/login" />;
};

export default RoleBasedRoutes;
