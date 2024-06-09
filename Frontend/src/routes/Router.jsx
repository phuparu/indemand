import React from "react";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";

import Course from "../pages/Course/Course";
import CourseDetail from "../pages/Course/CouseDetail";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";

import TutorProfile from "../pages/Tutor/TutorProfile";
import TutorTime from "../pages/Tutor/TutorTime";

import UserProfile from "../pages/User/UserProfile";
import Booking from "../pages/User/Booking";

import Admin from "../Admin/admin";
import AdminProfile from "../Admin/AdminProfile";
import AdminCourse from "../Admin/AdminCourse";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/coursedetail/:id" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tutor/time" element={<TutorTime />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/tutor/profile" element={<TutorProfile />} />
      <Route path="/user/booking" element={<Booking />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/course" element={<AdminCourse />} />
    </Routes>
  );
};

export default Router;
