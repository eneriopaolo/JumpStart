import React, {useState, useEffect} from "react";
import { searchJobsByTitle } from "../lib/joboffer.fetch";
import { Navigate } from "react-router-dom";
import "../css/JobProfile.css"; // Import CSS file
import EmployerNavBar from "../components/EmployerNavBar";
import EmployerProfile from "../components/EmployerProfile";

const EmployerProfilePage = () => {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    return (
        <div>
            <EmployerNavBar />
            <EmployerProfile />
            
        </div>
    );
};

export default EmployerProfilePage;