import React from "react";

// CSS
import "../../Assets/styles/Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__wrapper">
          <div className="newsletter__form">
            <input type="email" placeholder="Email" />
            <button className="secondary__btn subscribe__btn bg-primary">
              Subscribe Now
            </button>
          </div>

          <div className="newsletter__content">
            <h6 className="subtitle">Need regular updates</h6>
            <h2>
              Explore the <span className="highlight">hidden </span>
              ideas and subscribe!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;