import React, { useEffect, useState } from "react";
import Dashboard from "../components/patient/Dashboard";
import Header from "../components/Header/HeaderCopy";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { BACKENDURL } from "../App";

function Patient(props) {
  const { setHealthID } = props;
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");

  const [patient, setPatient] = useState({
    HealthID: "",
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
    HealthInformation: {
      bloodGroup: "",
      weight: "",
      height: "",
      // diseases: diseaseList,
      diseases: [{ diseaseName: "", diseaseyrs: "" }],
    },
    EmergencyContactDetails: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
    },
    setPassword: {
      password: "",
      confirmPassword: "",
    },
  });
  const [prescriptions, setPrescriptions] = useState([{}]);
  
  useEffect(() => {
    async function getpatient() {
      // const res = await fetch(`${BACKENDURL}/getpatient`);
      const res = await fetch(`https://phrms-api.vercel.app/getpatient`);
      const data = await res.json();
      // console.log(data);
      if (data.AuthError || data.patient === null) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/Login");
      } else {
        // console.log(data)
        setPatient(data.patient);
        setHealthID(data.patient.healthID)
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions.reverse());
        }
      }
    }
    getpatient();
  }, [dob]);
  return (
    <div>
      {/* {patient.BasicInformation.name.firstName}
      {patient.HealthInformation.diseases[0].diseaseName} */}
      <SideBar {...props} loginData={patient} prescriptions={prescriptions} />
    </div>
  );
}

export default Patient;
