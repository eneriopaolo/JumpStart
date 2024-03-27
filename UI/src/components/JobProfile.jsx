import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const JobProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData2"));
  const currentUserData = JSON.parse(localStorage.getItem("currentUserData")); // Assuming you have current user data stored
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(userData ? userData.name : "");
  const [newBio, setNewBio] = useState(userData ? userData.profile.bio : "");
  const [newEducation, setNewEducation] = useState(
    userData ? userData.profile.education : ""
  );
  const [newExperience, setNewExperience] = useState(
    userData ? userData.profile.experience : ""
  );
  const [newSkills, setNewSkills] = useState(
    userData ? userData.profile.skills : []
  );

  console.log("userData from localStorage:", userData); // Log userData
  console.log("currentuserData from localStorage:", currentUserData); // Log userData

  const userName = userData ? userData.name : "ERROR"; // Default to "John Doe" if userData is not available
  const email = userData ? userData.email : "ERROR"; // Default to "John Doe" if userData is not available
  const aboutMeBio = userData ? userData.profile.bio : "ERROR"; // Default to "John Doe" if userData is not available
  const education = userData ? userData.profile.education : "ERROR"; // Default to "John Doe" if userData is not available
  const experience = userData ? userData.profile.experience : "ERROR"; // Default to "John Doe" if userData is not available
  const skills = userData ? userData.profile.skills : []; // Default to "John Doe" if userData is not available

  console.log("JobSeekerNavBar component rendered");

  const isCurrentUser = currentUserData && currentUserData._id === userData._id;

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send PATCH request to update user profile
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
      const response = await fetch(
        `http://localhost:3000/api/profile/jobseeker/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profile: {
              bio: newBio,
              education: newEducation,
              experience: newExperience,
              skills: newSkills,
            },
            name: newUsername,
          }),
        }
      );

      if (response.ok) {
        // Update local storage or any other state as needed
        setEditMode(false);
        // Update the bio in local storage if needed
        const updatedUserData = {
          ...userData,
          name: newUsername,
          profile: {
            ...userData.profile,
            bio: newBio,
            education: newEducation,
            experience: newExperience,
            skills: newSkills,
          },
        };
        localStorage.setItem("userData2", JSON.stringify(updatedUserData));
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      } else {
        // Handle error responses
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
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
    <div className="max-w-3xl mx-auto mt-10 p-12 border border-gray-300 rounded-lg bg-gray-100">
      <div className="flex justify-center items-center mb-10 border-b-2 border-gray-700 flex items-center justify-start">
        <img
          src={
            "https://cdn.discordapp.com/attachments/769930602513301524/1222036053586739300/7bca3d73697acae9e475f021e6e3fba6.png?ex=6614c0c3&is=66024bc3&hm=80dcd3be87859a8d6544993abedbe48323191762d9c5853869bd51b82fdfe017&"
          }
          className="w-32 h-32 rounded-full mb-5 mr-5"
          alt="Profile"
        />
        <div className="ml-5 text-left ml-4">
          <div className="text-3xl font-bold">
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
          {isCurrentUser && !editMode && (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPencilAlt />
            </button>
          )}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">About Me</h3>
        </div>
        {editMode ? (
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="bio-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">{aboutMeBio}</p>
        )}
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">Education</h3>
        </div>
        {editMode ? (
          <textarea
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            className="education-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">{education}</p>
        )}
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">Experience</h3>
        </div>
        {editMode ? (
          <textarea
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            className="education-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">{experience}</p>
        )}
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">Skills</h3>
        </div>
        {editMode ? (
          <textarea
            value={newSkills.join(", ")}
            onChange={(e) => setNewSkills(e.target.value.split(", "))}
            className="skills-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">
            {skills && skills.length ? skills.join(", ") : "None"}
          </p>
        )}
      </div>
      <div className="flex justify-center space-x-5 mt-5">
        {editMode && (
          <button
            onClick={handleCancelClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center"
          >
            <span className="mr-2">Cancel</span>
            <MdCancel />
          </button>
        )}
        {editMode && (
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <span className="mr-2">Save</span>
            <IoIosSave />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobProfile;
