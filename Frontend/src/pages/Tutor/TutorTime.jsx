import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../context/authController";
import Datepicker from "../../components/time/Datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { users } from "../../assets/data/mockuser";

const TutorTime = () => {
  const [tutorBook, setTutorBook] = useState({
    student_name: "",
    subject: "",
    detail: "",
    startTime: "",
    endTime: "",
    hours: 0,
  });

  const calculateHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date(1970, 0, 1, startHour, startMinute);
    const end = new Date(1970, 0, 1, endHour, endMinute);

    const diff = (end - start) / (1000 * 60 * 60);
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

  const handleStartDateChange = (date) => {
    const formattedDate = date
      ? `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
      : "";
    setTutorBook({ ...tutorBook, startTime: formattedDate });
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date
      ? `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
      : "";
    setTutorBook({ ...tutorBook, endTime: formattedDate });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
            <label htmlFor="startTime" className="form__label px-4">
              เวลาเริ่มต้น
            </label>
            <Datepicker
              className="form__input mt-1 w-full"
              onDateChange={handleStartDateChange}
            />
          </div>

          <div className="items-center mx-4">
            <label htmlFor="endTime" className="form__label px-4">
              เวลาสิ้นสุด
            </label>
            <Datepicker
              className="form__input mt-1 w-full"
              onDateChange={handleEndDateChange}
            />
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
