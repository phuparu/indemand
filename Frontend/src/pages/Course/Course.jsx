import React, { useState } from "react";
import CourseCard from "../../components/Courses/CourseCard";
import { course } from "../../assets/data/course";

const Course = () => {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState(course);

  function handleSearchCourse() {
    if (search === "") {
      setCourseList(course);
      return;
    }
    const filterBySearch = course.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setCourseList(filterBySearch);
  }

  return (
    <div>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Course</h2>
          <div
            className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] 
            rounded-md flex items-center justify-between"
          >
            <input
              type="search"
              className="py-2 pl-4 pr-2 bg-transparent w-full
              focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Course ex. Sci, Math, etc..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="group btn mt-0 rounded-[0px] rounded-r-md hover:bg-amber-600 
              transition duration-400 ease-in-out"
              onClick={handleSearchCourse}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 
            md:grid-cols-3 lg:grid-cols-3 gap-5"
          >
            {courseList.map((course) => (
              <CourseCard key={course.id} course={course} detailPage />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
