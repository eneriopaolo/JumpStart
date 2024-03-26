import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import EmployerNavBar from "./EmployerNavBar";

function PostJobPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        skillsRequired: [],
        experienceLevel: "Entry",
        salary: ""
    });

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
        try {
            const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
            const response = await fetch("http://localhost:3000/api/job", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    jobTitle: formData.jobTitle,
                    jobDescription: formData.jobDescription,
                    jobCategory: formData.experienceLevel, 
                    salaryPerMonth: formData.salary,
                    skillsRequired: formData.skillsRequired
                })
            });
            if (response.ok) {
                navigate("/employer-home-page");
            } else {
                console.error("Failed to post job offer");
            }
        } catch (error) {
            console.error("Error posting job offer:", error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

            <div className="w-full max-w-3xl px-8 py-10 bg-white rounded-lg shadow-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Post a Job</h1>
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
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="job-description" className="text-lg mb-2">
                            Job Description:
                        </label>
                        <textarea
                            id="job-description"
                            name="jobDescription"
                            className="rounded-md border border-gray-300 px-3 py-2"
                            required
                            style={{ resize: "none", minHeight: "120px" }}
                            onChange={handleChange}
                        />
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
                                type="number"
                                id="salary"
                                name="salary"
                                className="rounded-md border border-gray-300 px-3 py-2 w-40"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                    >
                        Post Job Offer
                    </button>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                        onClick={() => navigate("/employer-home-page")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostJobPage;
