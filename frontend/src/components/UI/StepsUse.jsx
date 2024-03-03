import React from "react";

// Icons
import {
  RiLoginBoxLine,
  RiFolderLockLine,
  RiArrowRightSLine,
  RiCustomerService2Line,
  RiFilterLine,
  RiFolderHistoryLine,
} from "react-icons/ri";

// CSS
import "../../Assets/styles/StepsUse.css";

const upperBoxSteps = [
  {
    icon: <RiFolderLockLine />,
    display: "Control access to your record easly",
  },
  {
    icon: <RiLoginBoxLine />,
    display: "Manage information in your record",
  },
];

const lowerBoxSteps = [
  {
    icon: <RiFilterLine />,
    display: "Filter your records any time",
  },
  {
    icon: <RiFolderHistoryLine />,
    display: "Start using your record",
  },
];

const StepsUse = (props) => {
  {console.log(props.theme)}
  return (
    <section id="help">
      <div className="container">
        <div className="steps__wrapper">
          <div className="steps__top-content">
            <h6 className="subtitle">How to use My Health Record</h6>
            <h2>Start using My Health Record today</h2>
          </div>

          <div className="steps__boxes">
            <div className="steps__boxes-upper">
              <div
                className={
                  props.theme === "light-theme"
                    ? "steps__boxes-upper-1 light-theme"
                    : "steps__boxes-upper-1"
                }
              >
                <span className="steps__boxes-upper-1-icon">
                  <i><RiLoginBoxLine /></i>
                </span>
                <h3
                  className={
                    props.theme === "light-theme"
                      ? "steps__boxes-upper-1-text-light-theme-text"
                      : "steps__boxes-upper-1-text"
                  }
                >
                  Log in to your My Health Record
                </h3>
                <span className="steps__boxes-upper-1-icon-arrow">
                  <i><RiArrowRightSLine /></i>
                </span>
              </div>

              <div className="twoboxes-upper">
                {upperBoxSteps.map((element, index) => (
                  <div
                    className={
                      props.theme === "light-theme"
                        ? "steps__boxes-upper-2 light-theme"
                        : "steps__boxes-upper-2"
                    }
                    key={index}
                  >
                    <span className="steps__boxes-upper-2-icon">
                      <i>{element.icon}</i>
                    </span>
                    <h3
                      className={
                        props.theme === "light-theme"
                          ? "steps__boxes-upper-2-text-light-theme-text"
                          : "steps__boxes-upper-2-text"
                      }
                    >
                      {element.display}
                    </h3>
                    <span className="steps__boxes-upper-2-icon-arrow">
                      <i><RiArrowRightSLine /></i>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="steps__boxes-lower">
              <div className="twoboxes-lower">
                {lowerBoxSteps.map((element, index) => (
                  <div
                    className={
                      props.theme === "light-theme"
                        ? "steps__boxes-lower-1 light-theme"
                        : "steps__boxes-lower-1"
                    }
                    key={index}
                  >
                    <span className="steps__boxes-lower-1-icon">
                      <i>{element.icon}</i>
                    </span>
                    <h3
                      className={
                        props.theme === "light-theme"
                          ? "steps__boxed-lower-1-text-light-theme-text"
                          : "steps__boxed-lower-1-text"
                      }
                    >
                      {element.display}
                    </h3>
                    <span className="steps__boxes-lower-2-icon-arrow">
                      <i><RiArrowRightSLine /></i>
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={
                  props.theme === "light-theme"
                    ? "steps__boxes-lower-2 light-theme"
                    : "steps__boxes-lower-2"
                }
              >
                <h3 className="steps__boxed-lower-2-text">Need help?</h3>
                <p className="description">Contact our Help line 24/7</p>
                <span className="steps__boxes-lower-2-icon">
                  <RiCustomerService2Line color="var(--primary-color)" />
                  <p className="description">+91 9876543210</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsUse;
