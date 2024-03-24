import React, {useState} from "react";
import { searchJobsByTitle } from "../lib/joboffer.fetch";

const JobSearchBar = () => {
    const [searchInput, setSearchInput] = useState("")
    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Search Jobs"
                className="w-full px-4 py-2 mr-2 text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
                Search
            </button>
        </div>
    );
};

export default JobSearchBar;