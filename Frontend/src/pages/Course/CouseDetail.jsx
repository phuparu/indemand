import React from "react";
import { useParams } from "react-router-dom";
import CourseDetail01 from "./CourseDetailSci";
import CourseDetail02 from "./CourseDetailMath";
import CourseDetail03 from "./CourseDetailEng";

const CourseDetail = () => {
  const { id } = useParams();

  // Render different components based on the course ID
  switch (id) {
    case "01":
      return <CourseDetail01 />;
    case "02":
      return <CourseDetail02 />;
    case "03":
      return <CourseDetail03 />;
    default:
      return <div>Course not found</div>;
  }
};

export default CourseDetail;
