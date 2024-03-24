import React, { useState, useEffect } from "react";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Retrieve the token from local storage and parse it to string
        const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');

        const response = await fetch("http://localhost:3000/api/job", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log("NEW DATA ",data)

        // Check if data is an array before setting it as state
        if (Array.isArray(data)) {
          setJobs(data);
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
    console.log("Clicked job:", job);
    // Add your logic here for what you want to do when a job is clicked
  };

  return (
    <div className="job-feed bg-gray-100 p-4">
      <p className="mt-5 mb-5">Jobs You Might Like</p>
      {Array.isArray(jobs) ? (
        jobs.map((job, index) => (
          <div key={index} className="job-item bg-white rounded-lg shadow-md p-6 mb-4" onClick={() => handleClick(job)}>
            <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
            <p className="text-gray-700 mb-4">{job.jobDescription}</p>
            <p className="text-gray-600">Salary: {job.salaryPerMonth}</p>
            <p className="text-gray-600">Offered By: {job.offeredBy.name}</p>
            <p className="text-gray-600">Skills Required: {job.skillsRequired.map(skill => skill).join(", ")}</p>
            <p className="text-gray-600">Index: {index}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-xl text-gray-600">No jobs available</p>
      )}
    </div>
  );
};

export default JobFeed;
