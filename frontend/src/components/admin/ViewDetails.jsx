import React, { useState } from "react";
import Check from "@mui/icons-material/Check";

import { Button, TextField, Stepper, Step, StepLabel } from "@mui/material";

import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import InputAdornment from "@mui/material/InputAdornment";

import { makeStyles, styled } from "@mui/styles";

// Steper Import
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";

// import trial from "./../../Assets/uploads/(0)_123456789012_reports.jpeg";

// Icons Import
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useEffect } from "react";
import PreviewDocument from "./PreviewDocument";

// Stepper Labels get

const bloodGroupOptions = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

// Stepper Style
const useStyles = makeStyles(() => ({
  root: {
    "& .Mui-active .MuiStepIcon-root": { color: "var(--primary-color)" },
    "& .Mui-error .MuiStepIcon-root": { color: "var(--primary-color)" },
  },
}));

const CssTextField = styled(TextField)({
  "& label": {
    color: "var(--heading-color)",
  },
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--heading-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});

// Forms
const BasicInformation = (props) => {
  const { val } = props;

  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Basic Information
      </h3>
      <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0 pt-12">
        <CssTextField
          id="ralation"
          label="First Name"
          name="firstName"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your First Name"
          fullWidth
          margin="normal"
          value={val.name.firstName}
        />
        <CssTextField
          id="middle-name"
          label="Middle Name"
          name="middleName"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true }}
          placeholder="Enter Your Middle Name"
          fullWidth
          margin="normal"
          value={val.name.middleName}
        />
        <CssTextField
          id="last-name"
          label="Last Name"
          name="lastName"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your Last Name"
          fullWidth
          margin="normal"
          value={val.name.lastName}
        />
      </div>

      <CssTextField
        id="aadhaar-card-number"
        label="Aadhaar Card Number"
        name="aadhaarCard"
        variant="outlined"
        InputProps={{
          readOnly: true,
          style: { color: "var(--heading-color)" },
        }}
        InputLabelProps={{ shrink: true, required: true }}
        maxLength={12}
        placeholder="Enter Your Aadhaar Number"
        fullWidth
        margin="normal"
        value={val.aadhaarCard}
      />

      <CssTextField
        id="email"
        label="E-mail"
        name="email"
        variant="outlined"
        InputProps={{
          readOnly: true,
          style: { color: "var(--heading-color)" },
        }}
        InputLabelProps={{ shrink: true, required: true }}
        placeholder="Enter Your E-mail Address"
        fullWidth
        margin="normal"
        value={val.email}
      />

      <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
        <CssTextField
          id="phone-number"
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          InputLabelProps={{ shrink: true, required: true }}
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
            startAdornment: (
              <InputAdornment position="start">
                <span className="text-heading">+91</span>
              </InputAdornment>
            ),
          }}
          placeholder="Enter Your Phone Number"
          fullWidth
          margin="normal"
          value={val.phoneNumber}
        />

        <CssTextField
          id="alternate-phone"
          label="Alternate Phone"
          variant="outlined"
          name="alternatePhoneNumber"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
            startAdornment: (
              <InputAdornment position="start">
                <span className="text-heading">+91</span>
              </InputAdornment>
            ),
          }}
          placeholder="Enter Your Alternate Phone"
          maxLength={13}
          fullWidth
          margin="normal"
          value={val.alternatePhoneNumber}
        />
      </div>

      <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
        <CssTextField
          type="date"
          id="dob"
          name="dob"
          label="Date Of Birth"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your Date Of Birth"
          fullWidth
          margin="normal"
          value={val.dob.slice(-24, -14).split("/").reverse()}
        />

        <CssTextField
          label="Gender"
          name="gender"
          required
          id="gender"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          value={val.gender}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Select Your Gender"
          fullWidth
          margin="normal"
        />
      </div>
    </>
  );
};

const AddressInformation = (props) => {
  const { val } = props;
  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Address Information
      </h3>
      <div className="pt-12">
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="address1"
            label="Address 1"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="address1"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your House/Flat No."
            fullWidth
            margin="normal"
            value={val.address1}
          />

          <CssTextField
            id="address2"
            label="Address 2"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="address2"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Street Name"
            fullWidth
            margin="normal"
            value={val.address2}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="city"
            label="City"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="city"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your City Name"
            fullWidth
            margin="normal"
            value={val.city}
          />

          <CssTextField
            id="taluka"
            label="Taluka Name"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="taluka"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Taluka Name"
            fullWidth
            margin="normal"
            value={val.taluka}
          />

          <CssTextField
            id="district"
            label="District"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="district"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your District Name"
            fullWidth
            margin="normal"
            value={val.district}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="state"
            label="State"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="state"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your State Name"
            fullWidth
            margin="normal"
            value={val.state}
          />

          <CssTextField
            id="pinCode"
            label="Pin Code"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="pinCode"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Pin/Postal Code"
            fullWidth
            margin="normal"
            value={val.pinCode}
          />
        </div>
      </div>
    </>
  );
};

