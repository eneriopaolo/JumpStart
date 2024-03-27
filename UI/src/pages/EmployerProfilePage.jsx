import React from "react";
import { Navigate } from "react-router-dom";

import EmployerNavBar from "../components/EmployerNavBar";
import EmployerProfile from "../components/EmployerProfile";

const EmployerProfilePage = () => {
  if (!localStorage.getItem("token")) {
    localStorage.clear();
    return <Navigate to="/" />;
  }
  return (
    <>
      <EmployerNavBar />
      <EmployerProfile />
    </>
  );
};

export default EmployerProfilePage;
