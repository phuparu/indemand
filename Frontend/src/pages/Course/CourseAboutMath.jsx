import React from "react";

const CourseAbout2 = () => {
  return (
    <div>
      <div>
        <h3
          className="text-[20px] leading-[30px] text-headingColor font-semibold
        flex items-center gap-2"
        >
          เกี่ยวกับคอร์สนี้
          <span className="text-brownColor font-bold text-[24px] leading-9">
            Mathematics
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
          perspiciatis assumenda omnis illum neque nostrum doloribus provident,
          quos accusamus at. Ex, dicta tempora ad accusantium quod eum in?
        </p>

        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            ใครเหมาะกับคอร์สนี้
          </h3>
          <p className="text-[16px] leading-6 font-medium text-textColor">
            นักเรียนที่สนใจ
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseAbout2;
