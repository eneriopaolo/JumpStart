import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerNavBar from "./JobSeekerNavBar";
import JobFeed from "./JobFeed"

const JobSeekerHomePage = () => {
    return (
        <div>
            <JobSeekerNavBar />
            <JobFeed/>
        </div>
    );
};

export default JobSeekerHomePage;
