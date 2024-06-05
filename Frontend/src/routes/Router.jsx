import React from "react";
import Home from "../pages/Home";
import Course from "../pages/Course/Course";
import CourseDetail from "../pages/Course/CouseDetail";
import CourseDetail1 from "../pages/Course/CourseDetailSci";
import CourseDetail2 from "../pages/Course/CourseDetailMath";
import CourseDetail3 from "../pages/Course/CourseDetailEng";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";

import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/course" element={<Course />} />
      <Route path="/coursedetail/:id" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Router;
