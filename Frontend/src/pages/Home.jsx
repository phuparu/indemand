import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import faq from "../images/faq.jpg";
import CourseList from "../components/Courses/CourseList";
import FaqList from "../components/Faq/FaqList";
import { authContext } from "../context/authController";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const handleBookNowClick = () => {
    if (login.user) {
      navigate("/course");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* -----Hero section------ */}
      <section className="hero__section pt-[0px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[70px] items-center justify-between">
            {/* ---- hero content ---- */}
            <div>
              <div className="lg:w-[570px]">
                <h1
                  className="text-[48px] leading-[46px] text-headingColor font-[600] md:text-[60]
                md:leading-[70px] tracking-widest"
                >
                  INDEMAND Private Tutoring
                </h1>
                <p className="text__para tracking-wider">
                  เว็บไซต์ที่ช่วยให้การจองเวลาเรียนเป็นเรื่องง่าย
                </p>

                <motion.button
                  onClick={handleBookNowClick}
                  className="btn text-[20px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  จองเวลาเลย
                </motion.button>
              </div>

              {/* ---- hero section -----*/}
              <div
                className="mt-[30px] lg:mt[70px] flex flex-col lg:flex-row lg:items-center gap-5
              lg:gap-[30px]"
              >
                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                  text-headingColor"
                  >
                    20 ปี+
                  </h2>
                  <span className="w-[120px] h-2 bg-brownColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">ประสบการณ์การสอน</p>
                </div>

                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                  text-headingColor"
                  >
                    10 คน
                  </h2>
                  <span className="w-[120px] h-2 bg-brownColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">ติวเตอร์ชั้นนำ</p>
                </div>

                <div>
                  <h2
                    className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]
                  text-headingColor"
                  >
                    1000+
                  </h2>
                  <span className="w-[120px] h-2 bg-brownColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">จำนวนนักเรียน</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[30px] justify-end "></div>
            <div>
              <img className="w-full" src={img4} alt="" />
            </div>
            <div className="mt-[30px]">
              <img src={img2} alt="" className="w-full mb-[30px]" />
              <img src={img3} alt="" className="w-full " />
            </div>
          </div>
        </div>
      </section>

      {/*----- Course section ----- */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Private Courses</h2>
            <p className="text__para text-center">Course for everyone</p>
          </div>

          <CourseList />
        </div>
      </section>

      {/* ----- FAQ Section ------ */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faq} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">คำถามที่พบบ่อย</h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
