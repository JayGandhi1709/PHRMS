import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// img
import patientProfile from "../../Assets/images/patient/patient_profile.png";
import doctorProfile from "../../Assets/images/doctor/doctor_profile.png";

import { RiMoonLine, RiSunLine, RiMenuLine } from "react-icons/ri";
// CSS
import "./Header.css";

const nav__links = [
  {
    path: "#home",
    display: "Home",
  },
  {
    path: "#service",
    display: "Services",
  },
  {
    path: "#about",
    display: "About",
  },
  // {
  //   path: "#projects",
  //   display: "Projects",
  // },
  {
    path: "#help",
    display: "Help",
  },
];

const Header = (props) => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);
  const location = useLocation(); // React Hook
  // console.log(location.pathname); // returns relative path, without domain name

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);

    return () => {
      window.removeEventListener("scroll", headerFunc);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    const targetAttr = e.target.getAttribute("href");

    const location = document.querySelector(targetAttr).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 80,
    });
  };

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          {/* Logo */}
          <div className="logo">
            <h2>Digital Health Record</h2>
          </div>
          {/* Navigation */}
          {location.pathname === "/" ? (
            <>
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu">
                  {nav__links.map((item, index) => (
                    <li className="menu__item" key={index}>
                      <a
                        href={item.path}
                        onClick={handleClick}
                        className="menu__link font-medium"
                      >
                        {item.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Toggle Mode */}
              <div className="light__mode">
                <div className="nav__login">
                  <Link to="/Login" className="nav__login-link">
                    Log in
                  </Link>
                </div>
                <div className="nav__register">
                  <Link to="/Register" className="nav__register-link">
                    Register
                  </Link>
                </div>
                <span onClick={props.toggleTheme}>
                  {props.theme === "light-theme" ? (
                    <span>
                      <RiMoonLine /> Dark
                    </span>
                  ) : (
                    <span>
                      <RiSunLine /> Light
                    </span>
                  )}
                </span>
              </div>
            </>
          ) : null}
          {location.pathname === "/patient" ? (
            <div className="flex">
              <div className="flex bg-primary gap-2 p-2 m-2 rounded-lg z-0 border-primary border-[1px] border-solid">
                <div className="flex items-center">
                  <img
                    src={patientProfile}
                    alt="patient profile"
                    className="h-10"
                  />
                </div>
                <div>
                  <h3 className="text-black">
                    {props.loginData.BasicInformation.name.firstName}{" "}
                    {props.loginData.BasicInformation.name.lastName}
                  </h3>
                  <div className="text-black font-light">Patient</div>
                </div>
              </div>
              <div className="light__mode">
                <span onClick={props.toggleTheme}>
                  {props.theme === "light-theme" ? (
                    <span>
                      <RiMoonLine /> Dark
                    </span>
                  ) : (
                    <span>
                      <RiSunLine /> Light
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : null}
          {location.pathname === "/doctor" ? (
            <div className="flex">
              <div className="flex bg-primary gap-2 p-2 m-2 rounded-lg z-0 border-primary border-[1px] border-solid">
                <div className="flex items-center">
                  <img
                    src={doctorProfile}
                    alt="patient profile"
                    className="h-10"
                  />
                </div>
                <div>
                  <h3 className="text-black">
                    Dr.{props.loginData.BasicInformation.name.firstName}{" "}
                    {props.loginData.BasicInformation.name.lastName}
                  </h3>
                  <div className="text-black font-light">Doctor</div>
                </div>
              </div>
              <div className="light__mode">
                <span onClick={props.toggleTheme}>
                  {props.theme === "light-theme" ? (
                    <span>
                      <RiMoonLine /> Dark
                    </span>
                  ) : (
                    <span>
                      <RiSunLine /> Light
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : null}
          {location.pathname === "/admin" ? (
            <div className="flex">
              <div className="flex bg-primary gap-2 p-2 m-2 rounded-lg z-0 border-primary border-[1px] border-solid">
                <div className="flex items-center">
                  <img
                    src={doctorProfile}
                    alt="patient profile"
                    className="h-10"
                  />
                </div>
                <div>
                  <h3 className="text-black">
                    {props.loginData.name.firstName}{" "}
                    {props.loginData.name.lastName}
                  </h3>
                  <div className="text-black font-light">Admin</div>
                </div>
              </div>
              <div className="light__mode">
                <span onClick={props.toggleTheme}>
                  {props.theme === "light-theme" ? (
                    <span>
                      <RiMoonLine /> Dark
                    </span>
                  ) : (
                    <span>
                      <RiSunLine /> Light
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : null}


          {/* Mobile View */}
          <span className="mobile__menu" onClick={toggleMenu}>
            <RiMenuLine />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
