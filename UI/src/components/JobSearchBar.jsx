import React, {useState, useEffect} from "react";
import { searchJobsByTitle } from "../lib/joboffer.fetch";

const JobSearchBar = () => {
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setNewJobTitle] = useState("");

    function handleInputChange(event) {
        setNewJobTitle(event.target.value)
    };

    function searchJobs() {
        let data = searchJobsByTitle(jobTitle)
        console.log(data)
        setJobs(data)
        console.log(jobs)
    }

    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Enter Job Title..."
                value={jobTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mr-2 text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={searchJobs}
            >
                Search
            </button>
        </div>
    );
};

export default JobSearchBar;