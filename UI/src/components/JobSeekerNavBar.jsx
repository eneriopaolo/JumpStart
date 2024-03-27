import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchJobsByTitle } from "../lib/joboffer.fetch";
import JumpStartLogo from "../assets/JumpStartLogo.png";
import { IoLogOut } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";

const JobSeekerNavBar = ({ updateJobData }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem("userData2", JSON.stringify(userData))
    const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available

    const [menuOpen, setMenuOpen] = useState(false); // State variable to track menu open/close
    const [jobTitle, setNewJobTitle] = useState("");

    function handleInputChange(event) {
        setNewJobTitle(event.target.value)
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    async function searchJobs() {
        const response = await searchJobsByTitle(jobTitle);
        const data = await response.json()
        updateJobData(data);
    }

    const clearLocalStorage = () => {
        localStorage.clear();
    };

    return (
        <div className="flex items-center justify-between bg-green-600 border-b border-gray-500 relative shadow-md">
            <div className="flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 mr-4" /> */}
                <p className="p-4 cursor-pointer text-white hover:text-green-900 hover:bg-green-700">
                    <Link to="/jobseeker-home-page" className="">
                    <img src={JumpStartLogo} className="rounded-full" alt="JumpStart Logo" style={{height: '50px', width: 'auto',background:"white"}}/>
                    </Link></p>
                <p className="p-4 w-48 cursor-pointer text-white hover:text-green-900 hover:underline hover:font-bold"><Link to="/find-job-page" className="text-white">Find Jobs</Link></p>
            </div>

            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Enter Job Title..."
                    value={jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mr-2 text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
                />
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={searchJobs}
                >
                    <FaMagnifyingGlass />
                </button>
            </div>

            <div>
                <button className="text-white text-center flex items-center justify-center h-12 w-48 min-w-20 border-l-2 hover:font-bold" onClick={toggleMenu}>
                    {userName} <span className="ml-2"></span>
                </button>

                {menuOpen && ( // Render additional buttons only if menu is open
                    <div className="absolute right-0 top-full bg-white border border-gray-300 w-48 z-10">
                        {/* Add additional buttons here */}
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200"><Link to="/jobseeker-profile-page" className="">Profile</Link></button>
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200"><Link to="/view-application-status" className="">Application Status</Link></button>
                        <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200" onClick={clearLocalStorage}><Link to="/" className="">Logout</Link></button>
                    </div>
                )}
            </div>
        </div>
    );
};



export default JobSeekerNavBar;
