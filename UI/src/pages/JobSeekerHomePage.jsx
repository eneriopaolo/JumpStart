import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobFeed from "../components/JobFeed";

const JobSeekerHomePage = () => {
    return (
        <div>
            <JobSeekerNavBar />
            <JobFeed/>
        </div>
    );
};

export default JobSeekerHomePage;
