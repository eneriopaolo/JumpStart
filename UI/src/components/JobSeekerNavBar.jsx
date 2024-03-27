import React, { useState } from "react";
import { Link } from "react-router-dom";
import JobSearchBar from "./JobSearchBar";

const JobSeekerNavBar = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log("userData from localStorage:", userData); // Log userData

    const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available
    console.log("JobSeekerNavBar component rendered");

    const [menuOpen, setMenuOpen] = useState(false); // State variable to track menu open/close

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex items-center justify-between bg-white border-b border-gray-300 relative">
            <div className="flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 mr-4" /> */}
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/jobseeker-home-page" className="">Logo</Link></p>
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/find-job-page" className="text-gray-800 hover:text-gray-900">Find Jobs</Link></p>
            </div>
            <JobSearchBar/>

            <div>
                <button className="text-gray-800 flex items-center justify-center min-w-20" onClick={toggleMenu}>
                    {userName} <span className="ml-2"></span>
                </button>

                {menuOpen && ( // Render additional buttons only if menu is open
                    <div className="absolute right-0 top-full bg-white border border-gray-300 z-10">
                        {/* Add additional buttons here */}
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200"><Link to="/jobseeker-profile-page" className="">Profile</Link></button>
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200"><Link to="/view-application-status" className="">Application Status</Link></button>
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200" onClick={localStorage.clear()}><Link to="/" className="">Logout</Link></button>
                    </div>
                )}
            </div>

            

        </div>
    );
};

export default JobSeekerNavBar;
