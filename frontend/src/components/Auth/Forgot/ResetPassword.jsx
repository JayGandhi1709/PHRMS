import React, { useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const ResetPassword = (props) => {
  const { userType, id, token } = useParams();
  const [radio, setRadio] = useState("Patient");
  const [loading, setLoading] = useState(false);
  // const Toggle = props.from;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState("false");
  const [showConfirmPassword, setShowConfirmPassword] = useState("false");

  // For Navigate
  const navigate = useNavigate();

  const validUser = async () => {
    // setLoading(true);
    const res = await fetch(`/resetPassword/${userType}/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (data.status === 200) {
      // console.log("valid user");
      setLoading(false);
    } else {
      setLoading(false);
      navigate("*");
    }
  };

  useEffect(() => {
    validUser();
  }, []);

  // Conditional function for reset of the user
  const handleReset = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password === confirmPassword) {
      setConfirmPasswordError("");
      const res = await fetch(`/resetPassword/${userType}/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      // console.log(data)

      if (data.errors) {
        props.settoastCondition({
          status: "error",
          message: data.errors,
        });
        props.setToastShow(true);
        setLoading(false);
      } else if (data.same) {
        props.settoastCondition({
          status: "error",
          message: data.same,
        });
        props.setToastShow(true);
        setPasswordError(data.same);
        setLoading(false);
      } else {
        props.settoastCondition({
          status: "success",
          message: "Password Successfully Chanaged!!!",
        });
        props.setToastShow(true);
        setLoading(false);
        navigate("/login");
      }
    } else {
      setLoading(false);
      setConfirmPasswordError("The passwords do not match");
    }
  };

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
                  <form onSubmit={handleReset} className="mx-10 mb-2 Loginform">
                    {/* <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" /> */}
                    <h3 className="title text-[10px] mb-6">
                      Enter Your New Password
                    </h3>

                    <div className="input-div pass ">
                      <div className={`div ${passwordError ? "mb-6" : ""}`}>
                        <CssTextField
                          type={showPassword === false ? "text" : "password"}
                          label="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="password"
                          fullWidth
                          InputProps={{
                            style: { color: "var(--heading-color)" },
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaLock color="var(--primary-color)" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                  onMouseDown={(event) => {
                                    event.preventDefault();
                                  }}
                                  edge="end"
                                >
                                  {showPassword === false ? (
                                    <MdVisibilityOff color="var(--heading-color)" />
                                  ) : (
                                    <MdVisibility color="var(--heading-color)" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onBlur={(e) => {
                            var rex =
                              /^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                            if (rex.test(e.target.value)) {
                              setPasswordError("");
                            } else {
                              setPasswordError(
                                "Password should include at least one uppercase, one numeric value and one special character"
                              );
                            }
                          }}
                          error={Boolean(passwordError)}
                          helperText={passwordError}
                        />
                      </div>
                    </div>
                    <div className="input-div pass">
                      <div className="div">
                        <CssTextField
                          type={
                            showConfirmPassword === false ? "text" : "password"
                          }
                          label="Confirm Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={(e) => {
                              e.target.value === password
                                ? setConfirmPasswordError("")
                                : setConfirmPasswordError(
                                    "The passwords do not match"
                                  );
                          }}
                          required
                          placeholder="Confirm Password"
                          fullWidth
                          InputProps={{
                            style: { color: "var(--heading-color)" },
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaLock color="var(--primary-color)" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  onMouseDown={(event) => {
                                    event.preventDefault();
                                  }}
                                  edge="end"
                                >
                                  {showConfirmPassword === false ? (
                                    <MdVisibilityOff color="var(--heading-color)" />
                                  ) : (
                                    <MdVisibility color="var(--heading-color)" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(confirmPasswordError)}
                          helperText={confirmPasswordError}
                        />
                      </div>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        className="btn bg-primary mt-10 font-extrabold"
                      >
                        {loading ? (
                          <div className="flex justify-center items-center py-3">
                            <ReactLoading
                              type={"bubbles"}
                              color={"color"}
                              height={"10%"}
                              width={"10%"}
                            />
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
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

export default ResetPassword;
