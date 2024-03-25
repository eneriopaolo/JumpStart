import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../lib/userauth.fetch";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false); // State variable for redirection
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const clearLocalStorage = () => {
        localStorage.clear(); // Clear all items from localStorage
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const response = await loginUser(email, password);
            const data = await response.json();
            if (response.status === 200) {
                // Store all data returned by fetch in localStorage
                for (const [key, value] of Object.entries(data)) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
                setRedirectToHome(true); // Set redirectToHome to true for redirection
            } else if (response.status === 401) {
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
            } else
            {
                alert("Something went wrong.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (redirectToHome) {
        const userType = JSON.parse(localStorage.getItem('userType'));
        if (userType === 'employer') {
            return <Navigate to="/employer-home-page" />; // Navigate to employer home page
        } else if (userType === 'jobseeker') {
            return <Navigate to="/jobseeker-home-page" />; // Navigate to jobseeker home page
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
            <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Log in to HireIndex</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your email"
                        />
                        <span
                            value={emailError}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your password"
                        />
                        <span
                            value={passwordError}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                    >
                        Continue
                    </button>

                    <div className="text-center mt-12">
                        <p className="text-sm text-gray-500">
                            Don't have an account? 
                            <Link to="/signup" className="text-red-700 px-2 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
