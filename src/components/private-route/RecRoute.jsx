
import React from "react";
import PrivateRoute from "./PrivateRoute";

const RecRoute = ({ element }) => {
  return <PrivateRoute element={element} requiredRole="recruiter" />;
}

export default RecRoute;

