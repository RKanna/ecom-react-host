import React from "react";
import { useUser } from "../context/UserContext";
import { createAuthUserWithEmailAndPassword } from "./../utils/index.js";
import { Outlet, Navigate } from "react-router-dom";

const PrivateAdmin = () => {
  const { userEmail } = useUser();
  return userEmail === "admin@admin.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default PrivateAdmin;
