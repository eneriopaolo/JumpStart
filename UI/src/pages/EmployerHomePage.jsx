import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployerNavBar from "./EmployerNavBar";
import EmployerContent from "./EmployerContent"

const JobSeekerHomePage = () => {
    return (
        <div>
            <EmployerNavBar />
            <EmployerContent/>
        </div>
    );
};

export default JobSeekerHomePage;
