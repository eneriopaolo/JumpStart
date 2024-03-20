import React from "react";
import { Link } from "react-router-dom"

const SignUpJobSeeker = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

            <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up as a Job Seeker</h1>
                </div>

                <form className="w-full flex flex-col space-y-4">

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                    >
                        Sign Up
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Already have an account?
                            <Link to="/" className="text-red-700 hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default SignUpJobSeeker