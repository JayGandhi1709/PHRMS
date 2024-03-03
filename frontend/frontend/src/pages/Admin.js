import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
// import DoctorList from "../components/admin/DoctorList";
// import PatientList from "../components/admin/PatientList";
import Header from "../components/Header/HeaderCopy";
import SideBar from "../components/SideBar/SideBar";
import { BACKENDURL } from "../App";

const Admin = (props) => {
  const [admin, setAdmin] = useState({
    email: "",
    BasicInformation: {
      name: {
        firstName: "",
        lastName: "",
      },
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmin() {
      const res = await fetch(`${BACKENDURL}/getadmin`);
      const data = await res.json();
      if (data.AuthError || data.admin === null) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/Login");
      }
      // console.log(data);
      setAdmin(data.admin);
    }
    fetchAdmin();
  }, []);

  return (
    <div>
      {/* <Header theme={props.theme} toggleTheme={props.toggleTheme} loginData={admin} /> */}
      {/* <Dashboard {...props} loginData={admin} /> */}
      <SideBar {...props} loginData={admin} />
      {/* <PatientList {...props} loginData={admin} />
      <DoctorList {...props} loginData={admin} /> */}
    </div>
  );
};

export default Admin;
