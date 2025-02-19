import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

// CSS
import "../Login/Login.css";
import { styled } from "@mui/styles";

// Images
import DoctorImg from "../../../Assets/images/home/doctor.svg";
import PatientImg from "../../../Assets/images/home/patient.svg";
import LoginImg_light from "../../../Assets/images/Login/LoginImg_light.svg";
import LoginImg_dark from "../../../Assets/images/Login/LoginImg_dark.svg";
import { BACKENDURL } from "../../../App";

const CssTextField = styled(TextField)({
  "& label": {
    color: "var(--heading-color)",
  },
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--heading-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});

const ForgotPassword = (props) => {
  const [radio, setRadio] = useState("Patient");
  const [Loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // For Navigate
  const navigate = useNavigate();


  // Doctor Login Function
  const handleForgot = async (e,email) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);
    const path =
      radio === "Patient"
        ? `${BACKENDURL}/forgotPassword/patient`
        : `${BACKENDURL}/forgotPassword/doctor`;
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    // console.log(data);
    if (data.err) {
      setLoading(false);
      props.settoastCondition({
        status: "error",
        message: "Wrong Credentials!!!",
      });
      props.setToastShow(true);
    } else if (data.errors) {
      setUsernameError(data.errors);
      setLoading(false);
      props.settoastCondition({
        status: "error",
        message: data.errors,
      });
      props.setToastShow(true);
    } else {
      setLoading(false);
      props.settoastCondition({
        status: "success",
        message: "Password reset link has been sent to you email !!!",
      });
      props.setToastShow(true);
      navigate("/");
    }
  };

  // Conditional function for login of the user

  return (
    <section className="login__section p-0 stop_scrolling">
      <div className="login__container">
        <div className="login__wrapper">
          <div>
            {/* <img
              className="wave"
              src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
              alt="wave"
            /> */}
            <div className="login__container items-center">
              <div className="img">
                <img
                  src={
                    props.theme === "light-theme"
                      ? LoginImg_light
                      : LoginImg_dark
                  }
                  alt="loginImg"
                />
              </div>
              <div className="login-content w-[500px] flex justify-end">
                <div className="shadow-md w-max rounded-lg shadow-primary">
                  <form
                    onSubmit={handleForgot}
                    className="mx-10 mb-2 Loginform"
                  >
                    {/* <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" /> */}
                    <h3 className="title text-[10px]">Choose Account Type</h3>
                    <div className="flex flex-row justify-center space-x-6 mt-6 mb-14 w-full">
                      {/* Patient CardBoard */}
                      <div
                        id="typePatient"
                        className={`rounded border-primary py-2 relative transition-all hover:scale-[1.05] hover:shadow-xl ${
                          radio === "Patient" ? "border-4" : "border-[1px]"
                        }`}
                      >
                        <label className="lradio_container patient">
                          <div className="radio_inner ">
                            <div className="checkmark ">
                              <input
                                type="radio"
                                checked={radio === "Patient"}
                                className="appearance-none"
                                value="Patient"
                                onChange={(e) => {
                                  // console.log(e.target.value);
                                  setRadio(e.target.value);
                                }}
                                onClick={() => {
                                  setUsername("");
                                  setUsernameError("");
                                }}
                              />
                              <span>
                                {radio === "Patient" ? (
                                  <FaCheckCircle
                                    color="#42A5F5"
                                    className="bg-white shadow-md shadow-cyan-500/50 rounded-full text-[30px] absolute top-[90%] right-[-20px]"
                                  />
                                ) : (
                                  // <FaCheckCircle className="text-[40px] absolute right-[25%] translate-x-[50%] translate-y-[110px]" />
                                  ""
                                )}
                              </span>
                            </div>
                            <div className="patientAvatar">
                              <img
                                src={PatientImg}
                                width="200"
                                height="200"
                                alt="Patient"
                              ></img>
                            </div>
                            <div className="info font-medium text-heading">
                              Patient
                            </div>
                          </div>
                        </label>
                      </div>
                      {/* Doctor CardBoard */}
                      <div
                        id="typeDoctor"
                        className={`rounded border-primary relative py-2 transition-all hover:scale-[1.05] hover:shadow-xl ${
                          radio === "Doctor" ? "border-4" : "border-[1px]"
                        }`}
                      >
                        <label className="lradio_container doctor">
                          <input
                            type="radio"
                            className="appearance-none"
                            checked={radio === "Doctor"}
                            // name="accountType"
                            value="Doctor"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setRadio(e.target.value);
                            }}
                            onClick={() => {
                              setUsername("");
                              setUsernameError("");
                            }}
                          />
                          <span>
                            {radio === "Doctor" ? (
                              <FaCheckCircle
                                color="#42A5F5"
                                className="bg-white shadow-md shadow-cyan-500/50 rounded-full text-[30px] absolute top-[90%] right-[-20px]"
                              />
                            ) : (
                              ""
                            )}
                          </span>
                          <div className="radio_inner">
                            <div className="checkmark"></div>
                            <div className="doctorAvatar">
                              <img
                                src={DoctorImg}
                                width="200"
                                height="200"
                                alt="doctor"
                              ></img>
                            </div>
                            <div className="info font-medium text-heading">
                              Doctor
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="text-[0.9rem] font-normal text-neutral-400 mb-6">
                      Hello, {radio}!<br />
                      Please fill out the following information
                    </div>
                    <div className="input-div one">
                      <div className="div">
                        <CssTextField
                          label={radio === "Patient" ? "Health ID" : "Email"}
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="text-primary"
                          required
                          fullWidth
                          placeholder={
                            radio === "Patient"
                              ? "Aadhar Card Number"
                              : "Email ID"
                          }
                          InputProps={{
                            style: { color: "var(--heading-color)" },
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaUserAlt color="var(--primary-color)" />
                                {/* <FaLock /> */}
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(usernameError)}
                          helperText={usernameError}
                        />
                      </div>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        className="btn bg-primary mt-10 font-extrabold"
                      >
                        {Loading ? (
                          <div className="flex justify-center items-center py-3">
                            <ReactLoading
                              type={"bubbles"}
                              color={"color"}
                              height={"10%"}
                              width={"10%"}
                            />
                          </div>
                        ) : (
                          "Forgot Password"
                        )}
                      </button>
                    </div>
                    <div className="text-heading">
                      Don't have an account?{" "}
                      <span>
                        <Link
                          className="inline-block text-primary font-medium text-[16px]"
                          to="/Register"
                        >
                          Register here
                        </Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
