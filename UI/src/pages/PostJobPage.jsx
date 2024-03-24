import React from 'react';
import { Link } from "react-router-dom";

function JobPostPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500">

            <div className="w-full max-w-3xl px-8 py-10 bg-white rounded-lg shadow-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Post a Job</h1>
                </div>

                <form className="flex flex-col space-y-2">

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
                            style={{ resize: 'none', minHeight: '120px' }}
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
                            required
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
                            >
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="salary" className="text-lg mb-2">
                                Salary:
                            </label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                className="rounded-md border border-gray-300 px-3 py-2 w-40"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-center bg-red-700 text-white rounded-lg hover:bg-red-900"
                    >
                        Post Job Offer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JobPostPage;
