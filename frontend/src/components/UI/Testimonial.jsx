import React from "react";
import Slider from "react-slick";

// CSS
import "../../Assets/styles/Testimonial.css";

// IMAGES
import ava01 from "../../Assets/images/ava-1.jpg";
import ava02 from "../../Assets/images/ava-2.jpg";
import ava03 from "../../Assets/images/ava-3.jpg";

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
}; 

const Testimonial = () => {
  return (
    <section>
      <div className="container">
        <div className="slider__content-top">
          <h6 className="subtitle">Testimonials</h6>
          <h2>
            Trusted by more than <span className="highlight">5,000 Users</span>
          </h2>
        </div>

        <div className="slider__wrapper">
          <Slider {... settings} >
            <div className="slider__item">
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, vitae? Dolorem quasi explicabo quod corporis
                assumenda nihil ad est ea, laborum cupiditate inventore
                excepturi laboriosam dolor esse, at eius. Velit?
              </p>

              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava01} alt="" />
                </div>

                <div>
                  <h5 className="customer__name">Dr. Arvind Joshi</h5>
                  <p className="description">Ruchi Clinic (MBBS)</p>
                </div>
              </div>
            </div> 

            <div className="slider__item">
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, vitae? Dolorem quasi explicabo quod corporis
                assumenda nihil ad est ea, laborum cupiditate inventore
                excepturi laboriosam dolor esse, at eius. Velit?
              </p>

              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava02} alt="" />
                </div>

                <div>
                  <h5 className="customer__name">Dr. Arvind Joshi</h5>
                  <p className="description">Ruchi Clinic (MBBS)</p>
                </div>
              </div>
            </div> 

            <div className="slider__item">
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, vitae? Dolorem quasi explicabo quod corporis
                assumenda nihil ad est ea, laborum cupiditate inventore
                excepturi laboriosam dolor esse, at eius. Velit?
              </p>

              <div className="customer__details">
                <div className="customer__img">
                  <img src={ava03} alt="" />
                </div>

                <div>
                  <h5 className="customer__name">Dr. Arvind Joshi</h5>
                  <p className="description">Ruchi Clinic (MBBS)</p>
                </div>
              </div>
            </div> 
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;