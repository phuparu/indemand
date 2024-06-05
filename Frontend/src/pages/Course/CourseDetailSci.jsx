import React, { useState } from "react";
import sci01 from "../../images/sci01.jpg";
import SidePanel1 from "./SidePanel1";
const CourseDetail01 = () => {
  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="max-md:flex-col flex items-center gap-5">
              <figure className="max-w-[300px] max-h-[300px]">
                <img src={sci01} alt="" />
              </figure>

              <div>
                <span
                  className="bg-[#000000] text-beigeColor py-1 px-6
                  lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  SCIENCE
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  PRIVATE SCIENCE
                </h3>
                <p
                  className="text__para text-[14px] leading-6 md:text-[15px]
                  lg:max-w-[390px]"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                  illo quod? Repellendus odio quae consequatur culpa, non
                  excepturi maiores quaerat quo nulla eaque cumque dolores
                  tempora beatae molestias. Repellendus, assumenda!
                </p>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={
                  '${tab == "about" && py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold'
                }
              >
                About
              </button>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
            vitae eligendi recusandae, dolorum impedit similique maxime at enim
            perspiciatis provident minima nesciunt ratione, quod voluptates
            debitis unde fugit ipsa id.
          </div>
          <div>
            <SidePanel1 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail01;
