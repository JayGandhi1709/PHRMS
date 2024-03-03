import React from "react";

// Icons
import { RiWifiLine, RiTeamLine, RiCustomerService2Line } from "react-icons/ri";

// CSS
import "../../Assets/styles/About.css";

// IMAGES
import aboutImg from "../../Assets/images/about-us.jpg";

const chooseData = [
  {
    icon: <RiWifiLine color="var(--primary-color)" size="2rem" />,
    title: "First working process",
    desc: "",
  },
  {
    icon: <RiTeamLine color="var(--primary-color)" size="2rem" />,
    title: "Dedicated team",
    desc: "We have a dedicated team of professionals who are committed to delivering high-quality services.",
  },
  {
    icon: <RiCustomerService2Line color="var(--primary-color)" size="2rem" />,
    title: "24/7 Hours support",
    desc: "We offer round-the-clock support to ensure that our services are available to you at any time, day or night.",
  },
];

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about__wrapper">
          <div className="about__content">
            <h6 className="subtitle">Who we are</h6>
            <h2>A group of students with some idea</h2>
            <h2 className="highlight">Making things ease</h2>

            <div className="choose__item-wrapper">
              {chooseData.map((element, index) => (
                <div className="choose__us-item" key={index}>
                  <span className="choose__us-icon">{element.icon}</span>
                  <div>
                    <h4 className="choose__us-title">{element.title}</h4>
                    <p className="description">{element.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about__img">
            <img src={aboutImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
