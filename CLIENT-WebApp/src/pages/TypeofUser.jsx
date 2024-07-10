import React from "react";
import { Link } from "react-router-dom";

const TypeofUser = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400">

      <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Join as a Job Seeker or Employer</h1>
        </div>

        <div className="flex flex-col gap-4">
          <Link to ="/signup-jobseeker">
            <button
              type="button"
              value="jobSeeker"
              className="h-12 w-full py-2 px-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-900 hover:font-bold"
            >
              I'm a Job Seeker.
            </button>
          </Link>
          <Link to ="/signup-employer">
            <button
              type="button"
              value="employer"
              className="h-12 w-full py-2 px-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-900 hover:font-bold"
            >
              I'm an Employer.
            </button>
          </Link>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link to="/" className="text-green-700 px-1 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default TypeofUser
