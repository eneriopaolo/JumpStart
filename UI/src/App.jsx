import React from "react";
import LoginPage from "./pages/LoginPage";
import TypeofUser from "./pages/TypeofUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpEmployer from "./pages/SignUpEmployer";
import SignUpJobSeeker from "./pages/SignUpJobSeeker";
import JobSeekerHomePage from "./pages/JobSeekerHomePage";
import JobSeekerProfilePage from "./pages/JobSeekerProfilePage";
import EmployerHomePage from "./pages/EmployerHomePage";
import EmployerProfilePage from "./pages/EmployerProfilePage";
import PostJobPage from "./pages/PostJobPage";
import FindJobHomePage from "./pages/FindJobHomePage";
import JobProfile from "./components/JobProfile";
import EmployerProfile from "./components/EmployerProfile";
import ApplicationStatusPage from "./pages/ApplicationStatusPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen container mx-auto">
        <Routes>
          <Route path="/signup" element={<TypeofUser />} />
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/signup-employer" element={<SignUpEmployer />} />
          <Route path="/signup-jobseeker" element={<SignUpJobSeeker />} />
          <Route path="/jobseeker-home-page" element={<JobSeekerHomePage />} />
          <Route path="/jobseeker-profile-page" element={<JobSeekerProfilePage />}/>
          <Route path="/employer-home-page" element={<EmployerHomePage />} />
          <Route path="/employer-profile-page" element={<EmployerProfilePage />} />
          <Route path="/find-job-page" element={<FindJobHomePage />} />
          <Route path="/view-job-profile-page" element={<JobProfile />} />
          <Route path="/view-employer-profile-page" element={<EmployerProfile />} />
          <Route path="/post-job-page" element={<PostJobPage />} />
          <Route path="/view-application-status" element={<ApplicationStatusPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
