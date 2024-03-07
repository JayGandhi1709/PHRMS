import React, { useState } from "react";
import Check from "@mui/icons-material/Check";
import { BACKENDURL } from "../../../App";
import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";

import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import InputAdornment from "@mui/material/InputAdornment";
import { IoIosAdd, IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

import { makeStyles, styled } from "@mui/styles";

import PatientImg from "./../../../Assets/images/home/patient.svg";
import DoctorImg from "./../../../Assets/images/home/doctor.svg";

// Stepper Import
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";

// Icons Import
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PasswordIcon from "@mui/icons-material/Password";

// Stepper Labels get

const bloodGroupOptions = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

// Stepper Style
const useStyles = makeStyles(() => ({
  root: {
    // "& .MuiStepIcon-active": { color: "#27C690" },
    // "& .MuiStepIcon-active": { color: "green" },
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
  const { register, errors, gender, setGender, setValue } = props;

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
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your First Name"
          fullWidth
          margin="normal"
          {...register("BasicInformation.name.firstName", {
            required: "This field is required",
          })}
          error={Boolean(errors?.BasicInformation?.name?.firstName)}
          helperText={errors?.BasicInformation?.name?.firstName?.message}
        />
        <CssTextField
          id="middle-name"
          label="Middle Name"
          name="middleName"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true }}
          placeholder="Enter Your Middle Name"
          fullWidth
          margin="normal"
          {...register("BasicInformation.name.middleName")}
        />
        <CssTextField
          id="last-name"
          label="Last Name"
          name="lastName"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your Last Name"
          fullWidth
          margin="normal"
          {...register("BasicInformation.name.lastName", {
            required: "This field is required",
          })}
          error={Boolean(errors?.BasicInformation?.name?.lastName)}
          helperText={errors?.BasicInformation?.name?.lastName?.message}
        />
      </div>

      <CssTextField
        id="aadhaar-card-number"
        label="Aadhaar Card Number"
        name="aadhaarCard"
        variant="outlined"
        InputProps={{
          style: { color: "var(--heading-color)" },
        }}
        InputLabelProps={{ shrink: true, required: true }}
        maxLength={12}
        placeholder="Enter Your Aadhaar Number"
        fullWidth
        margin="normal"
        {...register("BasicInformation.aadhaarCard", {
          required: "This field is required",
          pattern: {
            value: /^\d{12}$/,
            message: "Enter Valid Addhar Number.",
          },
        })}
        error={Boolean(errors?.BasicInformation?.aadhaarCard)}
        helperText={errors?.BasicInformation?.aadhaarCard?.message}
      />

      <CssTextField
        id="email"
        label="E-mail"
        name="email"
        variant="outlined"
        InputProps={{
          style: { color: "var(--heading-color)" },
        }}
        InputLabelProps={{ shrink: true, required: true }}
        placeholder="Enter Your E-mail Address"
        fullWidth
        margin="normal"
        {...register("BasicInformation.email", {
          required: "This field is required",
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&’*+/=?^`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Enter Valid Email Address.",
          },
        })}
        error={Boolean(errors?.BasicInformation?.email)}
        helperText={errors?.BasicInformation?.email?.message}
      />

      <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
        <CssTextField
          id="phone-number"
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          InputLabelProps={{ shrink: true, required: true }}
          InputProps={{
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
          {...register("BasicInformation.phoneNumber", {
            required: "This field is required",
            pattern: { value: /^\d{10}$/, message: "Enter Valid Number" },
          })}
          error={Boolean(errors?.BasicInformation?.phoneNumber)}
          helperText={errors?.BasicInformation?.phoneNumber?.message}
        />

        <CssTextField
          id="alternate-phone"
          label="Alternate Phone"
          variant="outlined"
          name="alternatePhoneNumber"
          InputLabelProps={{ shrink: true }}
          InputProps={{
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
          // {...register("alternatePhoneNumber")}
          {...register("BasicInformation.alternatePhoneNumber", {
            pattern: { value: /^\d{10}$/, message: "Enter Valid Number" },
          })}
          error={Boolean(errors?.BasicInformation?.alternatePhoneNumber)}
          helperText={errors?.BasicInformation?.alternatePhoneNumber?.message}
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
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Your Date Of Birth"
          fullWidth
          margin="normal"
          {...register("BasicInformation.dob", {
            required: "This field is required",
          })}
          error={Boolean(errors?.BasicInformation?.dob)}
          helperText={errors?.BasicInformation?.dob?.message}
        />

        <CssTextField
          select
          label="Gender"
          name="gender"
          required
          id="gender"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
          }}
          onChange={(e) => {
            setGender(e.target.value);
            // console.log(e.target.value);
            setValue("BasicInformation.gender", e.target.value);

            // console.log(gender);
          }}
          // {...register("BasicInformation.gender")}
          defaultValue={gender || ""}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Select Your Gender"
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled selected>
            Select Your Gender
          </MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </CssTextField>
      </div>
    </>
  );
};

const AddressInformation = (props) => {
  const { register, errors } = props;
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
              style: { color: "var(--heading-color)" },
            }}
            name="address1"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your House/Flat No."
            fullWidth
            margin="normal"
            {...register("AddressInformation.address1", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.address1)}
            helperText={errors?.AddressInformation?.address1?.message}
          />

          <CssTextField
            id="address2"
            label="Address 2"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="address2"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Street Name"
            fullWidth
            margin="normal"
            {...register("AddressInformation.address2", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.address2)}
            helperText={errors?.AddressInformation?.address2?.message}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="city"
            label="City"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="city"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your City Name"
            fullWidth
            margin="normal"
            {...register("AddressInformation.city", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.city)}
            helperText={errors?.AddressInformation?.city?.message}
          />

          <CssTextField
            id="taluka"
            label="Taluka Name"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="taluka"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Taluka Name"
            fullWidth
            margin="normal"
            {...register("AddressInformation.taluka", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.taluka)}
            helperText={errors?.AddressInformation?.taluka?.message}
          />

          <CssTextField
            id="district"
            label="District"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="district"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your District Name"
            fullWidth
            margin="normal"
            {...register("AddressInformation.district", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.district)}
            helperText={errors?.AddressInformation?.district?.message}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="state"
            label="State"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="state"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your State Name"
            fullWidth
            margin="normal"
            {...register("AddressInformation.state", {
              required: "This field is required",
            })}
            error={Boolean(errors?.AddressInformation?.state)}
            helperText={errors?.AddressInformation?.state?.message}
          />

          <CssTextField
            type="number"
            id="pinCode"
            label="Pin Code"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="pinCode"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Your Pin/Postal Code"
            fullWidth
            margin="normal"
            {...register("AddressInformation.pinCode", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Pin-code length must be 6",
              },
              maxLength: {
                value: 6,
                message: "Pin-code length must be 6",
              },
            })}
            error={Boolean(errors?.AddressInformation?.pinCode)}
            helperText={errors?.AddressInformation?.pinCode?.message}
          />
        </div>
      </div>
    </>
  );
};

const HealthInformation = (props) => {
  const { register, control, selectedBlood, setSelectedBlood, setValue } =
    props;
  const { append, fields, remove } = useFieldArray({
    control,
    name: "HealthInformation.diseaseList",
  });
  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Health Information
      </h3>
      {/* {console.log(diseaseList)} */}
      <div className="pt-12">
        <>
          <CssTextField
            select
            // validate={}
            label="Blood group"
            name="bloodGroup"
            required
            id="blood-grounp"
            margin="normal"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            onChange={(e) => {
              setSelectedBlood(e.target.value);
              setValue("HealthInformation.bloodGroup", e.target.value);
            }}
            defaultValue={selectedBlood || ""}
            // {...register("HealthInformation.bloodGroup")}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Select Your Blood Group"
            fullWidth
          >
            <MenuItem value="" disabled selected>
              Select Your Blood Group
            </MenuItem>
            {bloodGroupOptions.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </CssTextField>
          <div className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0">
            <CssTextField
              id="weight"
              label="Weight"
              variant="outlined"
              name="weight"
              InputLabelProps={{ shrink: true }}
              InputProps={{
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
              {...register("HealthInformation.weight")}
            />
            <CssTextField
              id="height"
              label="Height"
              variant="outlined"
              name="height"
              InputLabelProps={{ shrink: true }}
              InputProps={{
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
              {...register("HealthInformation.height")}
            />
          </div>
        </>
        {fields.map((item, index) => {
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
        })}
      </div>
    </>
  );
};

const HospitalInformation = (props) => {
  const { register, errors } = props;
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
            style: { color: "var(--heading-color)" },
          }}
          name="hospitalName"
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Hospital Name"
          fullWidth
          margin="normal"
          {...register("HospitalInformation.hospitalName", {
            required: "This field is required",
          })}
          error={Boolean(errors?.HospitalInformation?.hospitalName)}
          helperText={errors?.HospitalInformation?.hospitalName?.message}
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
            style: { color: "var(--heading-color)" },
            startAdornment: (
              <InputAdornment position="start">
                <span className="text-heading">+91</span>
              </InputAdornment>
            ),
          }}
          margin="normal"
          {...register("HospitalInformation.hospitalContact", {
            required: "This field is required",
            pattern: { value: /^\d{10}$/, message: "Enter Valid Number" },
          })}
          error={Boolean(errors?.HospitalInformation?.hospitalContact)}
          helperText={errors?.HospitalInformation?.hospitalContact?.message}
        />
        <CssTextField
          type="number"
          id="charge"
          label="Consultation Charge"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
          }}
          name="charge"
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Consultant Fee"
          fullWidth
          margin="normal"
          {...register("HospitalInformation.consultantFee", {
            required: "This field is required",
          })}
          error={Boolean(errors?.HospitalInformation?.consultantFee)}
          helperText={errors?.HospitalInformation?.consultantFee?.message}
        />
        <br />
        <br />
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="address1"
            label="Address 1"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="address1"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Street Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.address1", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.address1)}
            helperText={errors?.HospitalInformation?.address?.address1?.message}
          />

          <CssTextField
            id="address2"
            label="Address 2"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="address2"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Area Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.address2", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.address2)}
            helperText={errors?.HospitalInformation?.address?.address2?.message}
          />
        </div>

        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="city"
            label="City"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="city"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter City Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.city", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.city)}
            helperText={errors?.HospitalInformation?.address?.city?.message}
          />

          <CssTextField
            id="taluka"
            label="Taluka Name"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="taluka"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Taluka Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.taluka", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.taluka)}
            helperText={errors?.HospitalInformation?.address?.taluka?.message}
          />

          <CssTextField
            id="district"
            label="District"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="district"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter District Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.district", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.district)}
            helperText={errors?.HospitalInformation?.address?.district?.message}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="state"
            label="State"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="state"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter State Name"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.state", {
              required: "This field is required",
            })}
            error={Boolean(errors?.HospitalInformation?.address?.state)}
            helperText={errors?.HospitalInformation?.address?.state?.message}
          />

          <CssTextField
            type="number"
            id="pinCode"
            label="Pin Code"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            name="pinCode"
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter Pin/Postal Code"
            fullWidth
            margin="normal"
            {...register("HospitalInformation.address.pinCode", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Pin-code length must be 6",
              },
              maxLength: {
                value: 6,
                message: "Pin-code length must be 6",
              },
            })}
            error={Boolean(errors?.HospitalInformation?.address?.pinCode)}
            helperText={errors?.HospitalInformation?.address?.pinCode?.message}
          />
        </div>
      </div>
    </>
  );
};

const EducationInformation = (props) => {
  const { register, control, errors } = props;
  const {
    append: specializationAppend,
    fields: specializationFields,
    remove: specializationRemove,
  } = useFieldArray({
    control,
    name: "EducationInformation.specializationList",
  });
  const {
    append: educationAppend,
    fields: educationFields,
    remove: educationRemove,
  } = useFieldArray({
    control,
    name: "EducationInformation.educationList",
  });
  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Education Information
      </h3>
      <div className="pt-12">
        {specializationFields.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex sm:flex-row flex-col md:space-x-4 sm:space-x-2 space-x-0"
            >
              <CssTextField
                name={`specializationList[${index}].specialization`}
                label="specialization"
                variant="outlined"
                InputProps={{
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter specialization Name"
                {...register(
                  `EducationInformation.specializationList.${index}.specialization`,
                  { required: "This field is required" }
                )}
                // fullWidth
                margin="dense"
                defaultValue={item.specialization}
                error={Boolean(
                  errors?.EducationInformation?.specializationList?.[index]
                    ?.specialization
                )}
                helperText={
                  errors?.EducationInformation?.specializationList?.[index]
                    ?.specialization?.message
                }
              />
              <IconButton
                onClick={() => specializationAppend({ specialization: "" })}
              >
                <IoIosAdd />
              </IconButton>
              {index === 0 ? (
                ""
              ) : (
                <IconButton onClick={() => specializationRemove(index)}>
                  <IoMdTrash />
                </IconButton>
              )}
            </div>
          );
        })}

        {educationFields.map((item, index) => {
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
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter Education Name"
                {...register(
                  `EducationInformation.educationList.${index}.eduName`,
                  { required: "This field is required" }
                )}
                // fullWidth
                margin="dense"
                defaultValue={item.eduName}
                error={Boolean(
                  errors?.EducationInformation?.educationList?.[index]?.eduName
                )}
                helperText={
                  errors?.EducationInformation?.educationList?.[index]?.eduName
                    ?.message
                }
              />
              <CssTextField
                name={`educationList[${index}].doc`}
                type="file"
                label="Education"
                variant="outlined"
                InputProps={{
                  style: { color: "var(--heading-color)" },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                placeholder="Enter Education Document"
                {...register(
                  `EducationInformation.educationList.${index}.doc`,
                  { required: "This field is required" }
                )}
                margin="dense"
                error={Boolean(
                  errors?.EducationInformation?.educationList?.[index]?.doc
                )}
                helperText={
                  errors?.EducationInformation?.educationList?.[index]?.doc
                    ?.message
                }
              />
              <IconButton
                onClick={() => educationAppend({ eduName: "", doc: "" })}
              >
                <IoIosAdd />
              </IconButton>
              {index === 0 ? (
                ""
              ) : (
                <IconButton onClick={() => educationRemove(index)}>
                  <IoMdTrash />
                </IconButton>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const EmergencyContactDetails = (props) => {
  const { register, errors } = props;

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
              style: { color: "var(--heading-color)" },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter First Name"
            fullWidth
            margin="normal"
            {...register("EmergencyContactDetails.name.firstName", {
              required: "This field is required",
            })}
            error={Boolean(errors?.EmergencyContactDetails?.name?.firstName)}
            helperText={
              errors?.EmergencyContactDetails?.name?.firstName?.message
            }
          />

          <CssTextField
            id="sur-name"
            label="Surname"
            name="surName"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter SurName"
            fullWidth
            margin="normal"
            {...register("EmergencyContactDetails.name.surName", {
              required: "This field is required",
            })}
            error={Boolean(errors?.surName)}
            helperText={errors?.surName?.message}
          />
        </div>

        <div className="flex sm:flex-row flex-col justify-between md:space-x-4 sm:space-x-2 space-x-0">
          <CssTextField
            id="email"
            label="E-mail"
            name="email"
            variant="outlined"
            InputProps={{
              style: { color: "var(--heading-color)" },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            placeholder="Enter E-mail Address"
            fullWidth
            margin="normal"
            {...register("EmergencyContactDetails.email", {
              required: "This field is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Enter Valid Email Address.",
              },
            })}
            error={Boolean(errors?.EmergencyContactDetails?.email)}
            helperText={errors?.EmergencyContactDetails?.email?.message}
          />
          <CssTextField
            id="phone-number"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            InputLabelProps={{ shrink: true, required: true }}
            InputProps={{
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
            {...register("EmergencyContactDetails.phoneNumber", {
              required: "This field is required",
              pattern: { value: /^\d{10}$/, message: "Enter Valid Number" },
            })}
            error={Boolean(errors?.EmergencyContactDetails?.phoneNumber)}
            helperText={errors?.EmergencyContactDetails?.phoneNumber?.message}
          />
        </div>

        <CssTextField
          id="relation"
          label="Relation"
          name="relation"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Relation"
          fullWidth
          margin="normal"
          {...register("EmergencyContactDetails.relation", {
            required: "This field is required",
          })}
          error={Boolean(errors?.EmergencyContactDetails?.relation)}
          helperText={errors?.EmergencyContactDetails?.relation?.message}
        />
      </div>
    </>
  );
};

const SetPassword = (props) => {
  const {
    register,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    watch,
  } = props;

  const password = watch("setPassword.password");

  return (
    <>
      <h3 className="title text-[20px] flex justify-center font-medium text-heading">
        Set Password
      </h3>
      <div className="pt-12">
        <CssTextField
          id="password"
          type={showPassword === false ? "text" : "password"}
          // type="password"
          name="password"
          label="Password"
          variant="outlined"
          InputProps={{
            style: { color: "var(--heading-color)" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword === false ? (
                    <MdVisibilityOff color="var(--heading-color)" />
                  ) : (
                    <MdVisibility color="var(--heading-color)" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Enter Password"
          fullWidth
          margin="normal"
          {...register("setPassword.password", {
            required: "this field is required.",
            pattern: {
              // value:/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/₹])[a-zA-Z0-9~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/₹]{10,16}$/,
              // value:/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/₹]{10,16}$/,
              value:
                /^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message:
                "Password should include at least one uppercase, one numeric value and one special character",
            },
            minLength: {
              value: 8,
              message: "Minimum required length is 8",
            },
          })}
          error={Boolean(errors?.setPassword?.password)}
          helperText={errors?.setPassword?.password?.message}
        />

        <CssTextField
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword === false ? "text" : "password"}
          label="Confirm Password"
          variant="outlined"
          InputLabelProps={{ shrink: true, required: true }}
          placeholder="Re-Type your password"
          fullWidth
          margin="normal"
          InputProps={{
            style: { color: "var(--heading-color)" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showConfirmPassword === false ? (
                    <MdVisibilityOff color="var(--heading-color)" />
                  ) : (
                    <MdVisibility color="var(--heading-color)" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("setPassword.confirmPassword", {
            required: "this field is required.",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          error={Boolean(errors?.setPassword?.confirmPassword)}
          helperText={errors?.setPassword?.confirmPassword?.message}
        />
      </div>
    </>
  );
};

const Register = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [radio, setRadio] = useState("Patient");
  const [showPassword, setShowPassword] = useState("false");
  const [showConfirmPassword, setShowConfirmPassword] = useState("false");
  // const [error, setError] = useState({});
  // const [docImages, setDocImages] = useState([]);
  const [selectedBlood, setSelectedBlood] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
        consultantFee: "",
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
      },
      setPassword: {
        password: "",
        confirmPassword: "",
      },
    },
  });

  const isStepsFailed = () => {
    // return Boolean(true);
    return Boolean(Object.keys(errors).length);
  };

  const getSteps = () => {
    const bothUserSteps = [
      "Account Type",
      "Basic Information",
      "Address Information",
      "Set Password",
    ];

    radio === "Patient"
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
      case 1:
        return (
          <BasicInformation
            register={register}
            errors={errors}
            gender={gender}
            setValue={setValue}
            setGender={setGender}
          />
        );

      case 2:
        return <AddressInformation register={register} errors={errors} />;

      case 3:
        return radio === "Patient" ? (
          <HealthInformation
            setValue={setValue}
            register={register}
            control={control}
            errors={errors}
            selectedBlood={selectedBlood}
            setSelectedBlood={setSelectedBlood}
          />
        ) : (
          <EducationInformation
            register={register}
            errors={errors}
            control={control}
          />
        );

      case 4:
        return radio === "Patient" ? (
          <EmergencyContactDetails register={register} errors={errors} />
        ) : (
          <HospitalInformation register={register} errors={errors} />
        );

      case 5:
        return (
          <SetPassword
            register={register}
            watch={watch}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );

      default:
        return "Unable to proccess";
    }
  };

  const c = useStyles();

  const onSubmit = async (data, e) => {
    // setValue("BasicInformation.gender",gender)
    if (activeStep === getSteps().length - 1) {
      e.preventDefault();
      if (data.setPassword.password === data.setPassword.confirmPassword) {
        setLoading(true);
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        for (const key of Object.keys(
          data.EducationInformation.educationList
        )) {
          // console.log(key);
          formData.append(
            "doc",
            data.EducationInformation.educationList[key].doc[0]
          );
        }
        e.preventDefault();
        const finalUrl =
          radio === "Patient"
            ? `${BACKENDURL}/register/patient`
            : `${BACKENDURL}/register/doctor`;
        // console.log(finalUrl);
        // const submitData = (radio === "Patient" ? JSON.stringify(data) : formData);
        // console.log(submitData);

        const res = await fetch(finalUrl, {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        });

        const finalData = await res.json();
        // console.log(finalData.errors);

        if (finalData.errors) {
          setLoading(false);
          // setError(finalData.errors);
          // console.log(finalData.errors);

          props.settoastCondition({
            status: "error",
            message: finalData.errors,
          });
          props.setToastShow(true);
        } else {
          setLoading(false);
          props.settoastCondition({
            status: "success",
            message: "Your Registration done Successfully!",
          });
          props.setToastShow(true);
          navigate("/");
        }
      } else {
        // setPasswordError("Password Doesn't Matches");
        props.settoastCondition({
          status: "error",
          message: `Password Doesn't Matches`,
        });
        props.setToastShow(true);
      }
    } else {
      // console.log(data);
      setActiveStep(activeStep + 1);
    }
  };
  // Stepper Coustomization

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
      1: <HowToRegIcon />,
      2: <PersonIcon />,
      3: <HomeIcon />,
      4: radio === "Patient" ? <HealthAndSafetyIcon /> : <SchoolIcon />,
      5: radio === "Patient" ? <EmergencyShareIcon /> : <LocalHospitalIcon />,
      6: <PasswordIcon />,
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
    <section className="registersection">
      <div className="container">
        <div className="registerwrapper">
          <h1>register Here</h1>
          <div className="registerstepper">
            {activeStep === getSteps().length ? (
              <Typography varient="h3" align="center">
                Thank You...!!!
              </Typography>
            ) : (
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
                    <Step key={label}>
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
            )}
          </div>
          <div className="registerform mt-16">
            {activeStep === getSteps().length ? (
              ""
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 ? (
                  <>
                    <h3 className="title text-[20px] flex justify-center font-medium text-heading">
                      Account Type
                    </h3>
                    <div className="flex flex-row justify-center space-x-6 mt-6 mb-14 w-full">
                      {/* Patient CardBoard */}
                      <div
                        id="typePatient"
                        className={`rounded border-primary py-2 relative transition-all hover:scale-[1.05] hover:shadow-xl ${
                          radio === "Patient" ? "border-4" : "border-[1px]"
                        }`}
                      >
                        <label className="lradiocontainer patient">
                          <div className="radioinner ">
                            <div className="checkmark ">
                              <input
                                type="radio"
                                checked={radio === "Patient"}
                                className="appearance-none"
                                value="Patient"
                                onChange={(e) => {
                                  // console.log(e.target.value);
                                  setRadio(e.target.value);
                                }}
                              />
                              <span>
                                {radio === "Patient" ? (
                                  <FaCheckCircle
                                    color="#42A5F5"
                                    className="bg-white shadow-md shadow-cyan-500/50 rounded-full text-[30px] absolute top-[93%] right-[-18px]"
                                  />
                                ) : (
                                  // <FaCheckCircle className="text-[40px] absolute right-[25%] translate-x-[50%] translate-y-[110px]" />
                                  ""
                                )}
                              </span>
                            </div>
                            <div className="patientAvatar">
                              <img
                                src={PatientImg}
                                width="200"
                                height="200"
                                alt="Patient"
                              ></img>
                            </div>
                            <div className="info font-medium text-heading text-center">
                              Patient
                            </div>
                          </div>
                        </label>
                      </div>
                      {/* Doctor CardBoard */}
                      <div
                        id="typeDoctor"
                        className={`rounded border-primary relative py-2 transition-all hover:scale-[1.05] hover:shadow-xl ${
                          radio === "Doctor" ? "border-4" : "border-[1px]"
                        }`}
                      >
                        <label className="lradiocontainer doctor">
                          <input
                            type="radio"
                            className="appearance-none"
                            checked={radio === "Doctor"}
                            // name="accountType"
                            value="Doctor"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setRadio(e.target.value);
                            }}
                          />
                          <span>
                            {radio === "Doctor" ? (
                              <FaCheckCircle
                                color="#42A5F5"
                                className="bg-white shadow-md shadow-cyan-500/50 rounded-full text-[30px] absolute top-[93%] right-[-18px]"
                              />
                            ) : (
                              ""
                            )}
                          </span>
                          <div className="radioinner">
                            <div className="checkmark"></div>
                            <div className="doctorAvatar">
                              <img
                                src={DoctorImg}
                                width="200"
                                height="200"
                                alt="doctor"
                              ></img>
                            </div>
                            <div className="info font-medium text-heading text-center">
                              Doctor
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  stepContent(activeStep)
                )}

                {Loading ? (
                  <div className="flex justify-center items-center py-3">
                    <ReactLoading
                      type={"bubbles"}
                      color={"color"}
                      height={"10%"}
                      width={"10%"}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button
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
                    </Button>
                    <Button
                      variant="contained"
                      // color="primary"
                      // onClick={() => {
                      //   setActiveStep(activeStep + 1);
                      // }}
                      // onClick={()=>{setValue("BasicInformation.gender",gender)}}
                      type="submit"
                      style={{
                        margin: "15px",
                        backgroundColor: "var(--primary-color)",
                      }}
                    >
                      {activeStep === getSteps().length - 1 ? "Submit" : "Next"}
                    </Button>{" "}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
