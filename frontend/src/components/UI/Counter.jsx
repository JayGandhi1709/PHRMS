import React from "react";

// CSS
import "../../Assets/styles/Counter.css";

const counterData = [
  {
    number: "5K+",
    text: "Joined",
  },
  {
    number: "2.3K+",
    text: "Doctors",
  },
  {
    number: "2.7K+",
    text: "Patients",
  },
];

const Counter = (props) => {
  return (
    <section className="counter" id="projects">
      <div className="container">
        <div className="counter__wrapper">
          <div className="counter__content">
            <h6 className="!text-heading subtitle">Better connected care</h6>
            <h2>
              For <br/><span>You & Your Family</span>
            </h2>
          </div>
          <div className="counter__content-numbers">
            {counterData.map((element, index) => (
              <div className="counter__item" key={index}>
                <h3 className="counter__number">{element.number}</h3>
                <h4 className="counter__title">{element.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;