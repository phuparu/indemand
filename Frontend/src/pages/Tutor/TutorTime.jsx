import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../context/authController";
import Datepicker from "../../components/time/Datepicker";
import Timepicker from "../../components/time/Timepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const calculateHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDate = new Date(1970, 0, 1, startHour, startMinute);
    const endDate = new Date(1970, 0, 1, endHour, endMinute);

    const diff = (endDate - startDate) / (1000 * 60 * 60);
    return diff >= 0 ? diff : 0;
  };

  useEffect(() => {
    if (tutorBook.startTime && tutorBook.endTime) {
      const hours = calculateHours(tutorBook.startTime, tutorBook.endTime);
      setTutorBook((prevState) => ({ ...prevState, hours }));
    }
  }, [tutorBook.startTime, tutorBook.endTime]);

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
    if (!tutorBook.startTime || !tutorBook.endTime) {
      toast.error("Please provide both start and end times.");
      return;
    }
    console.log(tutorBook);
    toast.success("Submission successful");
  };

  const { user } = useContext(authContext);

  return (
    <section>
      <div className="heading text-center py-[15px] px-[15px]">
        <h1>Time Attendance</h1>
      </div>
      <div className="text-headingColor text-[32px] py-[15px] px-[15px] text-center">
        <h2>Hello! {user?.fullname}</h2>
      </div>
      <div className="container w-full px-4 mx-auto max-w-screen-md">
        <form onSubmit={submitHandler} className="space-y-8">
          <div className="items-center mx-4">
            <label htmlFor="student_name" className="form__label px-4">
              ชื่อเด็กนักเรียนที่สอน
            </label>
            <input
              type="text"
              name="student_name"
              value={tutorBook.student_name}
              onChange={handleInputChange}
              placeholder="ชื่อเล่นของน้องที่สอน"
              className="form__input mt-1"
              required
            />
          </div>

          <div className="items-center mx-4">
            <label htmlFor="subject" className="form__label px-4">
              วิชาที่สอน
            </label>
            <select
              name="subject"
              value={tutorBook.subject}
              onChange={handleInputChange}
              className="mt-1 form__input"
              required
            >
              <option value="">เลือกวิชาที่สอน</option>
              <option value="sci">วิทยาศาสตร์</option>
              <option value="math">คณิตศาสตร์</option>
              <option value="eng">อังกฤษ</option>
            </select>
          </div>
          <div className="items-center mx-4">
            <label htmlFor="status" className="form__label px-4">
              Status
            </label>
            <select
              name="status"
              value={tutorBook.status}
              onChange={handleStatusChange}
              className="mt-1 form__input"
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div className="items-center mx-4">
            <label htmlFor="detail" className="form__label px-4">
              รายละเอียดที่สอน
            </label>
            <input
              type="text"
              name="detail"
              value={tutorBook.detail}
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
            {tutorBook.date && (
              <p>Date: {new Date(tutorBook.date).toLocaleDateString()}</p>
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
            {tutorBook.startTime && <p>Start Time: {tutorBook.startTime}</p>}
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
            {tutorBook.endTime && <p>End Time: {tutorBook.endTime}</p>}
          </div>

          <div className="mt-7 mx-4">
            <button
              type="submit"
              className="btn rounded sm:w-fit bg-primaryColor text-white text-[18px] mt-7
              hover:border-none hover:text-black transition duration-300 ease-in-out"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TutorTime;
