import React, { useState, useEffect } from "react";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');

        const response = await fetch("http://localhost:3000/api/job", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setJobs(data.reverse());
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleClick = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = (job) => {
    console.log("Applying for job:", job);
    // Implement your apply logic here
  };

  return (
    <div className="job-feed bg-gray-100 p-4 relative">
      <p className="mt-5">Jobs You Might Like</p>
      {Array.isArray(jobs) ? (
        jobs.map((job, index) => (
          <div 
            key={index} 
            className="job-item bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
            onClick={() => handleClick(job)}
          >
            <h2 className="text-2xl font-bold mb-2">{job.jobTitle}</h2>
            <p className="text-gray-700 mb-4">Offered By: <span className="font-semibold">{job.offeredBy.name}</span></p>
            <p>{job.jobDescription} </p> <br/>
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

      {selectedJob && (
        <>
          <div 
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
            onClick={handleClose}
          ></div>
          <div className="fixed top-0 right-0 h-screen w-1/2 bg-white shadow-md overflow-y-auto z-50">
            <button 
              className="text-lg absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center z-50"
              onClick={handleClose}
            >
              X
            </button>
            <div className="p-6 mt-12">
              <h2 className="text-4xl font-bold mb-6">{selectedJob.jobTitle}</h2>
              <p className="text-gray-700 mb-6 text-xl">Offered By: <span className="font-semibold">{selectedJob.offeredBy.name}</span></p>
              <div className="border-b mb-8"></div>
              <p className="text-gray-700 text-xl mb-6">{selectedJob.jobDescription}</p>
              <div className="border-b mb-8"></div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span className="text-xl">Salary: {selectedJob.salaryPerMonth}</span>
                <span className="text-xl">Skills Required: {selectedJob.skillsRequired.join(", ") || "NONE"}</span>
                <span className="text-xl">Experience Required: {selectedJob.experienceRequired}</span>
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
        </>
      )}
    </div>
  );
};

export default JobFeed;