const HealthInformation = (props) => {
  const { val } = props;

  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Health Information
      </h3>
      {/* {console.log(diseaseList)} */}
      <div className="pt-12">
        <>
          <CssTextField
            // validate={}
            label="Blood group"
            name="bloodGroup"
            required
            id="blood-grounp"
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            value={val.bloodGroup}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Select Your Blood Group"
            fullWidth
          />
          <div className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0">
            <CssTextField
              id="weight"
              label="Weight"
              variant="outlined"
              name="weight"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="text-heading">KG</span>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Your weight"
              maxLength={13}
              fullWidth
              margin="normal"
            />
            <CssTextField
              id="height"
              label="Height"
              variant="outlined"
              name="height"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="text-heading">Feet</span>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Your height"
              maxLength={13}
              fullWidth
              margin="normal"
            />
          </div>
        </>
        {/* {fields.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0"
            >
              <CssTextField
                name={`diseaseList[${index}].diseaseName`}
                label="Disease Name"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Disease Name"
                {...register(
                  `HealthInformation.diseaseList[${index}].diseaseName`
                )}
                // fullWidth
                margin="dense"
                defaultValue={item.diseaseName}
              />
              <CssTextField
                name={`diseaseList[${index}].diseaseyrs`}
                label="Disease Years"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { color: "var(--heading-color)" },
                }}
                // {...register(`diseaseList[${index}].diseaseyrs`)}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Disease Years"
                {...register(
                  `HealthInformation.diseaseList[${index}].diseaseyrs`
                )}
                // fullWidth
                margin="dense"
                defaultValue={item.diseaseyrs}
              />
              <IconButton
                onClick={() => append({ diseaseName: "", diseaseyrs: "" })}
              >
                <IoIosAdd />
              </IconButton>
              {index === 0 ? (
                ""
              ) : (
                <IconButton onClick={() => remove(index)}>
                  <IoMdTrash />
                </IconButton>
              )}
            </div>
          );
        })} */}
      </div>
    </>
  );
};

const HospitalInformation = (props) => {
  const { val } = props;
  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Hospital Information
      </h3>
      <div className="pt-12">
        <CssTextField
          id="hospitalName"
          label="Hospital Name"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          name="hospitalName"
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Hospital Name"
          fullWidth
          value={val.hospitalName}
        />
        <CssTextField
          id="hospitalContact"
          label="Hospital Contact Number"
          variant="outlined"
          name="hospitalContact"
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Hospital Contact number"
          fullWidth
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
            startAdornment: (
              <InputAdornment position="start">
                <span className="text-heading">+91</span>
              </InputAdornment>
            ),
          }}
          margin="normal"
          value={val.hospitalContact}
        />
        <br />
        <br />
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="address1"
            label="Address 1"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="address1"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Street Name"
            fullWidth
            margin="normal"
            value={val.address.address1}
          />

          <CssTextField
            id="address2"
            label="Address 2"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="address2"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Area Name"
            fullWidth
            margin="normal"
            value={val.address.address2}
          />
        </div>

        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="city"
            label="City"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="city"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter City Name"
            fullWidth
            margin="normal"
            value={val.address.city}
          />

          <CssTextField
            id="taluka"
            label="Taluka Name"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="taluka"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Taluka Name"
            fullWidth
            margin="normal"
            value={val.address.taluka}
          />

          <CssTextField
            id="district"
            label="District"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="district"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter District Name"
            fullWidth
            margin="normal"
            value={val.address.district}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="state"
            label="State"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="state"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter State Name"
            fullWidth
            margin="normal"
            value={val.address.state}
          />

          <CssTextField
            id="pinCode"
            label="Pin Code"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            name="pinCode"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Pin/Postal Code"
            fullWidth
            margin="normal"
            value={val.address.pinCode}
          />
        </div>
      </div>
    </>
  );
};

