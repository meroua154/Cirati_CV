import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const auth = useSelector(state => state.auth);
  if (auth && auth.isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
  }

PrivateRoute.propTypes = {
  element: PropTypes.func.isRequired,
};

export default PrivateRoute;
