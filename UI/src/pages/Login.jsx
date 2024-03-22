import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false); // State variable for redirection

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const userData = {
                email: usernameOrEmail,
                password: password
            };

            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Login successful, set redirectToHome to true for redirection
                setRedirectToHome(true);
            } else {
                alert("Invalid credentials. Please try again.");
                console.error('Login failed:', response.status);
            }
            
            console.log("THis is current username " + usernameOrEmail)
            console.log("THis is current password " + password)

            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // if (redirectToHome) {
    //     return <Navigate to="/employer-home-page" />; // Redirect to employer home page after successful login
    // }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
            <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Log in to HireIndex</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="usernameOrEmail" className="text-sm font-medium text-gray-700">
                            Username or Email
                        </label>
                        <input
                            id="usernameOrEmail"
                            type="text"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                            placeholder="Enter your username or email"
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

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                    >
                        Continue
                    </button>

                    <div className="text-center mt-4">
                        <a href="#" className="text-sm text-red-700 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-sm text-gray-500">
                            Don't have an account?
                            <Link to="/signup" className="text-red-700 hover:underline">
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
