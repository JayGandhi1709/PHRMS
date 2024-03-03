import React from "react";

// Icons
import { RiAppsLine } from "react-icons/ri";

// CSS
import "../../Assets/styles/Services.css";

const services = [
  {
    icon: <RiAppsLine color="var(--primary-color)" size="2rem" />,
    title: "Maintain Records",
    desc: "Lorem ipsum dolor sit amet. Unde  soluta exercitationem quaerat commodi harum perspiciatis? Numquam              ipsam laboriosam architecto, quasi dignissimos.",
  },
  {
    icon: <RiAppsLine color="var(--primary-color)" size="2rem" />,
    title: "Ease of access",
    desc: "Lorem ipsum dolor sit amet. Unde  soluta exercitationem quaerat commodi harum perspiciatis? Numquam              ipsam laboriosam architecto, quasi dignissimos.",
  },
  {
    icon: <RiAppsLine color="var(--primary-color)" size="2rem" />,
    title: "Connect to a doctor",
    desc: "Lorem ipsum dolor sit amet. Unde  soluta exercitationem quaerat commodi harum perspiciatis? Numquam              ipsam laboriosam architecto, quasi dignissimos.",
  },
  {
    icon: <RiAppsLine color="var(--primary-color)" size="2rem" />,
    title: "Check Your Health",
    desc: "Lorem ipsum dolor sit amet. Unde  soluta exercitationem quaerat commodi harum perspiciatis? Numquam              ipsam laboriosam architecto, quasi dignissimos.",
  },
];

const Services = () => {
  return (
    <section id="service">
      <div className="container">
        <div className="services__top-content">
          <h6 className="subtitle">Our Services</h6>
          <h2>Save time managing your prescription with</h2>
          <h2 className="highlight">our best services</h2>
        </div>

        <div className="service__item-wrapper">
          {services.map((element, index) => (
            <div className="services__item" key={index}>
              <span className="service__icon">
                {element.icon}
              </span>
              <h3 className="service__title">{element.title}</h3>
              <p className="description">{element.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
