import React, { useState } from "react";
import { Link } from "react-router-dom";

const TypeofUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelection = (userType) => {
    setSelectedUser(userType);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

      <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Join as a Job Seeker or Employer</h1>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            value="jobSeeker"
            className={`w-full px-4 py-2 text-center rounded-lg ${selectedUser === "jobSeeker" ? "bg-red-700 text-white border border-red-900" : "bg-gray-100 text-gray-700 border border-gray-300" /*if selectedUser value is jobSeeker then change the button appearance accordingly*/
              }`}
            onClick={() => handleUserSelection("jobSeeker")}
          >
            I'm a Job Seeker.
          </button>

          <button
            type="button"
            value="employer"
            className={`w-full px-4 py-2 text-center rounded-lg ${selectedUser === "employer" ? "bg-red-700 text-white border border-red-900" : "bg-gray-100 text-gray-700 border border-gray-300" /*if selectedUser value is employer then change the button appearance accordingly*/
              }`}
            onClick={() => handleUserSelection("employer")}
          >
            I'm an Employer.
          </button>
        </div>

        <div className="text-center mt-12"> 
          {selectedUser ? (//if selectedUser has a value, display  "Apply as ...", else then display nothing
          //if selectedUser is jobSeeker, link to /signup-jobseeker, else then link to /signup-employer
          //if selectedUser is jobSeeker, display "a Job Seeker", else then "an Emplyoer"
            <Link to={selectedUser === "jobSeeker" ? "/signup-jobseeker" : "/signup-employer"} className="text-red-700 hover:underline">
              Apply as {selectedUser === "jobSeeker" ? " a Job Seeker" : " an Employer"}
            </Link>
          ) : null}
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link to="/" className="text-red-700 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default TypeofUser
