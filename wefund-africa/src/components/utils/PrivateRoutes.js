import React from "react";
import { Routes ,Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../utils/AppContext";
import Dashboard from "../LoginDashboard/Dashboard";
import UserProfile from "../UserProfile/UserProfile";

const PrivateRoutes = ({ path }) => {
  let { user, tokensToStore } = useContext(AppContext);
  
  return user ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRoutes;
