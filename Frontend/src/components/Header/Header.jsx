import React, { useContext, useEffect, useRef } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authController";
import avatar from "../../images/avatar1.png";
import { BiMenu } from "react-icons/bi";

// Define the navigation links for different roles
const userNavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/user/booking",
    display: "Booking",
  },
];

const tutorNavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tutor/time",
    display: "Time attendance",
  },
];

const adminNavLinks = [
  {
    path: "/admin",
    display: "Admin",
  },
  {
    path: "/admin/course",
    display: "Add Course",
  },
];

const guestNavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/course",
    display: "Course",
  },
];

const Header = () => {
  const { user, role, dispatch } = useContext(authContext);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  // navigation links based on the user's role
  const navLinks =
    role === "admin"
      ? adminNavLinks
      : role === "tutor"
        ? tutorNavLinks
        : role === "student"
          ? userNavLinks
          : guestNavLinks;

  //the profile path based on the user's role
  const profilePath =
    role === "admin"
      ? "/admin/profile"
      : role === "tutor"
        ? "/tutor/profile"
        : "/user/profile";

  const navigate = useNavigate();

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div
            className="text-[30px] cursor-pointer"
            onClick={() => navigate("/home")}
          >
            I N D E M A N D
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[4rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[20px] leading-7 font-[600]"
                        : "text-textColor text-[20px] leading-7 font-[500] hover:text-primaryColor transition duration-300 ease-in-out"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link to={profilePath}>
                  <figure className="w-[35px] h-[35px] rounded-full">
                    <img
                      src={avatar}
                      className="w-full rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
                      alt=""
                    />
                  </figure>
                </Link>
                <h1>{user?.fullname}</h1>
                <Link to="/">
                  <button
                    className="bg-primaryColor py-2 px-6 text-white text-[20px] font-[600]
                      h-[44px] flex items-center justify-center rounded-[50px] group hover:bg-[#FFDB5C] hover:border-none hover:text-black
                      transition duration-300 ease-in-out"
                    onClick={() => (dispatch({ type: "LOGOUT" }))}
                  >
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button
                  className="bg-primaryColor py-2 px-6 text-white text-[20px] font-[600]
                      h-[44px] flex items-center justify-center rounded-[50px] group hover:bg-[#ffcf20] hover:border-none hover:text-black
                      transition duration-300 ease-in-out"
                >
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
