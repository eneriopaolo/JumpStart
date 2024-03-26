import React, {useState, useEffect} from "react";
import { searchJobsByTitle } from "../lib/joboffer.fetch";
import { Link } from "react-router-dom";
import "../css/JobProfile.css"; // Import CSS file

const JobProfile = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    console.log("userData from localStorage:", userData); // Log userData

    const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available
    const email = userData ? userData.email : "ERROR"; // Default to "John Doe" if userData is not available
    const aboutMeBio = userData ? userData.profile.bio : "ERROR"; // Default to "John Doe" if userData is not available
    const skills = userData ? userData.profile.skills : "ERROR"; // Default to "John Doe" if userData is not available
    console.log("JobSeekerNavBar component rendered");

    return (
        <div className="profile-container">
            <div className="profile-info">
                <img src={"https://cdn.discordapp.com/attachments/769930602513301524/1222036053586739300/7bca3d73697acae9e475f021e6e3fba6.png?ex=6614c0c3&is=66024bc3&hm=80dcd3be87859a8d6544993abedbe48323191762d9c5853869bd51b82fdfe017&"} alt="Profile" />
                <div className="profile-details">
                    <div className="profile-username">
                        <h2>{userName}</h2>
                    </div>
                    <div>
                        <p>Email: {email}</p>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <h3>About Me</h3>
                <p>{aboutMeBio}</p>
            </div>
            <div className="address-section">
                <h3>Address</h3>
                <p>{skills}</p>
            </div>
        </div>
    );
};

export default JobProfile;