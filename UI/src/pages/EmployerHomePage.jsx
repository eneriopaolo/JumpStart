import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import EmployerNavBar from "../components/EmployerNavBar";
import EmployerContent from "../components/EmployerContent";

const EmployerHomePage = () => {
  if(!localStorage.getItem("token")){
    localStorage.clear();
    return <Navigate to="/"/>
  };
  return (
    <div>
      <EmployerNavBar />
      <EmployerContent />
    </div>
  );
};

export default EmployerHomePage;
