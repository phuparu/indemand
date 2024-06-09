import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    subject: "",
    detail: "",
    hours: "",
    edulevel: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/courses", newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({
        name: "",
        subject: "",
        detail: "",
        hours: "",
        edulevel: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleRemoveCourse = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  return (
    <div className="container shadow-md border-[1px] bg-white rounded px-6 py-6 md:px-10 lg:px-16">
      <h2 className="text-3xl font-bold text-center my-8">Adding Courses</h2>
      <form onSubmit={handleAddCourse} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            className="mt-1 block form__input border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Subject:</label>
          <input
            type="text"
            value={newCourse.subject}
            onChange={(e) =>
              setNewCourse({ ...newCourse, subject: e.target.value })
            }
            className="mt-1 block form__input border-gray-300 rounded-md shadow-sm "
          />
        </div>
        <div>
          <label className="block text-gray-700">Detail:</label>
          <textarea
            value={newCourse.detail}
            onChange={(e) =>
              setNewCourse({ ...newCourse, detail: e.target.value })
            }
            className="mt-1 block form__input border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hours:</label>
          <input
            type="number"
            value={newCourse.hours}
            onChange={(e) =>
              setNewCourse({ ...newCourse, hours: e.target.value })
            }
            className="mt-1 block form__input border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">Education Level:</label>
          <input
            type="text"
            value={newCourse.edulevel}
            onChange={(e) =>
              setNewCourse({ ...newCourse, edulevel: e.target.value })
            }
            className="mt-1 block form__input border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="btn bg-primaryColor text-white px-4 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Add Course
          </motion.button>
        </div>
      </form>

      <h2 className="text-3xl font-bold text-center my-8">Existing Courses</h2>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex items-center justify-between py-4 px-6 bg-white border border-gray-300 rounded-md shadow-md"
          >
            <div>
              <h3 className="text-xl font-semibold">{course.name}</h3>
              <p className="text-gray-700">Subject: {course.subject}</p>
              <p className="text-gray-700">Detail: {course.detail}</p>
              <p className="text-gray-700">Hours: {course.hours}</p>
              <p className="text-gray-700">
                Education Level: {course.edulevel}
              </p>
            </div>
            <motion.button
              onClick={() => handleRemoveCourse(course.id)}
              className="btn bg-red-500 text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Remove
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourse;
