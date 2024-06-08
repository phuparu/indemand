import React, { useState, useEffect } from "react";
import { users } from "../../assets/data/mockuser";
import { toast } from "react-toastify";
import { IoPersonSharp, IoSchoolSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: "",
    school: "",
    grade: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const user = users[0];
    setProfileData({
      fullname: user.fullname,
      school: "",
      grade: "",
    });

    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      //  API booking history
      const response = await fetch("your-api-endpoint");
      const data = await response.json();
      setBookingHistory(data);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

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
    toast.success("Submission successful");
  };

  // Function to cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      // Call backend API to cancel booking
      const response = await fetch(`your-api-endpoint/${bookingId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove canceled booking from state
        setBookingHistory((prevHistory) =>
          prevHistory.filter((booking) => booking.id !== bookingId)
        );
        toast.success("Booking canceled successfully");
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking");
    }
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
      <div className="container shadow-md border-[1px] bg-white rounded max-md:px-2">
        <h1 className="heading mx-auto text-center my-8">User Profile</h1>
        <div
          className="text__para text-[28px] mx-4 my-8 flex flex-row gap-4 
        text-center justify-evenly max-md:block"
        >
          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black ">
              <IoPersonSharp className="mx-3" />
              Name : &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="fullname"
                  value={profileData.fullname}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="fullname-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="fullname-span"
                >
                  {profileData.fullname}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <IoSchoolSharp className="mx-3" />
              School : &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="school"
                  value={profileData.school}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="school-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="school-span"
                >
                  {profileData.school}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <MdClass className="mx-3" />
              Grade : &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="grade"
                  value={profileData.grade}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="grade-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="grade-span"
                >
                  {profileData.grade}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="text__para text-[28px] mx-4 my-6 flex-row gap-4 text-black">
          Booking History
        </div>
        <div className="mx-4 my-6">
          {bookingHistory.length > 0 ? (
            <ul>
              {bookingHistory.map((booking, index) => (
                <li key={index} className="mb-2">
                  {booking.details}
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="btn ml-2 text-white bg-red-800"
                  >
                    Cancel Booking
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No booking history available.</p>
          )}
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

export default UserProfile;
