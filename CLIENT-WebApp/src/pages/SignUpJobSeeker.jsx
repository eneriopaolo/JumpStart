import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../lib/userauth.fetch";

const SignUpJobSeeker = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false); // State variable for redirection

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const clearState = () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        clearState();           // Resets error message

        const nameRegex = /^[\w\-.'\s]+$/.test(name);
        const passwordMatching = password === confirmPassword;
        if (!nameRegex) {
            setNameError("Invalid name.");
        } else if (!passwordMatching) {
            setConfirmPasswordError("Password and Confirm Password should match.");
        } else {
            try {
                const response = await registerUser(email, name, password, "jobseeker")
                const resMsg = await response.json();
                if (response.status === 201) {
                    // Registration successful, set redirectToLogin to true for redirection
                    setRedirectToLogin(true);
                } else if (response.status === 400) {
                    setEmailError(resMsg.errors.email);
                    setPasswordError(resMsg.errors.password);
                } else {
                    alert("Something went wrong.");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/" />; // Redirect to job seeker home page after successful signup
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
            <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up as a Job Seeker</h1>
                </div>
                <form id="signupForm" onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your name"
                        />
                        {nameError && <span className="text-sm text-red-500">{nameError}</span>}
                    </div>               
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your email"
                        />
                        {emailError && <span className="text-sm text-red-500">{emailError}</span>}
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
                        {passwordError && <span className="text-sm text-red-500">{passwordError}</span>}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Confirm your password"
                        />
                        {confirmPasswordError && <span className="text-sm text-red-500">{confirmPasswordError}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-900"
                    >
                        Sign Up
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Already have an account?
                            <Link to="/" className="text-green-700 px-1 hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpJobSeeker;
