import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { navLinks } from "../constants";
import useAuth from "../hooks/useAuth";
import PersistLogin from "../features/auth/PersistLogin";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import { selectNavbarActiveLink, setNavbarLinkActive } from "./navbarSlice";

export default function Navbar() {
  const { isAdmin } = useAuth();
  const { token } = PersistLogin();

  const dispatch = useDispatch();
  const navbarActiveLink = useSelector(selectNavbarActiveLink);

  const [sendLogout] = useSendLogoutMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await sendLogout();

    navigate("/");
  };

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const webpageLogoClickHandler = () => {
    dispatch(setNavbarLinkActive(""))
    window.scrollTo(0, 0);
  }

  const navbarBlogPageLink = (
    <li onClick={() => dispatch(setNavbarLinkActive("Blog"))}>
      <Link to="/">
        <p
          className={`hover:text-[#ff0200] transition-all duration-300 ease-in ${
            navbarActiveLink === "Blog" ? "text-[#ff0200]" : "text-white"
          }`}
        >
          Blog
        </p>
      </Link>
    </li>
  );

  const navbarAddNewPostPageLink = (
    <li onClick={() => dispatch(setNavbarLinkActive("Add New Post"))}>
      <Link to="/add-new-post">
        <p
          className={`hover:text-[#ff0200] transition-all duration-300 ease-in ${
            navbarActiveLink === "Add New Post"
              ? "text-[#ff0200]"
              : "text-white"
          }`}
        >
          Add New Post
        </p>
      </Link>
    </li>
  );

  const navbarAboutPageLink = (
    <li onClick={() => dispatch(setNavbarLinkActive("About"))}>
      <Link to="/about">
        <p
          className={`hover:text-[#ff0200] transition-all duration-300 ease-in ${
            navbarActiveLink === "About" ? "text-[#ff0200]" : "text-white"
          }`}
        >
          About
        </p>
      </Link>
    </li>
  );

  const navbarContactPageLink = (
    <li onClick={() => dispatch(setNavbarLinkActive("Contact"))}>
      <Link to="/contact">
        <p
          className={`hover:text-[#ff0200] transition-all duration-300 ease-in ${
            navbarActiveLink === "Contact" ? "text-[#ff0200]" : "text-white"
          }`}
        >
          Contact
        </p>
      </Link>
    </li>
  );

  const navbarLoginPageLink = (
    <li onClick={() => dispatch(setNavbarLinkActive("Login"))}>
      <Link to="/login">
        <p
          className={`hover:text-[#ff0200] transition-all duration-300 ease-in ${
            navbarActiveLink === "Login" ? "text-[#ff0200]" : "text-white"
          }`}
        >
          Login
        </p>
      </Link>
    </li>
  );

  const navbarLogoutPageLink = (
    <li onClick={logoutHandler}>
      <Link to="">
        <p className="text-white hover:text-[#ff0200] transition-all duration-300 ease-in">
          Logout
        </p>
      </Link>
    </li>
  );

  return (
    <header
      className={`z-[999] fixed top-0 xs:px-10 sm:px-10 md:px-16 w-full px-10  py-5 transition-all duration-150 ease-in ${
        scrolled ? "bg-[#25003e] shadow-card" : "bg-[#25003e]"
      }`}
    >
      <nav className={`flex items-center justify-between ]`}>
        <div className="mx-">
          {/* Logo */}
          <div onClick={() => webpageLogoClickHandler()} className="cursor-pointer text-white text-3xl select-none">
            <p className="font-['Aclonica'] font-bold text-[#ff0200]">Konok</p>
          </div>
          {/* <Link
              to="/"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={logo2}
                alt="logo"
                className="xs:w-32 w-36 h-12 object-contain"
              />
            </Link> */}
        </div>

        <ul className="list-none hidden md:flex flex-row gap-5">
          {navbarBlogPageLink}

          {isAdmin && navbarAddNewPostPageLink}

          {navbarAboutPageLink}

          {navbarContactPageLink}

          {!token && navbarLoginPageLink}

          {token && navbarLogoutPageLink}
        </ul>

        {/* <ul className="list-none hidden md:flex flex-row gap-5">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-red-400" : "text-white"
              } ${
                nav.forAdmin && !isAdmin ? "hidden" : ""
              } hover:text-red-400 text-[18px] font-medium cursor-pointer transition-all duration-150 ease-in`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.id}>
                <p className={`text-base `}>{nav.title}</p>
              </Link>
            </li>
          ))}
        </ul> */}

        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } bg-[#25003e] p-6 black-gradient absolute top-[70px] right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl cursor-pointer`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navbarBlogPageLink}

              {isAdmin && navbarAddNewPostPageLink}

              {navbarAboutPageLink}

              {navbarContactPageLink}

              {!token && navbarLoginPageLink}

              {token && navbarLogoutPageLink}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
