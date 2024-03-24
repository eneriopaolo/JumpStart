import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const SignUpEmployer = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false); // State variable for redirection

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const usernameValidity = /^([a-zA-Z0-9\s]){3,16}$/.test(username);
        const passwordMatching = password === confirmPassword;

        if (!usernameValidity) {
            alert("Invalid username.");
        } else if (!passwordMatching) {
            alert("Password and Confirm Password should match.");
        } else {
            try {
                const userData = {
                    email: email,
                    name: username,                 
                    password: password,
                    confirmPassword: confirmPassword,
                    typeofuser: "employer"
                };

                const response = await fetch("http://localhost:3000/api/auth/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    // Registration successful, set redirectToLogin to true for redirection
                    setRedirectToLogin(true);
                } else {
                    console.error('Registration failed:', response.status);
                }

                const data = await response.text();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/login" />; // Redirect to login page after successful signup
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
            <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up as an Employer</h1>
                </div>
                <form id="signupForm" onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your username"
                        />
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
                            <Link to="/login" className="text-red-700 hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpEmployer;
