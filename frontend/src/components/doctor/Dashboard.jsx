import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

import { RiSearchLine, RiAddLine, RiEyeFill } from "react-icons/ri";
import reports from "../../Assets/images/report2_pbl.png";

import { BACKENDURL } from "../../App";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const { loginData, healthID, setHealthID, menuItem, setMenuItem } = props;
  const [dob, setDob] = useState("01/01/2006");
  // const [healthID, setHealthID] = useState("");
  const [patient, setPatient] = useState({});
  const [Loading, setLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([{}]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      setLoading(true);
      if (healthID.length === 12) {
        const res = await fetch(`/searchpatient/${healthID}`);
        const data = await res.json();

        if (data.AuthError) {
          setLoading(false);
          setPatient({});
          props.settoastCondition({
            status: "info",
            message: "Please Login to proceed!!!",
          });
          props.setToastShow(true);
          navigate("/");
        } else if (data.error) {
          setLoading(false);
          setPatient({});
          props.settoastCondition({
            status: "error",
            message: "This HealthID doesn't exist!!!",
          });
          props.setToastShow(true);
        } else if (data.patient == null) {
          setLoading(false);
          setPatient({});
          props.settoastCondition({
            status: "error",
            message: "This HealthID doesn't exist!!!",
          });
          props.setToastShow(true);
        } else {
          setPatient(data.patient);
          if (data.prescriptions) {
            setPrescriptions(data.prescriptions.reverse());
          }
          setDob(convertDatetoString(data.patient.BasicInformation.dob));
          setLoading(false);
        }
      } else if (healthID.length == 0) {
        setLoading(false);
        // setPatient({});
      } else {
        setLoading(false);
      }
    }
    getpatient();
  }, [dob]);

  const searchPatient = async (e) => {
    e.preventDefault();
    if (healthID.length === 12) {
      setLoading(true);
      const notificationRes = await fetch(
        `/createSearchNotification/${healthID}`,
        { method: "POST" }
      );
      const res = await fetch(`/searchpatient/${healthID}`);
      const data = await res.json();

      if (data.AuthError) {
        setLoading(false);
        setPatient({});
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else if (data.error) {
        setLoading(false);
        setPatient({});
        props.settoastCondition({
          status: "error",
          message: "This HealthID doesn't exist!!!",
        });
        props.setToastShow(true);
      } else if (data.patient == null) {
        setLoading(false);
        setPatient({});
        props.settoastCondition({
          status: "error",
          message: "This HealthID doesn't exist!!!",
        });
        props.setToastShow(true);
      } else {
        setPatient(data.patient);
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions.reverse());
        }
        setDob(convertDatetoString(data.patient.BasicInformation.dob));
        setLoading(false);
      }
    } else {
      props.settoastCondition({
        status: "warning",
        message: "Please Enter 12 Digit HealthID !!!",
      });
      props.setToastShow(true);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="wrapper mt-12">
            <form
              onSubmit={searchPatient}
              style={{ backgroundImage: "var(--card-bg)" }}
              className="flex flex-row justify-between rounded shadow p-4 flex-wrap "
            >
              <div className="flex items-center">
                <h1 className="text-lg md:text-xl font-bold text-heading ">
                  Search Patient By Health ID :
                </h1>
              </div>
              <div className="flex">
                <input
                  placeholder="Health ID"
                  className="rounded-md border-2 text-xl pl-4 outline-none focus:outline-none"
                  type="number"
                  value={healthID}
                  onChange={(e) => {
                    setHealthID(e.target.value);
                  }}
                ></input>
              </div>
              <div className="flex">
                <button className="flex flex-row items-center rounded font-semibold shadow-sm hover:bg-bgsecondary">
                  <div className=" grid col-start-8 h-10 bg-primary rounded font-semibold shadow-sm hover:bg-bgsecondary ">
                    <div className="flex py-2 px-4 items-center">
                      <span>
                        <RiSearchLine className="mr-1" />
                      </span>
                      Search
                    </div>
                  </div>
                </button>
                <div className="grid col-start-9  h-10 ml-4  bg-primary  rounded font-semibold shadow-sm hover:bg-bgsecondary">
                  <div className="flex py-2 px-4 items-center ">
                    <div
                      className="ml-2 flex cursor-pointer rounded font-semibold shadow-sm hover:bg-bgsecondary "
                      onClick={() => {
                        setHealthID("");
                        setLoading(false);
                        setPatient({});
                      }}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {Loading == true ? (
              <div className="flex justify-center items-center">
                <ReactLoading
                  type={"bubbles"}
                  color={"var(--primary-color)"}
                  height={"10%"}
                  width={"10%"}
                />
              </div>
            ) : Object.keys(patient).length !== 0 ? (
              <div className="flex flex-row justify-between flex-wrap m-5">
                <div className="text-heading flex flex-col w-[45%]">
                  <h3 className="text-2xl font-extrabold">Patient Details</h3>
                  {/* <div className="bg-primary">Data</div> */}
                  <div
                    style={{ background: "var(--card-bg)" }}
                    className="p-4 mt-4 px-8 rounded-xl shadow-md shadow-primary border-2 border-primary text-xl"
                  >
                    <div>
                      <h3>
                        Name : {patient.BasicInformation.name.firstName}{" "}
                        {patient.BasicInformation.name.middleName}{" "}
                        {patient.BasicInformation.name.lastName}
                      </h3>
                    </div>
                    <div>
                      <h3>
                        Date :{" "}
                        {convertDatetoString(patient.BasicInformation.dob)}
                      </h3>
                    </div>
                    <div>
                      <h3>
                        Blood group : {patient.HealthInformation.bloodGroup}
                      </h3>
                    </div>

                    <div className="w-[100%]">
                      <h3 className="font-bold mt-4">Past Health History</h3>
                      <div>{`${
                        patient.HealthInformation.diseases[0].diseaseName ||
                        "No"
                      } (${
                        patient.HealthInformation.diseases[0]?.diseaseyrs || "0"
                      } yrs.)`}</div>
                    </div>
                  </div>
                </div>
                <div className="text-heading flex flex-col w-[45%]">
                  <h3 className="font-extrabold text-2xl ">
                    Recent Health Checkup
                  </h3>
                  {/* <div className="bg-primary">Data</div> */}
                  {prescriptions.length > 0 ? (
                    <div
                      style={{ background: "var(--card-bg)" }}
                      className="mt-4 p-4 rounded-xl shadow-md shadow-primary border-2 border-primary px-8 text-xl"
                    >
                      <div className="flex ">
                        <div>
                          <h3>Consultant Doctor :</h3>
                        </div>
                        <div className="ml-2">
                          <h3>{`Dr. ${prescriptions[0].doctor}`}</h3>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <h3>Date :</h3>
                        </div>
                        <div className="ml-2">
                          <h3>
                            {convertDatetoString(prescriptions[0].createdAt)}
                          </h3>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <h3>Diagnosis : </h3>
                        </div>
                        <div className="ml-2">
                          <h3>{prescriptions[0].diagnosis}</h3>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          props.setPrescriptionID(prescriptions[0]._id);
                          props.setMenuItem("PreviewPrescription");
                        }}
                      >
                        <div className=" mt-2 flex items-center justify-evenly text-base bg-primary py-1 px-2 rounded font-semibold  shadow-sm hover:bg-bgsecondary w-5/12  ">
                          <img src={reports} className="h-4" alt="report"></img>

                          <button className=" font-semibold pl-1">
                            Preview Prescription
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{ background: "var(--card-bg)" }}
                      className="mt-4 p-4 rounded-xl shadow-md shadow-primary border-2 border-primary px-8 flex justify-center font-bold"
                    >
                      {" "}
                      No Data Found...{" "}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-xl flex justify-center items-center font-bold my-60 text-heading">
                Search Patient to Add Diagnosis
              </div>
            )}

            {Loading == true ? (
              <></>
            ) : Object.keys(patient).length !== 0 ? (
              <div className="m-4">
                <div className="flex justify-between mt-8 mb-6">
                  <div className="font-extrabold text-2xl">
                    <h3 className="text-heading">Patient Dashboard</h3>
                  </div>
                  {/* <Link to="/doctor/addDiagno">
                  <div className=" flex bg-primary pl-0 pr-3 py-2 items-center justify-items-center rounded font-semibold text-black shadow-sm hover:bg-bgsecondary   ">
                    <RiAddLine className="mx-1" />
                    <button className="font-semibold">Add New Diagnosis</button>
                  </div>
                </Link> */}
                  <div
                    onClick={() => {
                      setMenuItem("AddNewDiagnosis");
                    }}
                    className=" flex bg-primary pl-0 pr-3 py-2 items-center justify-items-center rounded font-semibold text-black shadow-sm hover:bg-bgsecondary   "
                  >
                    <RiAddLine className="mx-1" />
                    <button className="font-semibold">Add New Diagnosis</button>
                  </div>
                </div>
                <div
                  style={{ background: "var(--card-bg)" }}
                  className="border-2 border-primary rounded-lg text-heading"
                >
                  <div className="grid grid-rows-2 p-6 gap-2 shadow">
                    <div className="grid grid-cols-4 font-bold  ">
                      <div>
                        <h3>Date</h3>
                      </div>
                      <div>
                        <h3>Doctor Name</h3>
                      </div>
                      <div>
                        <h3>Diagnosis</h3>
                      </div>
                      <div>
                        <h3>Prescription</h3>
                      </div>
                      <hr />
                      <hr />
                      <hr />
                      <hr />
                    </div>

                    {prescriptions.length > 1 ? (
                      prescriptions.slice(1, 3).map((prescription, index) => {
                        return (
                          <div className="grid grid-cols-4" key={index}>
                            <div>
                              <h3>
                                {convertDatetoString(prescription.createdAt)}
                              </h3>
                            </div>
                            <div className="flex">
                              <h3>Dr. </h3>
                              <h3>{prescription.doctor}</h3>
                            </div>
                            <div>
                              <h3>{prescription.diagnosis}</h3>
                            </div>
                            <div
                              onClick={() => {
                                props.setPrescriptionID(prescription._id);
                                props.setMenuItem("PreviewPrescription");
                              }}
                            >
                              <div className=" flex  justify-center bg-primary py-1 px-3 rounded font-semibold  shadow-sm hover:bg-bgsecondary w-2/5">
                                <RiEyeFill className="h-4 my-auto" />
                                <button className="font-bold ml-2">
                                  Preview{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="mx-auto mt-3 mb-5">
                        No Records Found...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
