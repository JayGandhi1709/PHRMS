import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Home from "./pages/Home/Home";
import Patient from "./pages/Patient";
import Page404 from "./pages/Page_404";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/register";
import AdminLogin from "./components/Auth/Login/AdminLogin";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./components/Auth/Forgot/ForgotPassword";
import ResetPassword from "./components/Auth/Forgot/ResetPassword";
// Backend Link
export const BACKENDURL = process.env.REACT_APP_BACKEND_URL;
console.log("BACKENDURL",BACKENDURL);

function App() {
  // React-Messages Toast
  const [healthID, setHealthID] = useState("");
  const [prescriptionID, setPrescriptionID] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [toastCondition, settoastCondition] = useState({
    status: "",
    message: "",
  });

  const getTheme = () => {
    return localStorage.getItem("theme") === null
      ? "light-theme"
      : localStorage.getItem("theme");
  };
  
  const [theme, setTheme] = useState(getTheme);

  const toggleTheme = () => {
    theme === "light-theme" ? setTheme("") : setTheme("light-theme");
  };
  // console.log(theme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (toastShow) {
    if (toastCondition.status === "success") {
      toast.success(toastCondition.message);
    } else if (toastCondition.status === "error") {
      toast.error(toastCondition.message);
    } else if (toastCondition.status === "warning") {
      toast.warn(toastCondition.message);
    } else if (toastCondition.status === "info") {
      toast.info(toastCondition.message);
    }
    settoastCondition({
      status: "",
      message: "",
    });
    setToastShow(false);
  }

  // JSX
  return (
    <div>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                theme={theme}
                toggleTheme={toggleTheme}
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
              />
            }
          />
          <Route
            path="Login"
            element={
              <Login
                healthID={healthID}
                setHealthID={setHealthID}
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          {/* <Route path="LoginForm" element={<LoginForm />} /> */}
          <Route
            path="register"
            element={
              <Register
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/patient"
            element={
              <Patient
                healthID={healthID}
                setHealthID={setHealthID}
                prescriptionID={prescriptionID}
                setPrescriptionID={setPrescriptionID}
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/doctor"
            element={
              <Doctor
                healthID={healthID}
                setHealthID={setHealthID}
                prescriptionID={prescriptionID}
                setPrescriptionID={setPrescriptionID}
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                healthID={healthID}
                setHealthID={setHealthID}
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/login/admin"
            element={
              <AdminLogin
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/ForgotPassword"
            element={
              <ForgotPassword
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/ResetPassword/:userType/:id/:token"
            element={
              <ResetPassword
                settoastCondition={settoastCondition}
                setToastShow={setToastShow}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
      <ToastContainer />
    </div>
  );
}

export default App;
