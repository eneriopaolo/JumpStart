import React, { useState, useEffect } from "react";
import { searchJobsByCategory, searchJobsBySalary } from "../lib/joboffer.fetch";
import { viewMyApplications, sendJobApplication } from "../lib/jobapplication.fetch";

const FindJobContent = () => {
  const [jobs, setJobs] = useState([]); // Original list of jobs fetched from the API
  const [selectedJob, setSelectedJob] = useState(null); // Currently selected job
  const [showPopup, setShowPopup] = useState(false); // Flag to control popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // Message to display in popup
  const [selectedJobCategory, setSelectedJobCategory] = useState("Entry"); // Default experience level
  const [minSalary, setMinSalary] = useState("0");
  const [maxSalary, setMaxSalary] = useState("10000");
  const [categorydata, setCategoryData] = useState("");
  const [salarydata, setSalaryData] = useState("");
  
  useEffect(() => {
    const fetchJobsByJobCategory = async () => {
      try {
        const response = await searchJobsByCategory(selectedJobCategory);
        const data = await response.json();
        setCategoryData(data);

        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("API response is not an array:", data);
          return [];
        }
      } catch (error) {
        console.error("Error fetching jobs by job category:", error);
        return [];
      }
    };

    const fetchJobsBySalary = async () => {
      try {
        const response = await searchJobsBySalary(minSalary, maxSalary)
        const data = await response.json();

        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("API response is not an array:", data);
          return [];
        }
      } catch (error) {
        console.error("Error fetching jobs by salary:", error);
        return [];
      }
    };

    const fetchData = async () => {
      const jobsByCategory = await fetchJobsByJobCategory();
      const jobsBySalary = await fetchJobsBySalary();

      // Filter jobs that match both job category and salary criteria
      const filteredJobs = jobsByCategory.filter(job => 
        jobsBySalary.some(salaryJob => salaryJob._id === job._id)
      );

      setJobs(filteredJobs.reverse()); // Reverse the array to show the latest jobs first
    };

    fetchData();
  }, [selectedJobCategory, minSalary, maxSalary]);

  // Handle click on a job item
  const handleClick = (job) => {
    setSelectedJob(job);
  };

  // Close the selected job details
  const handleClose = () => {
    setSelectedJob(null);
  };

  // Placeholder for applying to a job
  const handleApplyNow = async (job) => {
    try {
      const offerId = String(job._id).replace(/['"]+/g, '');
      const applicationResponse = await viewMyApplications();
      const applications = await applicationResponse.json(); 
      const hasApplied = applications.some(application => application.jobOffer._id === offerId);
  
      if (hasApplied) {
        setPopupMessage("You have already applied for this job.");
        setShowPopup(true);
        return;
      }
      const response = await sendJobApplication(offerId);
      const data = await response.json();
      if (response.ok) {
        setPopupMessage("Application sent successfully!");
        setShowPopup(true);
      } else {
        setPopupMessage("Error sending application.");
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage("Error sending application.");
      setShowPopup(true);
      console.error("Error sending application:", error);
    }
  };

  // Close the popup
  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  // Handle change in selected experience level
  const handleExperienceLevelChange = (level) => {
    setSelectedJobCategory(level); // Update selectedJobCategory with the new level
  };

  return (
    <div className="flex bg-gray-200 p-4 relative min-h-screen border-x-2 border-slate-600">
      {/* Filter section */}
      <div className="w-1/4 mr-8">
        <div className="filter-section mb-6 mt-10 ">
          <h2 className="text-xl font-bold mb-2">Filter</h2>
          {/* Experience Level filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Experience Level</h3>
            {['Entry', 'Intermediate', 'Expert'].map((level, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`experience-level-${level}`}
                  name="experience-level"
                  checked={selectedJobCategory === level}
                  onChange={() => handleExperienceLevelChange(level)}
                  className="mr-2"
                />
                <label htmlFor={`experience-level-${level}`}>{level}</label>
              </div>
            ))}
          </div>

          {/* Salary filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
            <div className="flex items-center mb-2">
              <input
                type="number"
                placeholder="Min"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="mr-2 p-2 w-1/2"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                className="p-2 w-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job feed section */}
      <div className="w-3/4">
        <p className="mt-5">Jobs You Might Like</p>
        {/* Display jobs based on jobs */}
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div 
              key={index} 
              className="job-item bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
              onClick={() => handleClick(job)}
            >
              <h2 className="text-2xl font-bold mb-2">{job.jobTitle}</h2>
              <p className="text-gray-700 mb-4">Offered By: <span className="font-semibold">{job.offeredBy.name}</span></p>
              <p>{job.jobDescription}</p>
              <br />
              <p className="text-gray-600 text-lg mb-4">
                <span>Salary: {job.salaryPerMonth}, </span>             
                <span>Date Offered: {new Date(job.dateOffered).toLocaleDateString()}, </span>
                <span>Skills Required: {job.skillsRequired.join(", ") || "NONE"}, </span>
                <span>Experience Required: {job.jobCategory}</span>
              </p>
              <p className="text-gray-600">Index: {index}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">No jobs available</p>
        )}

        {/* Display selected job details */}
        {selectedJob && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleClose}></div>
        )}

        {selectedJob && (
          <div className="fixed top-0 right-0 h-screen w-1/2 bg-white shadow-md overflow-y-auto z-50">
            <button className="text-lg absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center z-50" onClick={handleClose}>X</button>
            <div className="p-6 mt-12">
              <h2 className="text-4xl font-bold mb-6">{selectedJob.jobTitle}</h2>
              <p className="text-gray-700 mb-6 text-xl">Offered By: <span className="font-semibold">{selectedJob.offeredBy.name}</span></p>
              <div className="border-b mb-8"></div>
              <p className="text-gray-700 text-xl mb-6">{selectedJob.jobDescription}</p>
              <div className="border-b mb-8"></div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span className="text-xl">Salary: {selectedJob.salaryPerMonth}</span>
                <span className="text-xl">Skills Required: {selectedJob.skillsRequired.join(", ") || "NONE"}</span>
                <span className="text-xl">Experience Required: {selectedJob.jobCategory} </span>
              </div>
              <div className="border-b mb-8"></div>
              <button 
                className="mt-10 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mx-auto block"
                onClick={() => handleApplyNow(selectedJob)}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Popup for messages */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md flex flex-col items-center justify-center">
              <p className="text-xl">{popupMessage}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handlePopupClose}>
                Close
              </button>
              </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FindJobContent;