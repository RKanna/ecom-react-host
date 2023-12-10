import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./../context/UserContext.jsx";
import App from "../App.jsx";

const Protected = () => {
  const { userEmail } = useUser();
  return userEmail ? <Outlet /> : <Navigate to="/Shipping" replace />;
};

export default Protected;
