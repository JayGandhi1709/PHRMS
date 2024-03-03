import React from "react";
import { RiHomeGearLine,RiShareBoxLine } from "react-icons/ri";

// CSS
import "./Footer.css";

const quickLinks = [
  {
    path: "/Login",
    display: "What is My Health Record?",
  },
  {
    path: "#about",
    display: "What's in a My Health Record?",
  },
  {
    path: "#help",
    display: "How to use My Health Record",
  },
  {
    path: "/Login",
    display: "Log in to your record for the first time",
  },
];

const sitemapLinks = [
  {
    path: "#home",
    icon: <RiHomeGearLine color="var(--primary-color)" />,
    display: "Home",
  },
  {
    path: "#about",
    icon: <RiShareBoxLine color="var(--primary-color)" />,
    display: "About",
  },
  {
    path: "#service",
    icon: <RiShareBoxLine color="var(--primary-color)" />,
    display: "Services",
  },
  {
    path: "#help",
    icon: <RiShareBoxLine color="var(--primary-color)" />,
    display: "Help",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <h2>Digital Health Record</h2>
            <p className="description">Step towards digital india</p>
            <p className="small__text description">
              A government initiative to provide health records digitally.
              <br />
              We are here to help you to maintain your health records digitally and to reduce your paper work.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__quick-links">
              <h3 className="quick__links-title">Sitemap</h3>
              <ul className="quick__links-sitemap">
                {sitemapLinks.map((element, index) => (
                  <div key={index}>
                    <li className="quick__link-item">
                      {element.icon}
                      {/* <i className={element.icon}></i> */}
                      <a href={element.path}>{element.display}</a>
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            <div className="footer__quick-links">
              <h3 className="quick__links-title">For You & Your Family</h3>
              <ul className="quick__links">
                {quickLinks.map((element, index) => (
                  <li className="quick__link-item" key={index}>
                    <a href={element.path}>{element.display}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer__quick-links">
            <h3 className="quick__links-title">Need help?</h3>
            <ul className="quick__links">
              <li className="quick__link-item">
                <p className="description">
                  Contact the Help line 24/7: <br />
                  1800 723 471
                </p>
              </li>
              <li className="quick__link-item">
                <a href="/">Contacts for healthcare professionals</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="copyright">
          Copyright {year}, developed by PHRS. All rigths reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
