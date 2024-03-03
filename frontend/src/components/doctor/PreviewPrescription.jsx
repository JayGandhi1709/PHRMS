import { Link, useNavigate } from "react-router-dom";
// import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
// import Footer from "../landingPage/Footer";
// import doctor_profile from "../../assets/img/dashboard/doctor2.png";
import { useEffect, useState } from "react";
import { Typography, Breadcrumbs } from "@mui/material";

const PreviewPrescription = (props) => {
  // printprescriptionstart

  // printprescriptionend
  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const navigate = useNavigate();
  const [prescription, setPrescription] = useState({
    doctor: "",
    doctormobile: "",
    hospital: {
      name: "",
      address: "",
      mobile: "",
    },
    healthID: "",
    patientName: "",
    chiefComplaints: [{ complaint: "", duration: "", finding: "" }],
    notes: "",
    diagnosis: "",
    procedureConducted: "",
    medicines: [
      {
        medicineName: "",
        type: "",
        dosage: {
          morning: { quantity: "", remark: "" },
          afternoon: { quantity: "", remark: "" },
          evening: { quantity: "", remark: "" },
        },
        duration: "",
        total: "",
      },
    ],
    investigations: [{ investigation: "" }],
    advices: [{ advice: "" }],
  });
  const [patient, setPatient] = useState({
    BasicInformation: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
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
  });
  useEffect(() => {
    async function fetchprescription() {
      // console.log(
      //   `/viewprescription/${props.healthID}/${props.prescriptionID}`
      // );
      const res = await fetch(
        // `/viewprescription/${props.healthID}/${props.prescriptionID}`
        `/viewprescription/${props.prescriptionID}`
      );
      const data = await res.json();
      // console.log(data);
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else if (data.error) {
        props.settoastCondition({
          status: "error",
          message: "Something went Wrong!!!",
        });
        props.setToastShow(true);
        navigate("/doctor");
      } else {
        // console.log(data)
        setPrescription(data.prescription);
        fetchpatient(data.prescription.healthID);
      }
    }
    async function fetchpatient(hID) {
      const res = await fetch(`/searchpatient/${hID}`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPatient(data.patient);
      }
    }
    fetchprescription();
  }, []);

  return (
    <>
      <div className="my-20 bg-body_bg">
        {/* BreadCrumbs Section Starts */}
        <section className="header__breadcrumbs flex justify-center">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ color: "var(--heading-color)" }}
          >
            <h3
              onClick={() => {
                props.setMenuItem("Dashboard");
              }}
              className="text-[var(--heading-color)] text-[1.5rem] hover:underline hover:cursor-pointer"
            >
              Dashboard
            </h3>
            {/* <Typography color="text.primary"> */}
            <h3 className="font-bold text-[var(--heading-color)] text-[1.5rem]">
              Prescription
            </h3>
            {/* </Typography> */}
          </Breadcrumbs>
        </section>
        {/* BreadCrumbs Section Ends */}

        {/* Main Content Starts */}
        <div
          className="m-10 border-gray-500 border-2 p-8 shadow-black"
          id="prescription"
        >
          <div className="lg:mx-6 ">
            {/* First Sections Starts */}
            <div className="grid grid-cols-2 border-b-2 border-heading">
              <div className="m-2">
                <div className="flex">
                  <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                    Dr.
                  </h1>
                  <h1 className="text-xl flex font-medium mb-3 ">
                    {prescription.doctor}
                  </h1>
                </div>

                {/* <div className="flex">
                <h4>MBBS</h4>
                <h3 className="ml-2">M.D</h3>
                </div> */}

                <div className="flex">
                  <h2 className="ml-2 text-xl flex font-medium mb-3">
                    Mobile No.
                  </h2>
                  <h2 className="ml-2 text-lg flex font-normal mb-3">
                    +91 {prescription.doctormobile}
                  </h2>
                </div>
              </div>

              <div className="m-2">
                {/* Hospital Name */}
                <div className="">
                  <h1 className="text-xl flex font-medium mb-3 justify-end ">
                    {prescription.hospital.name}
                  </h1>
                </div>

                {/* Hospital Address */}
                <div className="flex justify-end ">
                  <h2 className="text-sm flex font-normal mb-3 text-right">
                    {prescription.hospital.address}
                  </h2>
                  {/* <h2 className="ml-2">425155</h2> */}
                </div>

                {/* Hospital Phone number */}
                <div className="flex justify-end">
                  <h2 className="text-xl flex font-medium mb-3">Phone no.</h2>
                  <h2 className="ml-2 text-lg flex font-normal mb-3">
                    +91 {prescription.hospital.mobile}
                  </h2>
                </div>
              </div>
            </div>
            {/* First Sections Ends */}

            {/* Second Section Starts */}
            <div className="grid grid-cols-3 mt-4">
              <div className="col-span-2">
                <div className="flex">
                  <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                    Health ID :
                  </h1>
                  <h4 className="ml-11 text-lg flex font-normal mb-3 text-[var(--heading-color)]">
                    {prescription.healthID}
                  </h4>
                </div>
                <div className="flex">
                  <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                    Patient Name :
                  </h1>
                  <div className="flex">
                    <h2 className="pl-1 text-lg flex font-normal mb-3">
                      {patient.BasicInformation.name.firstName}
                    </h2>
                    <h2 className="pl-1 text-lg flex font-normal mb-3">
                      {patient.BasicInformation.name.middleName}
                    </h2>
                    <h2 className="pl-1 text-lg flex font-normal mb-3">
                      {patient.BasicInformation.name.lastName}
                    </h2>
                  </div>
                </div>
                <div className="flex">
                  <h1 className="ml-2 text-xl flex-row font-medium mb-3 mr-1 w-[15%]">
                    Address :
                  </h1>
                  <h4 className="ml-14 text-lg flex font-normal mb-3 text-[var(--heading-color)]">{`${patient.AddressInformation.address1},${patient.AddressInformation.address2},  ${patient.AddressInformation.city},  ${patient.AddressInformation.taluka},  ${patient.AddressInformation.district},  ${patient.AddressInformation.state},  ${patient.AddressInformation.pinCode}`}</h4>
                </div>
              </div>
              <div>
                <div className="flex justify-end">
                  <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                    Date :
                  </h1>
                  <h4 className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]">
                    {convertDatetoString(prescription.createdAt)}
                  </h4>
                </div>
              </div>
            </div>
            {/* Second Section Ends */}

            {/* <div className="flex">
              <h1 className="font-bold">Referred by :</h1>
              <h4 className="ml-2">Dr.</h4>
              <h4>narayan rane</h4>
            </div> */}

            {/* Chief Complaints Starts */}
            <div className="grid grid-rows-2 mt-4">
              <div className="grid grid-cols-2 justify-center border-t-2 border-b-2 border-heading">
                <h1 className="ml-2 text-xl flex font-medium mb-3 mt-3 justify-center">
                  Chief complaints
                </h1>
                <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2 mt-3 justify-center">
                  Clinincal findings
                </h1>
              </div>

              {prescription.chiefComplaints.map((complaint, index) => {
                return (
                  <div
                    className="grid grid-cols-2 justify-center border-b-2 border-gray-400"
                    key={index}
                  >
                    <h1 className="ml-2 text-lg flex font-normal mb-3 mt-3 justify-center">{`${complaint.complaint} (${complaint.duration})`}</h1>
                    <h1 className="ml-2 text-lg flex font-normal mb-3 mt-3 justify-center">
                      {complaint.finding}
                    </h1>
                  </div>
                );
              })}
            </div>
            {/* Chief Complaints Ends */}

            {/* Notes Starts */}
            <div className="mt-5">
              <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">Notes</h1>
              <h4 className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]">
                {prescription.notes}
              </h4>
            </div>
            {/* Notes Ends */}

            {/* Diagonis Starts */}
            <div className="mt-5">
              <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                Diagnosis
              </h1>
              <h4 className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]">
                {prescription.diagnosis}
              </h4>
            </div>
            {/* Diagonis Ends */}

            {/* Procedure Conducted Starts */}
            <div className="mt-5">
              <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                Procedure Conducted
              </h1>
              <h4 className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]">
                {prescription.procedureConducted}
              </h4>
            </div>
            {/* Procedure Conducted Ends */}

            {/* Medicine table Starts */}
            <div className="mt-6">
              <div className="grid grid-cols-3 border-b-2 border-t-2 border-heading">
                <h1 className="ml-2 text-2xl flex font-medium mr-2 my-3">
                  Medicine name
                </h1>
                <h1 className="ml-2 text-2xl flex font-medium  mr-2 my-3">
                  Dosages
                </h1>
                <h1 className="ml-2 text-2xl flex font-medium my-3 mr-2 ">
                  Duration
                </h1>
              </div>
              {prescription.medicines.map((medicine, index) => {
                return (
                  <div
                    className="grid grid-cols-3 border-b-2 border-gray-400 mt-2"
                    key={index}
                  >
                    <div>
                      <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                        {medicine.medicineName}
                      </h1>
                    </div>
                    <div>
                      <div className="flex">
                        <h2 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                          Morning :
                        </h2>
                        <h2 className="ml-6 text-lg flex font-normal mb-3">{medicine.dosage.morning.quantity > 0 ? `${medicine.dosage.morning.quantity} (${medicine.dosage.morning.remark})` : `0`}</h2>
                      </div>
                      <div className="flex">
                        <h2 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                          Afternoon :
                        </h2>
                        <h2 className="ml-2 text-lg flex font-normal mb-3">{medicine.dosage.afternoon.quantity > 0 ? `${medicine.dosage.afternoon.quantity} (${medicine.dosage.afternoon.remark})` : `0`}</h2>
                      </div>
                      <div className="flex">
                        <h2 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                          Night :
                        </h2>
                        <h2 className="ml-[3.2rem] text-lg flex font-normal mb-3">{medicine.dosage.evening.quantity > 0 ? `${medicine.dosage.evening.quantity} (${medicine.dosage.evening.remark})` : `0`}</h2>
                      </div>
                    </div>
                    <div>
                      <div className="flex">
                        <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                          days :
                        </h1>
                        <h2 className="ml-[3.2rem] text-lg flex font-normal mb-3">
                          {medicine.duration}
                        </h2>
                      </div>
                      <div className="flex">
                        <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                          Total Tab. :
                        </h1>
                        <h2 className="ml-2 text-lg flex font-normal mb-3">
                          {medicine.total}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
              
            </div>
            {/* Medicine table Ends */}

            {/* Insvestigations Starts */}
            <div className="mt-4">
              <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                Investigations
              </h1>
              <div>
                {prescription.investigations.map((investigation, index, {count = index+1}) => {
                  return (
                    <h3
                      className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]"
                      key={index}
                    >
                     {`${count}) ${investigation.investigation}`}
                    </h3>
                  );
                })}
              </div>
            </div>
            {/* Insvestigations Ends */}

            {/* Advices Starts */}
            <div className="mt-5">
              <h1 className="ml-2 text-xl flex font-medium mb-3 mr-2">
                Advices
              </h1>
              <div>
                {prescription.advices.map((advice, index, {count = index+1}) => {
                  return (
                    <h3
                      className="ml-2 text-lg flex font-normal mb-3 text-[var(--heading-color)]"
                      key={index}
                    >
                     {`${count}) ${advice.advice}`}
                    </h3>
                  );
                })}
              </div>
            </div>
            {/* Advices Ends */}
          </div>
          {/* <Footer /> */}
        </div>
        {/* Main Content Ends */}
      </div>
    </>
  );
};

export default PreviewPrescription;
