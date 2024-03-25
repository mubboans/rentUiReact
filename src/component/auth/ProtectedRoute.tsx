// ProtectedRoute.jsx
// import React from "react";
// import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"; // Adjust imports as needed
// import { ShowToast } from "../../helper/ToastHelper";

interface RoutePropes {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  //   path: string;
}
const ProtectedRoute = ({ isAuthenticated, Component }: RoutePropes) => {
  //   const dispatch = useDispatch();
  console.log("insied protected route");
  //   ShowToast(dispatch, "Please Login Again", "error");
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
