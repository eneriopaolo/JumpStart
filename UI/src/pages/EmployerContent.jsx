import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployerContent = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");

      const response = await fetch("http://localhost:3000/api/job/myoffer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchApplicantName = async (applicantId) => {
    try {
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
      const response = await fetch(
        `http://localhost:3000/api/profile/jobseeker/${applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      return data.name || "Unknown";
    } catch (error) {
      console.error("Error fetching applicant name:", error);
      return "Unknown";
    }
  };

  const updateSelectedJobAfterHiring = (application) => {
    setSelectedJob((prev) => ({
      ...prev,
      applications: prev.applications.map((app) =>
        app.applicant._id === application.applicant._id
          ? {
              ...app,
              applicationStatus: "Accepted",
            }
          : app
      ),
    }));
  };

  const handleViewProfile = async (application) => {
    console.log(application);
    console.log(
      "View Profile clicked for applicant:",
      application.applicantName
    );
    if (application.applicant) {
      try {
        const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
        const response = await fetch(`http://localhost:3000/api/profile/jobseeker/${application.applicant}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data));
        console.log("THIS", JSON.parse(localStorage.getItem('userData')));
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    }
    console.log("Where", localStorage.getItem('userData'));
    navigate(`/view-profile-page`);
  };

  const handleHire = async (application) => {
    console.log("Hire clicked for applicant:", application.applicantName);

    const fetchJobs = async () => {
      try {
        const token = String(localStorage.getItem("token")).replace(
          /['"]+/g,
          ""
        );

        const response = await fetch("http://localhost:3000/api/job/myoffer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    try {
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");

      const response = await fetch(
        `http://localhost:3000/api/application/approve/${application._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "accepted",
          }),
        }
      );

      const data = await response.json();

      if (data.msg === "Successfully approved the application.") {
        setSelectedJob((prevJob) => ({
          ...prevJob,
          applications: prevJob.applications.map((app) =>
            app._id === application._id
              ? {
                  ...app,
                  applicationStatus: "Accepted",
                  applicantName:
                    data.applicant?.name || app.applicantName || "Unknown",
                }
              : app
          ),
        }));

        setPopupMessage(
          `Successfully hired ${application.applicantName || "Unknown"}`
        );
        setShowPopup(true);

        fetchJobs();
      } else {
        console.error("API response:", data);
        setPopupMessage("Failed to approve the application.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error hiring applicant:", error);
      setPopupMessage("An error occurred while hiring the applicant.");
      setShowPopup(true);
    }
    fetchJobs();
  };

  const handleDecline = async (application) => {
    console.log("Decline clicked for applicant:", application.applicantName);

    try {
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");

      const response = await fetch(
        `http://localhost:3000/api/application/deny/${application._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "denied",
          }),
        }
      );

      const data = await response.json();

      if (data.msg === "Successfully denied the application.") {
        setSelectedJob((prevJob) => ({
          ...prevJob,
          applications: prevJob.applications.filter(
            (app) => app._id !== application._id
          ),
        }));

        setPopupMessage(
          `Successfully declined ${application.applicantName || "Unknown"}`
        );
        setShowPopup(true);

        fetchJobs();
      } else {
        console.error("API response:", data);
        setPopupMessage("Failed to decline the application.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error declining applicant:", error);
      setPopupMessage("An error occurred while declining the applicant.");
      setShowPopup(true);
    }
  };

  const handleClick = async (job) => {
    setIsLoading(true);

    setSelectedJob(job);

    const applicantNames = await Promise.all(
      job.applications.map((application) =>
        fetchApplicantName(application.applicant)
      )
    );

    setSelectedJob((prev) => ({
      ...prev,
      applications: prev.applications.map((application, index) => ({
        ...application,
        applicantName: applicantNames[index],
      })),
      offeredBy: {
        profile: {
          name: job.offeredBy.name || "Unknown",
        },
      },
    }));

    setIsLoading(false);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div className="job-feed bg-gray-100 p-4 relative">
      <p className="mt-5">My Job Offers</p>
      {Array.isArray(jobs) ? (
        jobs.map((job, index) => (
          <div
            key={index}
            className="job-item bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
            onClick={() => handleClick(job)}
          >
            <h2 className="text-2xl font-bold mb-2">{job.jobTitle}</h2>
            <p className="text-gray-700 mb-4">
              Offered By:{" "}
              <span className="font-semibold">
                {job.offeredBy && job.offeredBy.name
                  ? job.offeredBy.name
                  : "Unknown"}
              </span>
            </p>
            <p>{job.jobDescription} </p>
            <br />
            <p className="text-gray-600 text-lg mb-4">
              <span>Salary: {job.salaryPerMonth}, </span>
              <span>
                Date Offered: {new Date(job.dateOffered).toLocaleDateString()},{" "}
              </span>
              <span>
                Skills Required: {job.skillsRequired.join(", ") || "NONE"},{" "}
              </span>
              <span>Experience Required: {job.jobCategory}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Number of Applicants:{" "}
              {
                job.applications.filter(
                  (application) => application.applicationStatus !== "Denied"
                ).length
              }
            </p>
            <p className="text-gray-600">Index: {index}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-xl text-gray-600">
          No job offers available
        </p>
      )}

      {selectedJob && !isLoading && (
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
              <h2 className="text-4xl font-bold mb-6">
                {selectedJob.jobTitle}
              </h2>
              <p className="text-gray-700 mb-6 text-xl">
                Offered By:{" "}
                <span className="font-semibold">
                  {selectedJob.offeredBy &&
                  selectedJob.offeredBy.profile &&
                  selectedJob.offeredBy.profile.name
                    ? selectedJob.offeredBy.profile.name
                    : "Unknown"}
                </span>
              </p>
              <div className="border-b mb-8"></div>
              <p className="text-gray-700 text-xl mb-6">
                {selectedJob.jobDescription}
              </p>
              <div className="border-b mb-8"></div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span className="text-xl">
                  Salary: {selectedJob.salaryPerMonth}
                </span>
                <span className="text-xl">
                  Skills Required:{" "}
                  {selectedJob.skillsRequired.join(", ") || "NONE"}
                </span>
                <span className="text-xl">
                  Experience Required: {selectedJob.jobCategory}
                </span>
              </div>
              <div className="border-b mb-8"></div>
              <span className="flex justify-between text-gray-600 mb-4 text-xl">
                Number of Applicants:{" "}
                {
                  selectedJob.applications.filter(
                    (application) => application.applicationStatus !== "Denied"
                  ).length
                }
              </span>

              <div className="flex flex-col">
                <span className="text-xl font-semibold mb-2">Applicants:</span>
                {selectedJob.applications &&
                  selectedJob.applications
                    .filter(
                      (application) =>
                        application.applicationStatus !== "Denied"
                    ) // Filter out denied applicants
                    .map((application, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mb-2"
                      >
                        <span className="text-gray-600">
                          {application.applicantName || "Unknown"}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            onClick={() => handleViewProfile(application)}
                          >
                            View Profile
                          </button>
                          {application.applicationStatus === "Accepted" ? (
                            <button
                              className="bg-gray-500 text-white px-4 py-1 rounded cursor-not-allowed"
                              disabled
                            >
                              HIRED
                            </button>
                          ) : (
                            <button
                              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                              onClick={() => handleHire(application)}
                            >
                              Hire
                            </button>
                          )}
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDecline(application)}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading && <p>Loading...</p>}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md flex flex-col items-center justify-center">
            <p className="text-xl">{popupMessage}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handlePopupClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerContent;

