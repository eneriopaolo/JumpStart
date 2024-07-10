import React from "react";
import { Navigate } from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import FindJobContent from "../components/FindJobContent";

const JobSeekerHomePage = () => {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    return (
        <>
            <JobSeekerNavBar />
            <FindJobContent/>
        </>
    );
};

export default JobSeekerHomePage;
