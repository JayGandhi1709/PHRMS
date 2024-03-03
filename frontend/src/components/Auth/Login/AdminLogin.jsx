import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// CSS
import "./Login.css";
import { styled } from "@mui/styles";

// Images
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

const AdminLogin = (props) => {
  const [Loading, setLoading] = useState(false);
  // const Toggle = props.from;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState("false");

  // For Navigate
  const navigate = useNavigate();

  // Admin Login Function
  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();
    // console.log(email, password);
    const res = await fetch(`${BACKENDURL}/login/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await res.json();
    // console.log(data.errors);
    if (data.errors) {
      setUsernameError(data.errors.email);
      setPasswordError(data.errors.password);
      props.settoastCondition({
        status: "error",
        message: "Wrong Credentials!!!",
      });
      props.setToastShow(true);
      setLoading(false);
    } else {
      setLoading(false);
      props.settoastCondition({
        status: "success",
        message: "Logged in Successfully!!!",
      });
      props.setToastShow(true);
      navigate("/admin");
    }
  }

  return (
    <section className="login__section stop_scrolling p-0">
      <div className="login__container">
        <div className="login__wrapper">
          <div className="login__container items-center">
            {/* IMG */}
            <div className="img">
              <img
                src={
                  props.theme === "light-theme" ? LoginImg_light : LoginImg_dark
                }
                alt="loginImg"
              />
            </div>

            <div className="login-content w-[500px] flex">
              <div className="shadow-md w-max rounded-lg shadow-primary">
                <form onSubmit={handleLogin} className="mx-10 mb-2 Loginform">
                  {/* <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" /> */}
                  <h3 className="title text-[10px]">Welcome Back, Admin</h3>
                  <div className="text-[0.9rem] font-normal text-neutral-400 mb-6">
                    Hello, Admin!
                    <br />
                    Please fill out the following information
                  </div>
                  <div className="input-div one">
                    <div className="div">
                      <CssTextField
                        label={"Email"}
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-primary"
                        required
                        fullWidth
                        placeholder={"Email ID"}
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
                  <div className="input-div pass">
                    <div className="div">
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
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                      />
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="btn bg-primary font-extrabold"
                      onClick={() => {
                        setUsernameError();
                        setPasswordError();
                      }}
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
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
