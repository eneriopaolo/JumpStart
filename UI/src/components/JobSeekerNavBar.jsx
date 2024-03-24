import React from "react";
import { Link } from "react-router-dom";
import JobSearchBar from "./JobSearchBar";

const JobSeekerNavBar = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log("userData from localStorage:", userData); // Log userData

    const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available
    console.log("JobSeekerNavBar component rendered");

    return (
        <div className="flex items-center justify-between bg-white border-b border-gray-300">
            <div className="flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 mr-4" /> */}
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/" className="">Logo</Link></p>
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/find-job-page" className="text-gray-800 hover:text-gray-900">Find Jobs</Link></p>
            </div>
            <JobSearchBar/>
            <div>
                <span className="text-gray-800">{userName}</span>
            </div>
        </div>
    );
};

export default JobSeekerNavBar;
