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
      <section className="section">
        <div className="container">
          <div className="wrapper mt-[8%]">
            <div className="rounded-md border-primary border-2 flex flex-col justify-center items-center shadow-xl p-8">
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
                      <PersonOutlineIcon fontSize="10rem"
                        // sx={{
                        //   fontSize: "2rem",
                        // }}
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
                      <h3>A-</h3>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
