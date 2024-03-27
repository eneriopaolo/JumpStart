import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { viewJobOffers } from "../lib/joboffer.fetch";
import JobSeekerNavBar from "../components/JobSeekerNavBar";
import JobOfferFeed from "../components/JobOfferFeed";

const JobSeekerHomePage = () => {
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await viewJobOffers();
                const data = await response.json()

                if (Array.isArray(data)) {
                    setJobData(data.reverse());
                } else {
                    console.error("API response is not an array:", data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobData();
    }, []);

    if (!localStorage.getItem("token")){
        localStorage.clear();
        return <Navigate to="/"/>
    };
    return (
        <>
            <JobSeekerNavBar />
            <JobOfferFeed jobs={jobData}/>
        </>
    );
};

export default JobSeekerHomePage;
