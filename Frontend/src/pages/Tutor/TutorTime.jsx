import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../context/authController";
import Datepicker from "../../components/time/Datepicker";
import Timepicker from "../../components/time/Timepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import axios from "../../components/axiosCreds.js";

const TutorTime = () => {
  const [tutorBook, setTutorBook] = useState({
    student_name: "",
    subject: "",
    detail: "",
    date: "",
    startTime: "",
    endTime: "",
    hours: 0,
    status: "Present",
  });

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/booking/getTutorBooking");
        return (response.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData().then((data) => {
      setSessions(data);
      console.log(data);
    });
  }, []);


  useEffect(() => {
    if (tutorBook.startTime && tutorBook.endTime) {
      const hours = calculateHours(tutorBook.startTime, tutorBook.endTime);
      setTutorBook((prevState) => ({ ...prevState, hours }));
    }
  }, [tutorBook.startTime, tutorBook.endTime]);

  const calculateHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDate = new Date(1970, 0, 1, startHour, startMinute);
    const endDate = new Date(1970, 0, 1, endHour, endMinute);

    const diff = (endDate - startDate) / (1000 * 60 * 60);
    return diff >= 0 ? diff : 0;
  };

  const handleInputChange = (e) => {
    setTutorBook({ ...tutorBook, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const isoDate = date ? date.toISOString().split("T")[0] : "";
    setTutorBook((prevState) => ({
      ...prevState,
      date: isoDate,
      startTime: "",
      endTime: "",
    }));
  };

  const handleStartTimeChange = (time) => {
    if (!time) return;
    const formattedTime = `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setTutorBook((prevState) => ({ ...prevState, startTime: formattedTime }));
  };

  const handleEndTimeChange = (time) => {
    if (!time) return;
    const formattedTime = `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setTutorBook((prevState) => ({ ...prevState, endTime: formattedTime }));
  };

  const handleStatusChange = (e) => {
    setTutorBook({ ...tutorBook, status: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log()
    if (!tutorBook.startTime || !tutorBook.endTime) {
      toast.error("Please provide both start and end times.");
      return;
    }
    console.log(tutorBook);
    toast.success("Submission successful");
  };




  return (
    <section>
      <div className="heading text-center py-[15px] px-[15px]">
        <h1>Time Attendance</h1>
      </div>
      <div className="text-headingColor text-[32px] py-[15px] px-[15px] text-center">
        <h2>Hello! { }</h2>
      </div>
      <div className="container w-full px-4 mx-auto max-w-screen-md">
        <form onSubmit={submitHandler} className="space-y-8">
          <div className="items-center mx-4">
            <label htmlFor="student_name" className="form__label px-4">
              คาบเรียน
            </label>
            <select
              name="session"
              value={tutorBook.session}
              onChange={(e) => {
                const selectedSession = sessions.find(session => session.session_id === e.target.value);
                setSelectedSession(selectedSession);
              }}
              className="mt-1 form__input"
              required>
              <option value="">เลือกคาบเรียน</option>
              {sessions.map((session) => (
                <option key={session.session_id} value={session.session_id}>
                  {(session.timerange).toString() + " " + (session.course_id).toString()}
                </option>
              ))
              }
            </select>
          </div>
          <div className="items-center mx-4">
            <label htmlFor="student_name" className="form__label px-4">
              รหัสนักเรียน
            </label>
            <input
              type="text"
              name="student_id"
              value={selectedSession.student_id}
              onChange={handleInputChange}
              placeholder="รหัสนักเรียนที่สอน"
              className="form__input mt-1"
              disabled
              required
            />
          </div>

          <div className="items-center mx-4">
            <label htmlFor="subject" className="form__label px-4">
              วิชาที่สอน
            </label>
            <input
              name="subject"
              value={selectedSession.course_id}
              onChange={handleInputChange}
              className="mt-1 form__input"
              disabled
              required
            />
          </div>
          <div className="items-center mx-4">
            <label htmlFor="status" className="form__label px-4">
              Status
            </label>
            <select
              name="status"
              onChange={handleStatusChange}
              className="mt-1 form__input"
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
          <div className="items-center mx-4">
            <label htmlFor="detail" className="form__label px-4">
              รายละเอียดที่สอน
            </label>
            <input
              type="text"
              name="detail"
              value={selectedSession.feedback}
              onChange={handleInputChange}
              placeholder="รายละเอียด หรือหัวข้อที่สอน"
              className="form__input mt-1"
            />
          </div>

          <div className="items-center mx-4">
            <label htmlFor="date" className="form__label px-4">
              วันที่สอน
            </label>
            <Datepicker
              className="form__input mt-1 w-full"
              onDateChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />
            {selectedSession.date && (
              <p>Date: {new Date(selectedSession.date).toLocaleDateString()}</p>
            )}
          </div>

          <div className="items-center mx-4">
            <label htmlFor="startTime" className="form__label px-4">
              เวลาเริ่มต้น
            </label>
            <Timepicker
              className="form__input mt-1 w-full"
              onDateChange={handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeFormat="HH:mm"
              timeCaption="Time"
            />
            {selectedSession.start_time && <p>Start Time: {selectedSession.start_time}</p>}
          </div>

          <div className="items-center mx-4">
            <label htmlFor="endTime" className="form__label px-4">
              เวลาสิ้นสุด
            </label>
            <Timepicker
              className="form__input mt-1 w-full"
              onDateChange={handleEndTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeFormat="HH:mm"
              timeCaption="Time"
            />
            {selectedSession.end_time && <p>End Time: {selectedSession.end_time}</p>}
          </div>

          <div className="mt-7 mx-4">
            <motion.button
              type="submit"
              className="btn rounded sm:w-fit bg-primaryColor text-white text-[18px] mt-7
              hover:border-none hover:text-black transition duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Confirm
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TutorTime;
