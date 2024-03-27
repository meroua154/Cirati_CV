import React from "react";
import { Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    element={auth.isAuthenticated ? <Component /> : <Navigate to="/login" />}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
=======
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
>>>>>>> origin/main
