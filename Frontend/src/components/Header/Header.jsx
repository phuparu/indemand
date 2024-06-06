import React, { useContext, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { authContext } from "../../context/authController";
import user2 from "../../images/user2.jpg";
import { BiMenu } from "react-icons/bi";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/course",
    display: "Course",
  },
  {
    path: "/contact",
    display: "Contact",
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

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="text-[30px]">I N D E M A N D</div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[4rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={
                      link.path === "/course" && role === "student"
                        ? "/booking"
                        : link.path
                    }
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[20px] leading-7 font-[600]"
                        : "text-textColor text-[20px] leading-7 font-[500] hover:text-primaryColor transition duration-300 ease-in-out"
                    }
                  >
                    {link.path === "/course" && role === "student"
                      ? "Booking"
                      : link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full">
                  <img src={user2} className="w-full rounded-full" alt="" />
                </figure>
              </Link>
            </div>
            <h1>{user?.fullname}</h1>
            {user ? (
              <button
                className="bg-primaryColor py-2 px-6 text-white text-[20px] font-[600]
                    h-[44px] flex items-center justify-center rounded-[50px] group hover:bg-[#FFDB5C] hover:border-none hover:text-black
                    transition duration-300 ease-in-out"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="bg-primaryColor py-2 px-6 text-white text-[20px] font-[600]
                      h-[44px] flex items-center justify-center rounded-[50px] group hover:bg-[#FFDB5C] hover:border-none hover:text-black
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
