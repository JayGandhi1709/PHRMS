import React from "react";
import { useLocation } from "react-router-dom";

// import Navbar from "../../components/home/Navbar";
// import LoginForm from "../../components/login/Login";
import LoginForm from "../../components/Auth/Login/Login"
// import LoginForm from "../components/login/LoginForm";

export default function Login(props) {
  const location = useLocation();

  // JSX
  return (
    <>
      {/* NavBar */}
      {/* <Navbar></Navbar> */}

      <div className="h-screen max-h-min flex flex-col">
        {/* Main Login page */}
        {/* <LoginForm from={from} {...props} /> */}
        <LoginForm {...props} />

        <div className="mt-auto relative bottom-0">
          {/* <Footer></Footer> */}
        </div>
      </div>
    </>
  );
}