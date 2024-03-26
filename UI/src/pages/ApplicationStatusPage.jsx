import React, { useState, useEffect } from "react";

const ApplicationStatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [employerNames, setEmployerNames] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
        const response = await fetch("http://localhost:3000/api/application", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setApplications(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    if (applications.length === 0) return;

    const fetchEmployerNames = async () => {
      try {
        const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");

        const employerIds = [...new Set(applications.map(application => application.jobOffer.offeredBy))];

        const namesPromises = employerIds.map(async (employerId) => {
          const response = await fetch(`http://localhost:3000/api/profile/employer/${employerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          return { [employerId]: data.name };
        });

        const namesArray = await Promise.all(namesPromises);
        const namesObject = Object.assign({}, ...namesArray);
        setEmployerNames(namesObject);
        console.log(employerNames)
      } catch (error) {
        console.error("Error fetching employer names:", error);
      }
    };

    fetchEmployerNames();
  }, [applications]);

  return (
    <div className="application-status-page bg-gray-100 p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Application Status</h1>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <div key={index} className="application-item bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-2xl font-bold mb-2">{application.jobOffer.jobTitle}</h2>
                <p className="text-gray-700 mb-4">Offered By: <span className="font-semibold">{employerNames[application.jobOffer.offeredBy] || "Unknown"}</span></p>
                <p>{application.jobOffer.jobDescription}</p>
                <br />
                <p className="text-gray-600 text-lg mb-4">
                  <span>Salary: {application.jobOffer.salaryPerMonth}, </span>
                  <span>Date Offered: {new Date(application.jobOffer.dateOffered).toLocaleDateString()}, </span>
                  <span>Skills Required: {application.jobOffer.skillsRequired.join(", ") || "NONE"}, </span>
                  <span>Experience Required: {application.jobOffer.jobCategory}</span>
                </p>
                <p className="text-gray-600 mb-4">Application Status: {application.applicationStatus}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-600">No applications found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusPage;
