import React from "react";

import RegisterForm from "../../components/Auth/Register/Register";


function Register(props) {
  return (
    <div className="App">
      <RegisterForm {...props} />
    </div>
  );
}

export default Register;
