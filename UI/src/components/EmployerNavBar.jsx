import React, { useState } from "react";
import { Link } from "react-router-dom";
import JumpStartLogo from "../assets/JumpStartLogo.png";
import { IoLogOut } from "react-icons/io5";

const EmployerNavBar = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const userName = userData ? userData.name : "ERROR"; // Default to "ERROR" if userData is not available
  console.log("EmployerNavBar component rendered");

  return (
    <div className="flex items-center justify-between bg-green-600 border-b border-gray-500 relative shadow-md">
      <div className="flex items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 mr-4" /> */}
        <p className="p-4 cursor-pointer text-white hover:text-green-900 hover:bg-green-700">
          <Link to="/employer-home-page" className="">
            <img src={JumpStartLogo} className="rounded-full" alt="JumpStart Logo" style={{height: '50px', width: 'auto',background:"white"}}/>
          </Link>
        </p>
        <p className="p-4 w-48 cursor-pointer text-white hover:text-green-900 hover:underline hover:font-bold">
          <Link
            to="/post-job-page"
            className="text-white"
          >
            Post Jobs
          </Link>
        </p>
      </div>
      <div>
          <button className="text-white text-center flex items-center justify-center h-12 w-48 min-w-20 border-l-2 hover:font-bold" onClick={toggleMenu}>
              {userName} <span className="ml-2"></span>
          </button>

          {menuOpen && ( // Render additional buttons only if menu is open
              <div className="absolute right-0 top-full bg-white border border-gray-300 w-48 z-10">
                  {/* Add additional buttons here */}
                  <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200"><Link to="/employer-profile-page" className="">Profile</Link></button>
                  <button className="block w-full py-2 px-4 text-gray-800 hover:bg-gray-200" onClick={clearLocalStorage}><Link to="/" className="">Logout</Link></button>
              </div>
          )}
      </div>
    </div>
  );
};

export default EmployerNavBar;
