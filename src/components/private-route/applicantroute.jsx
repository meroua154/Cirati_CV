
import React from "react";
import PrivateRoute from "./PrivateRoute";

const ApplicantRoute = ({ element }) => {
  return <PrivateRoute element={element} requiredRole="applicant" />;
}

export default ApplicantRoute;