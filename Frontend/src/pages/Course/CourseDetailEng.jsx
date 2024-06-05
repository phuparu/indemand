import React, { useState } from "react";
import eng01 from "../../images/eng01.jpg";
import SidePanel1 from "./SidePanel1";
const CourseDetail03 = () => {
  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="max-md:flex-col flex items-center gap-5">
              <figure className="max-w-[300px] max-h-[300px]">
                <img src={eng01} alt="" />
              </figure>

              <div>
                <span
                  className="bg-[#000000] text-beigeColor py-1 px-6
                  lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  ENGLISH
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  PRIVATE ENG
                </h3>
                <p
                  className="text__para text-[14px] leading-6 md:text-[15px]
                  lg:max-w-[390px]"
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  et fugiat reiciendis quasi inventore, ratione vero accusantium
                  sint accusamus natus earum! Atque dignissimos sint dolorum id
                  maxime perspiciatis maiores necessitatibus!
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            temporibus accusantium fuga porro, earum eaque animi, ratione
            veritatis nisi a debitis est dolorem deleniti harum enim quo
            incidunt qui repudiandae.
          </div>
          <div>
            <SidePanel1 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail03;
