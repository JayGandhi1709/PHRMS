import React from "react";
import reports from "../../Assets/images/report2_pbl.png";
import { RiEyeFill } from "react-icons/ri";

const convertDatetoString = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Dashboard = (props) => {
  const { loginData, prescriptions,setPrescriptionID,setMenuItem } = props;


  return (
    <>
      <section className="section mt-10">
        <div className="container">
          <div className="wrapper">
            
            <div className="flex flex-col md:flex-row justify-between flex-wrap m-5">
              <div className="text-heading flex flex-col w-full md:w-[45%]">
                <h3 className="text-2xl font-extrabold">Patient Details</h3>
                <div
                  style={{ background: "var(--card-bg)" }}
                  className="p-4 mt-4 px-8 rounded-xl shadow-md shadow-primary border-2 border-primary text-xl"
                >
                  {/* Patient details content */}
                  <div>
                    <h3>
                      Name : {loginData.BasicInformation.name.firstName}{" "}
                      {loginData.BasicInformation.name.middleName}{" "}
                      {loginData.BasicInformation.name.lastName}
                    </h3>
                  </div>
                  <div>
                    <h3>
                      DOB :{" "}
                      {convertDatetoString(loginData.BasicInformation.dob)}
                    </h3>
                  </div>
                  <div>
                    <h3>
                      Blood group : {loginData.HealthInformation.bloodGroup}
                    </h3>
                  </div>

                  {/* <div className="w-[100%]">
                    <h3 className="font-bold mt-4">Past Health History</h3>
                    <div>{`${
                      loginData.HealthInformation.diseases[0].diseaseName ||
                      "No"
                    } (${
                      loginData.HealthInformation.diseases[0]?.diseaseyrs || "0"
                    } yrs.)`}</div>
                  </div> */}
                
                {loginData.HealthInformation.diseases[0] ? 
                  <div className="w-[100%]">
                    <h3 className="font-bold mt-4">Past Health History</h3>
                    <div>{`${
                      loginData.HealthInformation.diseases[0].diseaseName ||
                      "No"
                    } (${
                      loginData.HealthInformation.diseases[0]?.diseaseyrs || "0"
                    } yrs.)`}</div>
                  </div>
                  : "No" }
                </div>
              </div>
              <div className="text-heading flex flex-col w-full md:w-[45%]">
                <h3 className="font-extrabold text-2xl ">Recent Health Checkup</h3>
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
                          // console.log(prescriptions[0]._id)
                          setPrescriptionID(prescriptions[0]._id);
                          setMenuItem("PreviewPrescription");
                        }}
                      >
                        <div className="mt-2 flex items-center justify-evenly text-base bg-primary py-1 px-2 rounded font-semibold shadow-sm hover:bg-bgsecondary sm:w-5/12">
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
            <div className="m-4">
              <div className="flex justify-between mt-8 mb-6">
                <div className="font-extrabold text-2xl">
                  <h3 className="text-heading">Patient Dashboard</h3>
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
                    prescriptions.slice(1, 3).map((prescription,index) => {
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
                                props.setMenuItem(
                                  "PreviewPrescription"
                                );
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
                    <div className="mx-auto mt-3 mb-5">No Records Found...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
