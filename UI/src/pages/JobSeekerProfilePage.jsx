import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobProfile from "../components/JobProfile";

const JobSeekerProfilePage = () => {
    return (
        <div>
            <JobSeekerNavBar />
            <JobProfile />
        </div>
    );
};

export default JobSeekerProfilePage;