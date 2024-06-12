import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ApplicantRoute from "./applicantroute";
import RecRoute from "./RecRoute";

const ApplicantOrRecRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);

  if (user.role === "applicant") {
    return <ApplicantRoute element={element} />;
  } else if (user.role === "recruiter") {
    return <RecRoute element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ApplicantOrRecRoute;
