import React from "react";
import { useLocation } from "react-router-dom";

// ICONS
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";

const About = (props) => {
  const { loginData } = props;
  const location = useLocation();

  return (
    <>
      <section id="aboutUs" className="mt-[4%]">
        <div className="wrapper flex justify-around text-[var(--heading-color)]">
          <div className="rounded-md border-primary border-2 profile__info flex flex-col gap-[1.5rem] w-[25%] justify-center items-center scale-[1.05] shadow-xl pb-[2rem] mb-[5rem]">
            <div className="profile-info__icon py-[2rem]">
              <AccountCircleOutlinedIcon
                sx={{
                  fontSize: "8rem",
                  alignItems: "center",
                }}
              />
            </div>

            <div className="profile-info__details flex flex-col font-normal gap-[1.3rem] text-xl">
              {location.pathname === "/patient" ? (
                <>
                  <span className="flex items-center gap-[1rem]">
                    <PersonOutlineIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {loginData.BasicInformation.name.firstName}{" "}
                      {loginData.BasicInformation.name.middleName}{" "}
                      {loginData.BasicInformation.name.lastName}
                    </h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <DateRangeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {loginData.BasicInformation.dob
                        .replaceAll("-", "/")
                        .slice(-24, -14)
                        .split("/")
                        .reverse()
                        .join("/")}
                    </h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <BloodtypeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>{loginData.HealthInformation.bloodGroup}</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <LocalPhoneOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>+91 {loginData.BasicInformation.phoneNumber}</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <EmailOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>{loginData.BasicInformation.email}</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <HealthAndSafetyOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>{loginData.healthID}</h3>
                  </span>
                </>
              ) : location.pathname === "/doctor" ? (
                <>
                  <span className="flex items-center gap-[1rem]">
                    <PersonOutlineIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      Dr. {loginData.BasicInformation.name.firstName}{" "}
                      {loginData.BasicInformation.name.middleName}{" "}
                      {loginData.BasicInformation.name.lastName}
                    </h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <DateRangeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {loginData.BasicInformation.dob
                        .replaceAll("-", "/")
                        .slice(-24, -14)
                        .split("/")
                        .reverse()
                        .join("/")}
                    </h3>
                  </span>
                  {/* <span className="flex items-center gap-[1rem]">
                    <BloodtypeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>A-</h3>
                  </span> */}
                  <span className="flex items-center gap-[1rem]">
                    <LocalPhoneOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>+91 {loginData.BasicInformation.phoneNumber}</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <EmailOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>{loginData.BasicInformation.email}</h3>
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-[1rem]">
                    <PersonOutlineIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>Dr. Rohit Vilas Patil</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <DateRangeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>1/1/1999</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <BloodtypeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>A-</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <LocalPhoneOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>+91 9874514563</h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <EmailOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>rohit@gmail.com</h3>
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="address__info flex flex-col justify-between font-normal w-[50%] gap-[3rem]">
            <div className="rounded-md border-primary border-2 address-info__personal flex flex-col gap-[1rem] text-xl scale-[1.05] shadow-xl pl-[2rem] pb-[2rem]">
              {location.pathname === "/patient" ? (
                <>
                  <div className="address-info__hospital-title font-[900] text-[2rem] text-center m-[1rem] ">
                    <span>Emergency Contact Details</span>
                  </div>
                  <div className="address-info__hospital-content flex flex-col gap-[1.3rem] ">
                    <span className="flex items-center gap-[1rem]">
                      <PersonOutlineIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>
                        {loginData.EmergencyContactDetails.name.firstName}{" "}
                        {loginData.EmergencyContactDetails.name.surName}
                      </h3>
                    </span>
                    <span className="flex items-center gap-[1rem]">
                      <LocalPhoneOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>
                        +91 {loginData.EmergencyContactDetails.phoneNumber}
                      </h3>
                    </span>
                    <span className="flex items-center gap-[1rem]">
                      <EmailOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>{loginData.EmergencyContactDetails.email}</h3>
                    </span>
                    <span className="flex items-center gap-[1rem]">
                      <PlaceOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>
                        {loginData.EmergencyContactDetails.address.address1},{" "}
                        {loginData.EmergencyContactDetails.address.address2},
                        <br />
                        {loginData.EmergencyContactDetails.address.city},{" "}
                        {loginData.EmergencyContactDetails.address.taluka},{" "}
                        {loginData.EmergencyContactDetails.address.district},
                        <br />
                        {loginData.EmergencyContactDetails.address.state}-
                        {loginData.EmergencyContactDetails.address.pinCode}
                      </h3>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="address-info__hospital-title font-[900] text-[2rem] text-center mt-[1rem] mb-[3rem] ">
                    <span>Educational Details</span>
                  </div>
                  {/* <span className="flex items-center gap-[1rem]">
                    <HomeOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </h3>
                  </span> */}
                  <span className="flex items-center gap-[1rem]">
                    <SchoolOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {
                        loginData.EducationInformation.education[
                          loginData.EducationInformation.education.length - 1
                        ].eduName
                      }
                    </h3>
                  </span>
                  <span className="flex items-center gap-[1rem]">
                    <MedicalServicesOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {
                        loginData.EducationInformation.specialization[
                          loginData.EducationInformation.specialization.length -
                            1
                        ].specialization
                      }
                    </h3>
                  </span>
                </>
              )}
            </div>
            <div className="rounded-md border-primary border-2 address-info__hospital flex flex-col gap-[1rem] text-xl scale-[1.05] shadow-xl pl-[2rem] pb-[2rem]">
              {location.pathname === "/patient" ? (
                <>
                  <div className="address-info__hospital-title font-[900] text-[2rem] text-center mt-[1rem] m-[1rem] ">
                    <span>Your Address</span>
                  </div>
                  <span className="flex items-center gap-[1rem]">
                    <PlaceOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                    <h3>
                      {loginData.AddressInformation.address1},{" "}
                      {loginData.AddressInformation.address2},<br />
                      {loginData.AddressInformation.city},{" "}
                      {loginData.AddressInformation.taluka},{" "}
                      {loginData.AddressInformation.district},<br />
                      {loginData.AddressInformation.state}-
                      {loginData.AddressInformation.pinCode}
                    </h3>
                  </span>
                </>
              ) : (
                <>
                  <div className="address-info__hospital-title font-[900] text-[2rem] mt-4 text-center m-[1rem] ">
                    <span>Hospital Details</span>
                  </div>
                  <div className="address-info__hospital-content flex flex-col gap-[1.3rem] ">
                    <span className="flex items-center gap-[1rem]">
                      <LocalHospitalOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>{loginData.HospitalInformation.hospitalName}</h3>
                    </span>
                    <span className="flex items-center gap-[1rem]">
                      <LocalPhoneOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>{loginData.HospitalInformation.hospitalContact}</h3>
                    </span>
                    <span className="flex items-center gap-[1rem]">
                      <PlaceOutlinedIcon
                        sx={{
                          fontSize: "2rem",
                        }}
                      />
                      <h3>
                      {loginData.HospitalInformation.address.address1},{" "}
                      {loginData.HospitalInformation.address.address2},<br />
                      {loginData.HospitalInformation.address.city},{" "}
                      {loginData.HospitalInformation.address.taluka},{" "}
                      {loginData.HospitalInformation.address.district},<br />
                      {loginData.HospitalInformation.address.state}-
                      {loginData.HospitalInformation.address.pinCode}
                      </h3>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
