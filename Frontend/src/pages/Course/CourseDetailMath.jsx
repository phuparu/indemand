import React, { useState } from "react";
import math01 from "../../images/math01.jpeg";
import SidePanel1 from "./SidePanel1";
const CourseDetail02 = (course) => {
  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="max-md:flex-col flex items-center gap-5">
              <figure className="max-w-[300px] max-h-[300px]">
                <img src={math01} alt="" />
              </figure>

              <div>
                <span
                  className="bg-[#000000] text-beigeColor py-1 px-6
                  lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  MATHEMATICS
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  PRIVATE MATH
                </h3>
                <p
                  className="text__para text-[14px] leading-6 md:text-[15px]
                  lg:max-w-[390px]"
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Debitis temporibus accusantium perferendis aut recusandae,
                  ratione nihil ducimus officiis dolorem maxime esse delectus
                  fuga placeat tempora! Fugiat aspernatur sapiente iusto
                  doloribus!
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod
            omnis suscipit, id qui incidunt, nulla debitis minus doloremque
            alias facere? Consequuntur ad, odit in exercitationem ratione
            nesciunt pariatur commodi?
          </div>
          <div>
            <SidePanel1 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail02;
