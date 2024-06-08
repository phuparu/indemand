import React from "react";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";

import Course from "../pages/Course/Course";
import CourseDetail from "../pages/Course/CouseDetail";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPass from "../pages/ForgotPass";

import TutorProfile from "../pages/Tutor/TutorProfile";
import TutorTime from "../pages/Tutor/TutorTime";

import UserProfile from "../pages/User/UserProfile";
import Booking from "../pages/User/Booking";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/coursedetail/:id" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tutor/time" element={<TutorTime />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/tutor/profile" element={<TutorProfile />} />
      <Route path="/user/booking" element={<Booking />} />
    </Routes>
  );
};

export default Router;
