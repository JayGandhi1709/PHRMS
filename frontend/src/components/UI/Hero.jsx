import React from "react";

// CSS
import "../../Assets/styles/Hero.css";

// IMAGES
// import heroDarkImg from "../../Assets/images/hero-img.png";
// import lightImg from "../../Assets/images/light-hero-bg.jpg";
import lightImg from "../../Assets/images/home/lightHome1.svg";
import heroDarkImg from "../../Assets/images/home/darkHome1.svg";
import { Link } from "react-router-dom";

const Hero = ({theme}) => {
  return (
    <>
      <section className="hero__section" id="home">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__content">
              <div className="hero__text">
                <h2>Maintain Your Health</h2>
                <h2>Records Digitally</h2>
                <h2 className="highlight">Less Paper Work</h2>
              </div>
              <p className="description">
                We are here to help you to maintain your health records digitally
                and to reduce your paper work. <br/>Register now and start maintaining
                your health records digitally. 
              </p>

              <div className="hero__btns">
                <Link to="/register"><button className="primary__btn">Register Now</button></Link>
                <Link to="/login"><button className="secondary__btn">Already an user</button></Link>
              </div>
            </div>
            
            <div className="hero__img">
              <img src={theme === "light-theme" ? lightImg : heroDarkImg} alt="hero-img" />
              {/* <img src={theme === "light-theme" ? lightImg : heroDarkImg} alt="hero-img" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
