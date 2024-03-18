import React from "react";

const Login = () => {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

      <div className="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Log in to HireIndex</h1>
        </div>
        
        <form className="space-y-4">

          <div className="flex flex-col space-y-2">
            <label htmlFor="usernameOrEmail" className="text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              id="usernameOrEmail"
              type="text"
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
              <a href="#" className="text-red-700 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
    );
};


export default Login
