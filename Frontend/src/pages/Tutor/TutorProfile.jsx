import React, { useState, useEffect } from "react";
import { tutors } from "../../assets/data/mocktutors";
import { toast } from "react-toastify";
import { IoPersonSharp, IoSchoolSharp } from "react-icons/io5";
import { MdSubject } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tutorData, setTutorData] = useState({
    fullname: "",
    profile: "",
    subject: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const tutor = tutors[0];
    setTutorData({
      fullname: tutor.fullname,
      profile: tutor.profile,
      subject: tutor.subject,
    });

    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      // Replace with your API call to fetch booking history
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
    setTutorData({ ...tutorData, [name]: value });
  };

  const handleSave = () => {
    console.log("Profile data saved:", tutorData);
    setIsEditing(false);
    toast.success("Submission successful");
  };

  return (
    <motion.section
      className="bg-[#fff9ea]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 3,
        x: { duration: 1 },
      }}
    >
      <div className="container shadow-md border-[1px] bg-white rounded max-md:px-2">
        <h1 className="heading mx-auto text-center my-8">Tutor Profile</h1>
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
                  value={tutorData.fullname}
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
                  {tutorData.fullname}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <IoSchoolSharp className="mx-3" />
              Profile : &nbsp;
            </label>
            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="profile"
                  value={tutorData.profile}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="profile-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="profile-span"
                >
                  {tutorData.profile}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 px-4 py-4 flex">
            <label className="flex text-black">
              <MdSubject className="mx-3" />
              Subject : &nbsp;
            </label>

            <AnimatePresence>
              {isEditing ? (
                <motion.input
                  type="text"
                  name="subject"
                  value={tutorData.subject}
                  onChange={handleInputChange}
                  className="form__input mt-1 w-full mx-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="subject-input"
                />
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key="subject-span"
                >
                  {tutorData.subject}
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

export default TutorProfile;