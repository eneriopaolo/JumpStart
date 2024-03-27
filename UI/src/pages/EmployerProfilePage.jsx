import React, {useState, useEffect} from "react";
import { searchJobsByTitle } from "../lib/joboffer.fetch";
import { Link } from "react-router-dom";
import "../css/JobProfile.css"; // Import CSS file
import EmployerNavBar from "../components/EmployerNavBar";
import EmployerProfile from "../components/EmployerProfile";

const EmployerProfilePage = () => {
    return (
        <div>
            <EmployerNavBar />
            <EmployerProfile />
            
        </div>
    );
};

export default EmployerProfilePage;