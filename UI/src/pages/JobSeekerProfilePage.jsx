import React, { useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobProfile from "../components/JobProfile";

const JobSeekerProfilePage = () => {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    return (
        <div>
            <JobSeekerNavBar />
            <JobProfile />
        </div>
    );
};

export default JobSeekerProfilePage;