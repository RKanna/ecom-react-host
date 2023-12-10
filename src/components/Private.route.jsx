import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./../context/UserContext.jsx";

const PrivateRoute = () => {
  const { userEmail } = useUser();
  return userEmail ? <Navigate to="/" replace /> : <Outlet />;
};

export default PrivateRoute;
