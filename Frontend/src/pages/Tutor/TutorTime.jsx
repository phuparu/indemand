import React, { useContext, useState } from "react";
import { authContext } from "../../context/authController";
import Datepicker from "../../components/time/Datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TutorTime = () => {
  const [tutorBook, setTutorBook] = useState({
    student_name: "",
    subject: "",
    detail: "",
    time: "",
  });

  const handleInputChange = (e) => {
    setTutorBook({ ...tutorBook, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setTutorBook({ ...tutorBook, time: date });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(tutorBook);
    toast.success("successful");
  };

  const { user } = useContext(authContext);

  return (
    <section>
      <div className="heading text-center py-[15px] px-[15px]">
        <h1>Hello {user?.fullname}</h1>
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
            <label htmlFor="time" className="form__label px-4">
              เวลาที่สอน
            </label>
            <Datepicker
              className="form__input mt-1 w-full"
              onDateChange={handleDateChange}
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
