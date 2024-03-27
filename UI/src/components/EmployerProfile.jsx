import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const EmployerProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(userData ? userData.name : "");
  const [newAddress, setNewAddress] = useState(
    userData && userData.profile ? userData.profile.address : ""
  );
  const [newDescription, setNewDescription] = useState(
    userData && userData.profile ? userData.profile.description : ""
  );

  // const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
  // console.log(token);

  console.log("userData from localStorage:", userData); // Log userData

  const userName = userData ? userData.name : "ERROR"; // Default to "ERROR" if userData is not available
  const email = userData ? userData.email : "ERROR"; // Default to "ERROR" if userData is not available
  const description =
    userData && userData.profile ? userData.profile.description : "None"; // Default to "ERROR" if userData or userData.profile is not available
  const address =
    userData && userData.profile ? userData.profile.address : "None"; // Default to "ERROR" if userData or userData.profile is not available

  console.log("JobSeekerNavBar component rendered");

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send PATCH request to update user profile
      const token = String(localStorage.getItem("token")).replace(/['"]+/g, "");
      const response = await fetch(
        `http://localhost:3000/api/profile/employer/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profile: {
              address: newAddress,
              description: newDescription,
            },
            name: newUsername,
          }),
        }
      );

      if (response.ok) {
        // Update local storage or any other state as needed
        setEditMode(false);
        // Update the description in local storage if needed
        const updatedUserData = {
          ...userData,
          name: newUsername,
          profile: {
            ...userData.profile,
            address: newAddress,
            description: newDescription,
          },
        };
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
    // Reset the newAddress and newDescription states to the original values
    setNewUsername(userData ? userData.name : "");
    setNewAddress(userData ? userData.profile.address : "");
    setNewDescription(userData ? userData.profile.description : "");
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
          {!editMode && (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPencilAlt />
            </button>
          )}
          {/* <button onClick={editMode ? handleSaveClick : handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {editMode ? "Save" : "Edit"}
                    </button> */}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">About Me</h3>
        </div>
        {editMode ? (
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="bio-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">{description}</p>
        )}
      </div>

      <div className="mt-5">
        <div className="text-gray-800 flex justify-between items-center">
          <h3 className="text-gray-800 text-lg mb-4">Address</h3>
        </div>
        {editMode ? (
          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="address-textarea w-full"
          />
        ) : (
          <p className="leading-relaxed">{address}</p>
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

export default EmployerProfile;
