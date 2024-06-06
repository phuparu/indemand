import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authController";
import { mockLoginResponse } from "../assets/data/mocklogin";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = mockLoginResponse;
      console.log(result, "login data");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data.user,
          token: result.data.token,
          role: result.data.role,
        },
      });

      toast.success(result.message);
      navigate("/home");
    } catch (err) {
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 👋
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
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
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3
              hover:border-none hover:text-black transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
