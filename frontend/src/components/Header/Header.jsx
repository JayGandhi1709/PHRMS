import React, { useEffect, useRef } from "react";
import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { RiMoonLine, RiSunLine, RiMenuLine } from "react-icons/ri";
// CSS
import "./Header.css";
import { BACKENDURL } from "../../App";

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

  const navigate = useNavigate();


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

  const logout = async () => {
    // console.log(logout)
    const res = await fetch(`${BACKENDURL}/logout`);
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/Login");
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
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          {/* Logo */}
          <div className="logo">
            <h2>Digital Health Record</h2>
          </div>

          {/* Navigation */}
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
            <div className={props.logedIn === false ? "nav__login" : "hidden"}>
              <Link to="/Login" className="nav__login-link">
                Log in
              </Link>
            </div>
            {/* {console.log(props.logedIn)} */}
            {/* {console.log(props.logedIn === false)} */}
            <div className={props.logedIn === false ? "nav__register" : "hidden" }>
              <Link to="/Register" className="nav__register-link">
                Register
              </Link>
            </div>
            {/* {console.log(props.logedIn !== false)} */}
            <div className={props.logedIn === false ? "hidden" : "nav__login"}>
              <Link to={props.logedIn} className="nav__login-link">
                Dashboard
              </Link>
            </div>
            <div className={props.logedIn === false ? "hidden" : "nav__register"}>
              <Link onClick={logout} className="nav__register-link">
                Logout
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
