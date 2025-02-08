import React from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