const EducationInformation = (props) => {
  const { val, popupHandle } = props;

  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Education Information
      </h3>
      <div className="pt-12">
        {val.specialization.map((item, index) => {
          return (
            <div
              key={index}
              className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0"
            >
              <CssTextField
                name={`specializationList[${index}].specialization`}
                label="specialization"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter specialization Name"
                margin="dense"
                defaultValue={item.specialization}
              />
            </div>
          );
        })}

        {val.education.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0"
            >
              <CssTextField
                name={`educationList[${index}].eduName`}
                label="Education"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter Education Name"
                margin="dense"
                value={item.eduName}
              />
              {/* <img src={require(`./../../Assets/uploads/(${index})_123456789012_${item.doc}`)} sizes="200" /> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  popupHandle(index, item.doc);
                }}
                style={{
                  margin: "15px",
                  backgroundColor: "var(--primary-color)",
                }}
              >
                Preview
              </Button>
              {/* <CssTextField
                name={`educationList[${index}].doc`}
                type="file"
                label="Education"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter Education Document"
                margin="dense"
              /> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

const EmergencyContactDetails = (props) => {
  const { val } = props;

  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Emergency Contact Details
      </h3>
      <div className="pt-12">
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0 pt-12">
          <CssTextField
            id="first-name"
            label="First Name"
            name="firstName"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter First Name"
            fullWidth
            margin="normal"
            value={val.name.firstName}
          />

          <CssTextField
            id="sur-name"
            label="Surname"
            name="surName"
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter SurName"
            fullWidth
            margin="normal"
            value={val.name.surName}
          />
        </div>
        <CssTextField
          id="email"
          label="E-mail"
          name="email"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter E-mail Address"
          fullWidth
          margin="normal"
          value={val.email}
        />

        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="phone-number"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            InputLabelProps={{ shrink: true, required: true }}
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-heading">+91</span>
                </InputAdornment>
              ),
            }}
            placeholder="Enter Phone Number"
            fullWidth
            margin="normal"
            value={val.phoneNumber}
          />

          <CssTextField
            id="alternate-phone"
            label="Alternate Phone"
            variant="outlined"
            name="alternatePhoneNumber"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              readOnly: true,
              style: { color: "var(--heading-color)" },
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-heading">+91</span>
                </InputAdornment>
              ),
            }}
            placeholder="Enter Alternate Phone"
            maxLength={13}
            fullWidth
            margin="normal"
            value={val.alternatePhoneNumber}
          />
        </div>

        <CssTextField
          id="relation"
          label="Relation"
          name="relation"
          variant="outlined"
          InputProps={{
            readOnly: true,
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Relation"
          fullWidth
          margin="normal"
          value={val.relation}
        />
        <hr />

        <div className="pt-4">
          <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
            <CssTextField
              id="address1"
              label="Address 1"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="address1"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter House/Flat No."
              fullWidth
              margin="normal"
              value={val.address.address1}
            />

            <CssTextField
              id="address2"
              label="Address 2"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="address2"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter Street Name"
              fullWidth
              margin="normal"
              value={val.address.address2}
            />
          </div>
          <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
            <CssTextField
              id="city"
              label="City"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="city"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter City Name"
              fullWidth
              margin="normal"
              value={val.address.city}
            />

            <CssTextField
              id="taluka"
              label="Taluka Name"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="taluka"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter Taluka Name"
              fullWidth
              margin="normal"
              value={val.address.taluka}
            />

            <CssTextField
              id="district"
              label="District"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="district"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter District Name"
              fullWidth
              margin="normal"
              value={val.address.district}
            />
          </div>
          <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
            <CssTextField
              id="state"
              label="State"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="state"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter State Name"
              fullWidth
              margin="normal"
              value={val.address.state}
            />

            <CssTextField
              id="pinCode"
              label="Pin Code"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { color: "var(--heading-color)" },
              }}
              name="pinCode"
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter Pin/Postal Code"
              fullWidth
              margin="normal"
              value={val.address.pinCode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ViewDetails = (props) => {
  const { userType } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [Loading, setLoading] = useState(false);
  // const [userType, setUserType] = useState("Doctor");
  const [miniOpenPopup, setMiniOpenPopup] = useState(false);
  const [docID, setDocID] = useState("");

  const navigate = useNavigate();

  const popupHandle = (i, value) => {
    // console.log(`${preloadedvalue.BasicInformation.aadhaarCard}_${value}`);
    setMiniOpenPopup(true);
    setDocID(i);
  };

  useEffect(() => {
    async function fetchDoctor() {
      const res = await fetch(`/searchdoctor/${props.selectedID}`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPreloadedvalue(data.doctor);
      }
    }
    async function fetchPatient() {
      // console.log(props.selectedID)
      const res = await fetch(`/getPatientDetails/${props.selectedID}`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        // console.log(data)
        setPreloadedvalue(data.patient);
      }
    }
    {
      userType === "Doctor" ? fetchDoctor() : fetchPatient();
    }
    // {userType === "Patient" ? fetchPatient() : "" };
  }, []);

  let [preloadedvalue, setPreloadedvalue] = useState({
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
      gender: "",
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
      diseaseList: [{ diseaseName: "", diseaseyrs: "" }],
    },
    EducationInformation: {
      specializationList: [{ specialization: "" }],
      educationList: [{ eduName: "", doc: "" }],
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedvalue,
  });

  const isStepsFailed = () => {
    // return Boolean(true);
    return Boolean(Object.keys(errors).length);
  };

  const getSteps = () => {
    const bothUserSteps = [
      //   "Account Type",
      "Basic Information",
      "Address Information",
    ];

    userType === "Patient"
      ? bothUserSteps.splice(
          3,
          0,
          "Health Information",
          "Emergency Contact Details"
        )
      : bothUserSteps.splice(
          3,
          0,
          "Education Information",
          "Hospital Information"
        );

    return bothUserSteps;
  };

  // Forms Return
  const stepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInformation val={preloadedvalue.BasicInformation} />;

      case 1:
        return <AddressInformation val={preloadedvalue.AddressInformation} />;

      case 2:
        return userType === "Patient" ? (
          <HealthInformation val={preloadedvalue.HealthInformation} />
        ) : (
          <EducationInformation
            val={preloadedvalue.EducationInformation}
            popupHandle={popupHandle}
          />
        );

      case 3:
        return userType === "Patient" ? (
          <EmergencyContactDetails
            val={preloadedvalue.EmergencyContactDetails}
          />
        ) : (
          <HospitalInformation val={preloadedvalue.HospitalInformation} />
        );

      default:
        return "Unable to proccess";
    }
  };

  const c = useStyles();

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        // backgroundImage:
        //   "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        backgroundImage: "var(--newsletter-bg)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "var(--newsletter-bg)",
        // "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      // backgroundColor: "#eaeaf0",
      // theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      backgroundColor: props.theme !== "light-theme" ? "white" : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerstate }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    "& .ColorlibStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    ...(ownerstate.active && {
      backgroundColor: "var(--primary-color)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerstate.completed && {
      // backgroundImage: "var(--newsletter-bg)",
      backgroundImage:
        props.theme === "light-theme"
          ? "var(--newsletter-bg)"
          : `linear-gradient(
        180deg,
        rgba(189, 243, 255, 1) 29%,
        rgba(193, 243, 255, 1) 50%,
        rgba(226, 250, 255, 1) 78%
      );`,
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      //   1: <HowToRegIcon />,
      1: <PersonIcon />,
      2: <HomeIcon />,
      3: userType === "Patient" ? <HealthAndSafetyIcon /> : <SchoolIcon />,
      4:
        userType === "Patient" ? <EmergencyShareIcon /> : <LocalHospitalIcon />,
      //   5: <PasswordIcon />,
      // 3: <VideoLabelIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerstate={{ completed, active }}
        className={className}
      >
        {completed ? (
          <Check className="ColorlibStepIcon-completedIcon" />
        ) : (
          icons[String(props.icon)]
        )}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  return (
    <section className="registersection bg-body_bg h-screen">
      <div className="container">
        <div className="registerwrapper">
          <Stepper
            className={c.root}
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {getSteps().map((label, index) => {
              const labelProps = {};
              if (isStepsFailed() && activeStep === index) {
                labelProps.error = true;
              }
              return (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    // {...labelProps}
                  >
                    <p className="text-heading">
                      {activeStep === index ? label : ""}
                    </p>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div className="registerform">
          <div className="flex justify-between">
            <div className="flex justify-start">
              {activeStep === 0 ? "" : (<Button
                variant="contained"
                color="primary"
                disabled={activeStep === 0}
                onClick={() => {
                  setActiveStep(activeStep - 1);
                }}
                style={{
                  margin: "15px",
                  backgroundColor:
                    activeStep === 0 ? "" : "var(--primary-color)",
                }}
              >
                Back
              </Button>)}
            </div>
            <div className="flex justify-end">
              {activeStep !== getSteps().length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                  style={{
                    margin: "15px",
                    backgroundColor: "var(--primary-color)",
                  }}
                >
                  Next
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
          {stepContent(activeStep)}
          {miniOpenPopup ? (
            <PreviewDocument
              miniOpenPopup={miniOpenPopup}
              setMiniOpenPopup={setMiniOpenPopup}
              val={preloadedvalue}
              docID={docID}
            ></PreviewDocument>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
