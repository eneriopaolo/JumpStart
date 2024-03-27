import React from "react";
import { Navigate } from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobFeed from "../components/JobFeed";

const JobSeekerHomePage = () => {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    return (
        <>
            <JobSeekerNavBar />
            <JobFeed/>
        </>
    );
};

export default JobSeekerHomePage;
