import React, { useState, useEffect } from "react";
import { users } from "../../assets/data/mockuser";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: "",
    school: "",
    grade: "",
  });

  useEffect(() => {
    const user = users[0];
    setProfileData({
      fullname: user.fullname,
      school: "",
      grade: "",
    });
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    console.log("Profile data saved:", profileData);
    setIsEditing(false);
  };

  return (
    <section>
      <div className="container shadow-md border-[1px] rounded">
        <h1 className="heading mx-auto text-center my-8">User Profile</h1>
        <div
          className="text__para text-[28px] mx-4 my-8 flex flex-row gap-4 
        text-center justify-evenly min-w-screen-md"
        >
          <div className="my-6 px-4 py-4 flex">
            <label className="block text-black">Name: &nbsp;</label>
            {isEditing ? (
              <input
                type="text"
                name="fullname"
                value={profileData.fullname}
                onChange={handleInputChange}
                className="form__input mt-1 w-full mx-4"
              />
            ) : (
              <span>{profileData.fullname}</span>
            )}
          </div>
          <div className="my-6 px-4 py-4 flex">
            <label className="block text-black">School: &nbsp;</label>
            {isEditing ? (
              <input
                type="text"
                name="school"
                value={profileData.school}
                onChange={handleInputChange}
                className="form__input mt-1 w-full mx-4"
              />
            ) : (
              <span>{profileData.school}</span>
            )}
          </div>
          <div className="my-6 px-4 py-4 flex">
            <label className="block text-black">Grade: &nbsp;</label>
            {isEditing ? (
              <input
                type="text"
                name="grade"
                value={profileData.grade}
                onChange={handleInputChange}
                className="form__input mt-1 w-full mx-4"
              />
            ) : (
              <span>{profileData.grade}</span>
            )}
          </div>
        </div>
        <div className="text__para text-[28px] mx-4 my-6 flex-row gap-4 text-black">
          Booking History
        </div>

        <div className="flex justify-end mx-4 my-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={toggleEditMode}
              className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
