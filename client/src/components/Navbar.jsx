import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { navLinks } from "../constants";
import useAuth from "../hooks/useAuth";
import PersistLogin from "../features/auth/PersistLogin";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAdmin } = useAuth();
  const { token } = PersistLogin();

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

  return (
    <header
      className={`z-[999] fixed top-0 xs:px-10 sm:px-10 md:px-16 w-full px-10  py-5 transition-all duration-150 ease-in ${
        scrolled ? "bg-[#25003e] shadow-card" : "bg-[#25003e]"
      }`}
    >
      <nav className={`flex items-center justify-between ]`}>
        <div className="mx-">
          {/* Logo */}
          <div className=" text-white text-3xl select-none">
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
          <li>
            <Link to="/">
              <p className="text-white">Blog</p>
            </Link>
          </li>

          {isAdmin && (
            <li>
              <Link to="/add-new-post">
                <p className="text-white">Add New Post</p>
              </Link>
            </li>
          )}

          <li>
            <Link to="/about">
              <p className="text-white">About</p>
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <p className="text-white">Contact</p>
            </Link>
          </li>

          {!token && (
            <li>
              <Link to="/login">
                <p className="text-white">Login</p>
              </Link>
            </li>
          )}

          {token && (
            <li onClick={logoutHandler}>
              <Link to="">
                <p className="text-white">Logout</p>
              </Link>
            </li>
          )}
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
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-red-400 transition-all duration-150 ease-in ${
                    active === nav.title ? "text-red-400" : "text-white"
                  } ${nav.forAdmin && !isAdmin ? "hidden" : ""}`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={nav.id}>
                    <p className="text-base">{nav.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
