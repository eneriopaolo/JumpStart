import React from "react";
import { Navigate} from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobProfile from "../components/JobProfile";

const JobSeekerProfilePage = () => {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    return (
        <>
            <JobSeekerNavBar />
            <JobProfile />
        </>
    );
};

export default JobSeekerProfilePage;