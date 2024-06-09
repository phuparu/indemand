import React, { useState, useEffect } from "react";
import { admin } from "../assets/data/mockadmin";
import { toast } from "react-toastify";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const { username, email } = admin;
    setProfileData({
      username,
      email,
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
    toast.success("Profile updated successfully");
  };

  return (
    <motion.section
      className="bg-[#fff9ea]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 },
      }}
    >
      <div className="container shadow-md border-[1px] bg-white rounded px-6 md:px-10 lg:px-16">
        <h1 className="heading mx-auto text-center my-8">Admin Profile</h1>
        <div className="text__para text-[28px] my-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <IoPersonSharp className="mr-3" />
                Name &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="username-input"
                  />
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="username-span"
                  >
                    {profileData.username}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <MdEmail className="mr-3" />
                Email &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="email-input"
                  />
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="email-span"
                  >
                    {profileData.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex justify-end mx-4 my-6">
          <AnimatePresence>
            {isEditing ? (
              <motion.button
                onClick={handleSave}
                className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key="save-button"
              >
                Save
              </motion.button>
            ) : (
              <motion.button
                onClick={toggleEditMode}
                className="btn rounded bg-primaryColor text-white text-[18px] px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key="edit-button"
              >
                Edit Profile
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default AdminProfile;
