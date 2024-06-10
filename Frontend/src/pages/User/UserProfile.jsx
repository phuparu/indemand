import React, { useState, useEffect } from "react";
import { users } from "../../assets/data/mockuser";
import { toast } from "react-toastify";
import { IoPersonSharp, IoSchoolSharp } from "react-icons/io5";
import { MdClass, MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../components/axiosCreds";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    gender: "",
    school: "",
    grade: "",
    birthdate: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);

  const fetchData = async () => {
    try {
      await axios.get("/profile/get").then((res) => {
        console.log("User profile data:", res.data);
        setProfileData({
          username: res.data.name,
          email: res.data.email,
          gender: res.data.gender || "",
          school: res.data.school || "",
          grade: res.data.grade_level || "",
          birthdate: res.data.birthdate || "",
        });
      });
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  const fetchBookingHistory = async () => {
    try {
      await axios.get("/booking/getStudentBooking").then((res) => {
        console.log("Booking history:", res.data);
        setBookingHistory(res.data);
      });
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBookingHistory();
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
    axios.post("/profile/update/student", profileData);
    setIsEditing(false);
    toast.success("Submission successful");
  };

  const cancelBooking = async (bookingId) => {

    try {
      await axios.post("/booking/cancel", {
        session_id: bookingId,
      });
      setBookingHistory((prevHistory) =>
        prevHistory.filter((booking) => booking.session_id !== bookingId)
      );
      toast.success("Booking canceled successfully");
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking. Please try again later.");
    }
  };

  const columns = [
    { key: "subject", title: "Subject" },
    { key: "date", title: "Date" },
    { key: "start_time", title: "Start Time" },
    { key: "endTime", title: "End Time" },
    { key: "status", title: "Status" },
    { key: "actions", title: "Actions" },
  ];

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
        <h1 className="heading mx-auto text-center my-8">User Profile</h1>
        <div className="text__para text-[28px] my-8 flex flex-col gap-4">
          <div className="flex md:flex-row justify-evenly gap-4">
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

            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <FaPerson className="mr-3" />
                Gender &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="gender-input"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </motion.select>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="gender-span"
                  >
                    {profileData.gender}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <IoSchoolSharp className="mr-3" />
                School &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.input
                    type="text"
                    name="school"
                    value={profileData.school}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
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

            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <MdClass className="mr-3" />
                Grade &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.input
                    type="text"
                    name="grade"
                    value={profileData.grade}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
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
            <div className="flex flex-1 items-center py-4">
              <label className="flex text-black items-center">
                <FaBirthdayCake className="mr-3" />
                Birthdate &nbsp;
              </label>
              <AnimatePresence>
                {isEditing ? (
                  <motion.input
                    type="date"
                    name="birthdate"
                    value={profileData.birthdate}
                    onChange={handleInputChange}
                    className="form__input mt-1 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="birthdate-input"
                  />
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    key="birthdate-span"
                  >
                    {profileData.birthdate}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="text__para text-[28px] mx-4 my-6 flex-row gap-4 text-black">
          Booking History
        </div>
        <div className="mx-4 my-6">
          {bookingHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="py-3 px-4"
                        style={{ maxWidth: "200px" }}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {bookingHistory.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4">{booking.course_id}</td>

                      <td className="py-3 px-4">{booking.date}</td>
                      <td className="py-3 px-4">{booking.start_time}</td>
                      <td className="py-3 px-4">{booking.end_time}</td>
                      <td
                        className={`py-3 px-4 ${booking.status === "Upcoming" ? "text-green-500" : "text-yellow-500"}`}
                      >
                        {booking.status || "Upcoming"}
                      </td>
                      <td className="py-3 px-4">
                        {booking.status === "Upcoming" && (
                          <button
                            onClick={() => cancelBooking(booking.session_id)}
                            className="btn ml-2 text-white bg-red-800"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
