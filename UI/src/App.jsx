import React from "react";
import Login from "./pages/Login";
import TypeofUser from "./pages/TypeofUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpEmployer from "./pages/SignUpEmployer";
import SignUpJobSeeker from "./pages/SignUpJobSeeker";
import JobSeekerHomePage from "./pages/JobSeekerHomePage"; 
import EmployerHomePage from "./pages/EmployerHomePage";
import JobPostPage from "./pages/PostJobPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Routes>
          <Route path="/signup" element={<TypeofUser />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/signup-employer" element={<SignUpEmployer />} />
          <Route path="/signup-jobseeker" element={<SignUpJobSeeker />} />
          <Route path="/jobseeker-home-page" element={<JobSeekerHomePage />} />
          <Route path="/employer-home-page" element={<EmployerHomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
