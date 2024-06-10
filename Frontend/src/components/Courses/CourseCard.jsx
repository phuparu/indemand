import React from "react";
import img1 from "../../images/img1.jpg";
import { Link } from "react-router-dom";
import { BiSolidArrowToRight } from "react-icons/bi";

const CourseCard = ({ course, detailPage }) => {
  const { description, id, name, tutor_name } = course;

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={img1} className="w-full" alt={name} />
      </div>

      <h2 className="text-[20px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[500] tracking-wide">
        {id} {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">

        {/* <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-headingColor animate-bounce">
            Click for more info!!!
          </span>
          <Link
            to={detailPage ? `/coursedetail/${id}` : "/course"}
            className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
            <BiSolidArrowToRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default CourseCard;
