import React from 'react'
import Home from '../pages/Home'
import Course from '../pages/Course/Course'
import CourseDetail from '../pages/Course/CourseDetail'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'

import { Routes ,Route } from 'react-router-dom'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/course" element={<Course/>} />
      <Route path="/coursedetail" element={<CourseDetail/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
  )
}

export default Router
