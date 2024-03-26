import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import FindJobContent from "../components/FindJobContent";

const JobSeekerHomePage = () => {
    return (
        <div>
            <JobSeekerNavBar />
            <FindJobContent/>
        </div>
    );
};

export default JobSeekerHomePage;
