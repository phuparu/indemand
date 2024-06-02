import React from "react";
import signupgif from "../images/signup.gif";
import avatar from "../images/avatar1.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    gender: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    //not finished
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData);
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* IMG */}
          <div className="hidden lg:block rounded-l-lg ">
            <figure className="rounded-l-lg">
              <img src={signupgif} className="w-full rounded-l-lg" alt="" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
               placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
               placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
                focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
               placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
              focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
            placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    className="text-textColor font-semibold text-[15px] leading-7
                  px-4 py-3 focus:outline-none"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    id=""
                    className="text-textColor font-semibold text-[15px] leading-7
                  px-4 py-3 focus:outline-none"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <figure
                  className="w-[60px] h-[60px] rounded-full border-2 border-solid
                border-primaryColor flex items-center justify-center"
                >
                  <img src={avatar} alt="" className="w-full rounded-full" />
                </figure>
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full
                   flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
                   bg-beigeColor text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
