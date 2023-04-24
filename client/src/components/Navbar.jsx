import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { navLinks } from "../constants";
import useAuth from "../hooks/useAuth";


export default function Navbar() {
  const { isAdmin } = useAuth();

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
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
      className={`shadow-card xs:px-6 sm:px-10 md:px-16 w-full px-12 py-3 transition-all duration-150 ease-in ${
        scrolled ? "bg-[#893101]" : "bg-[#893101]"
      }`}
    >
      <nav className={`flex items-center justify-between`}>
        <div>
          <Link
            to="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="xs:w-32 w-36 h-12 object-contain"
            />
          </Link>
        </div>

        <ul className="list-none hidden sm:flex flex-row gap-5">
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
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } bg-black p-6 black-gradient absolute top-[66px] right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl cursor-pointer`}
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
