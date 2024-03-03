import React, { useEffect, useState } from 'react'
// import Dashboard from "../components/doctor/Dashboard";
import { Link, useNavigate } from "react-router-dom";
// import { BACKENDURL } from "../App";
// import Header from '../components/Header/HeaderCopy';
import SideBar from "../components/SideBar/SideBar";
// import AddNewDiagnosis from "../components/doctor/AddNewDiagnosis";



function Doctor(props) {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({});
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [doctor, setDoctor] = useState({
    BasicInformation: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      aadhaarCard: "",
      email: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      dob: "",
    },
    AddressInformation: {
      address1: "",
      address2: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pinCode: "",
    },
    EducationInformation: {
      specializationList: [{ specialization: "" }],
      educationList: [{ eduName: "" }],
    },
    HospitalInformation: {
      hospitalName: "",
      hospitalContact: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pinCode: "",
      },
    },
    setPassword: {
      password: "",
      confirmPassword: "",
    },
  });

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getdoctor() {
      const res = await fetch(`/getdoctor`);
      const data = await res.json();
      // console.log(data);
      if (data.AuthError || data.doctor === null) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to Proceed!!!",
        });
        props.setToastShow(true);
        navigate("/Login");
      } else {
        setDoctor(data.doctor);
      }
    }
    // async function getpatient() {
    //   setLoading(true);
    //   if (props.healthID.length === 12) {
    //     const res = await fetch(`/searchpatient/${props.healthID}`);
    //     const data = await res.json();

    //     if (data.AuthError) {
    //       setLoading(false);
    //       props.settoastCondition({
    //         status: "info",
    //         message: "Please Login to proceed!!!",
    //       });
    //       props.setToastShow(true);
    //       navigate("/");
    //     } else if (data.error) {
    //       setLoading(false);
    //       props.settoastCondition({
    //         status: "error",
    //         message: "This HealthID doesn't exist!!!",
    //       });
    //       props.setToastShow(true);
    //     } else {
    //       setPatient(data.patient);
    //       if (data.patient.prescriptions) {
    //         setPrescriptions(data.patient.prescriptions.reverse());
    //       }
    //       setDob(convertDatetoString(patient.dob));
    //       setLoading(false);
    //     }
    //   } else if (props.healthID.length === 0) {
    //     setLoading(false);
    //     setPatient({});
    //   }
    //   setLoading(false);
    // }
    getdoctor();
    // getpatient();
  }, [dob]);

  
  return (
    <div className="App">
      {/* <Header theme={props.theme} toggleTheme={props.toggleTheme} loginData={doctor} />
      <Dashboard {...props} loginData={doctor} /> */}
      <SideBar {...props} loginData={doctor} />
      {/* <AddNewDiagnosis {...props} loginData={doctor} /> */}
    </div>

  );
}

export default Doctor;
