import React, { useState, useEffect } from "react";
import "../css/JobProfile.css"; // Import CSS file

const JobProfile = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(userData ? userData.name : "");
    const [newBio, setNewBio] = useState(userData ? userData.profile.bio : "");
    const [newEducation, setNewEducation] = useState(userData ? userData.profile.education : "");
    const [newExperience, setNewExperience] = useState(userData ? userData.profile.experience : "");
    const [newSkills, setNewSkills] = useState(userData ? userData.profile.skills : []);

    console.log("userData from localStorage:", userData); // Log userData

    const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available
    const email = userData ? userData.email : "ERROR"; // Default to "John Doe" if userData is not available
    const aboutMeBio = userData ? userData.profile.bio : "ERROR"; // Default to "John Doe" if userData is not available
    const education = userData ? userData.profile.education : "ERROR"; // Default to "John Doe" if userData is not available
    const experience = userData ? userData.profile.experience : "ERROR"; // Default to "John Doe" if userData is not available
    const skills = userData ? userData.profile.skills : []; // Default to "John Doe" if userData is not available

    console.log("JobSeekerNavBar component rendered");


    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            // Send PATCH request to update user profile
            const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
            const response = await fetch(`http://localhost:3000/api/profile/jobseeker/${userData._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profile: {
                        bio: newBio,
                        education: newEducation,
                        experience: newExperience,
                        skills: newSkills
                    },
                    name: newUsername
                }),
            });
            
            if (response.ok) {
                // Update local storage or any other state as needed
                setEditMode(false);
                // Update the bio in local storage if needed
                const updatedUserData = { ...userData, name: newUsername, profile: { ...userData.profile, bio: newBio, education: newEducation, experience: newExperience, skills: newSkills } };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
            } else {
                // Handle error responses
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleCancelClick = () => {
        setEditMode(false);
        // Reset the newBio state to the original bio
        setNewUsername(userData ? userData.name : "");
        setNewBio(userData ? userData.profile.bio : "");
        setNewEducation(userData ? userData.profile.education : "");
        setNewExperience(userData ? userData.profile.experience : "");
        setNewSkills(userData ? userData.profile.skills : []);
    };

    return (
        <div className="profile-container">
            <div className="profile-info flex items-center justify-start">
                <img src={"https://cdn.discordapp.com/attachments/769930602513301524/1222036053586739300/7bca3d73697acae9e475f021e6e3fba6.png?ex=6614c0c3&is=66024bc3&hm=80dcd3be87859a8d6544993abedbe48323191762d9c5853869bd51b82fdfe017&"} alt="Profile" />
                <div className="profile-details ml-4">
                    <div className="profile-username">
                        {editMode ? (
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                        ) : (
                            <h2>{userName}</h2>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Email: {email}</p>
                    </div>
                </div>
                <div className="ml-auto space-x-2">
                    {!editMode && <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>}
                    {/* <button onClick={editMode ? handleSaveClick : handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {editMode ? "Save" : "Edit"}
                    </button> */}
                </div>
            </div>

            <div className="about-section">
                <div className="text-gray-800 flex justify-between items-center">
                    <h3>About Me</h3>  
                </div>
                {editMode ? (
                    <textarea
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="bio-textarea full-width"
                    />
                ) : (
                    <p>{aboutMeBio}</p>
                )}
                
            </div>

            <div className="education-section">
                <div className="text-gray-800 flex justify-between items-center">
                    <h3>Education</h3>
                </div>
                {editMode ? (
                    <textarea
                        value={newEducation}
                        onChange={(e) => setNewEducation(e.target.value)}
                        className="education-textarea full-width"
                    />
                ) : (
                    <p>{education}</p>
                )}
            </div>

            <div className="experience-section">
                <div className="text-gray-800 flex justify-between items-center">
                    <h3>Experience</h3>
                </div>
                {editMode ? (
                    <textarea
                        value={newExperience}
                        onChange={(e) => setNewExperience(e.target.value)}
                        className="education-textarea full-width"
                    />
                ) : (
                    <p>{experience}</p>
                )}
            </div>

            <div className="skills-section">
                <div className="text-gray-800 flex justify-between items-center">
                    <h3>Skills</h3>
                </div>
                {editMode ? (
                    <textarea
                        value={newSkills.join(", ")}
                        onChange={(e) => setNewSkills(e.target.value.split(", "))}
                        className="skills-textarea full-width"
                    />
                ) : (
                    <p>{skills && skills.length ? skills.join(", ") : "None"}</p>
                )}
            </div>
            <div className="flex justify-center space-x-5 mt-5">
                {editMode && <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>}
                {editMode && <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>}
            </div>
        </div>
    );
};

export default JobProfile;
