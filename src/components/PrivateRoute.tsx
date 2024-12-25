import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface RouteProps {
  element: ReactElement;
}

export const AuthenticatedRoute: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("authToken");

  return token ? element : <Navigate to="/login" replace />;
};

export const UnauthenticatedRoute: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("authToken");

  return token ? <Navigate to="/home" replace /> : element;
};
