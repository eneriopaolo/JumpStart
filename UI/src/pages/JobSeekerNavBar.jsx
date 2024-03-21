import React from "react";
import { Link } from "react-router-dom";

const JobSeekerNavBar = () => {
    return (
        <div className="flex items-center justify-between bg-white border-b border-gray-300">
            <div className="flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 mr-4" /> */}
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/" className="">Logo</Link></p>
                <p className="p-4 cursor-pointer text-gray-800 hover:text-red-900 hover:bg-blue-500"><Link to="/" className="text-gray-800 hover:text-gray-900">Find Jobs</Link></p>
            </div>
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search Jobs"
                    className="w-full px-4 py-2 mr-2 text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
                />
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Search
                </button>
            </div>
            <div>
                <span className="text-gray-800">John Doe</span>
            </div>
        </div>
    );
};


export default JobSeekerNavBar;
