// PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

const PrivateRoute = ({ element, requiredRole }) => {
  const auth = useSelector(state => state.auth);
  const role = auth.isAuthenticated ? auth.user.role : null;

  if (role && role === requiredRole) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  element: PropTypes.func.isRequired,
  requiredRole: PropTypes.string.isRequired
};

export default PrivateRoute;
