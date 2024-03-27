import React, {useState} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { postJobOffer } from "../lib/joboffer.fetch"

function PostJobPage() {
    if(!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
      };
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        skillsRequired: [],
        experienceLevel: "Entry",
        salary: ""
    });

    const [titleError, setTitleError] = useState("");
    const [jobDescError, setJobDescError] = useState("");
    const [salaryError, setSalaryError] = useState("");

    const clearState = () => {
        setTitleError("");
        setJobDescError("");
        setSalaryError("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'skillsRequired' ? value.split(',').map(skill => skill.trim()) : value
            // if name is skillsRequired, split the values in it with a comma then trim each value in array with .map method, else then value is directly assigned
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearState();

        if (!formData.jobTitle) {
            setTitleError("Please enter a Job Title.");
        } else if (!formData.jobDescription) {
            setJobDescError("Please enter a Job Description.");
        } else if (!formData.salary) {
            setSalaryError("Please enter a Salary Amount.");
        } else if (isNaN(formData.salary)) {
            setSalaryError("Salary should be a numeric value.");
        } else if (Number(formData.salary) <= 0) {
            setSalaryError("Invalid Salary Amount.");
        } else {
            try {
                const response = await postJobOffer(formData.jobTitle, formData.jobDescription, formData.experienceLevel, formData.salary, formData.skillsRequired);
                if (response.ok) {
                    navigate("/employer-home-page");
                } else {
                    console.error("Failed to post job offer");
                }
            } catch (error) {
                console.error("Error posting job offer:", error);
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-400">

            <div className="w-full max-w-3xl px-8 py-10 bg-white rounded-lg shadow-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Post a Job Offer</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">

                    <div className="flex flex-col">
                        <label htmlFor="job-title" className="text-lg mb-2">
                            Job Title:
                        </label>
                        <input
                            type="text"
                            id="job-title"
                            name="jobTitle"
                            className="rounded-md border border-gray-300 px-3 py-2"
                            maxLength={50}
                            onChange={handleChange}
                        />
                        {titleError && <span className="text-sm text-sm text-red-500">{titleError}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="job-description" className="text-lg mb-2">
                            Job Description:
                        </label>
                        <textarea
                            id="job-description"
                            name="jobDescription"
                            className="rounded-md border border-gray-300 px-3 py-2"
                            style={{ resize: "none", minHeight: "120px" }}
                            onChange={handleChange}
                        />
                        {jobDescError && <span className="text-sm text-sm text-red-500">{jobDescError}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="skills-required" className="text-lg mb-2">
                            Skills Required:
                        </label>
                        <input
                            type="text"
                            id="skills-required"
                            name="skillsRequired"
                            className="rounded-md border border-gray-300 px-3 py-2"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="experience-level" className="text-lg mb-2">
                                Experience Level:
                            </label>
                            <select
                                id="experience-level"
                                name="experienceLevel"
                                className="rounded-md border border-gray-300 px-3 py-2"
                                required
                                onChange={handleChange}
                            >
                                <option value="Entry">Entry Level</option>
                                <option value="Intermediate">Intermediate Level</option>
                                <option value="Expert">Expert Level</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="salary" className="text-lg mb-2">
                                Salary:
                            </label>
                            <input
                                id="salary"
                                name="salary"
                                className="rounded-md border border-gray-300 px-3 py-2 w-40"
                                onChange={handleChange}
                            />
                            {salaryError && <span className="text-sm text-sm text-red-500">{salaryError}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 pt-5">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-900 hover:font-bold"
                        >
                            Post Job Offer
                        </button>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-900 hover:font-bold"
                            onClick={() => navigate("/employer-home-page")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostJobPage;
