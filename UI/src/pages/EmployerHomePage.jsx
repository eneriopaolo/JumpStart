import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployerNavBar from "../components/EmployerNavBar";
import EmployerContent from "../components/EmployerContent";

const EmployerHomePage = () => {
  return (
    <div>
      <EmployerNavBar />
      <EmployerContent />
    </div>
  );
};

export default EmployerHomePage;
