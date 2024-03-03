const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isMobilePhone } = require("validator");
const prescriptionSchema = require("./prescription");

const patientSchema = new mongoose.Schema({
  healthID: {
    type: String,
  },
  BasicInformation: {
    name: {
      firstName: {
        type: String,
        required: [true, "Please Enter First Name"],
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: [true, "Please Enter Last Name"],
      },
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of Birth"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Mobile Number of contact person is required"],
      minlength: [10, "Please Enter a valid Mobile Phone"],
    },
    alternatePhoneNumber: {
      type: Number,
      // required: [true, "Mobile Number of contact person is required"],
      minlength: [10, "Please Enter a valid Mobile Phone"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      validate: [isEmail, "Please Enter a valid Email"],
    },
    aadhaarCard: {
      type: Number,
      min: [100000000000, "Please enter an valid AdharCard Number"],
      max: [999999999999, "Please enter an valid AdharCard Number"],
      unique: [true, "This AdharCard is already Registerd on System."],
      required: [true, "Please enter AdharCard Number"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
  },
  AddressInformation: {
    address1: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    address2: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    city: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    taluka: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    district: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    state: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    pinCode: {
      type: Number,
      min: [100000, "Please enter a valid pincode"],
      max: [999999, "Please enter a valid pincode"],
      required: [true, "Please enter complete Address"],
    },
  },
  HealthInformation: {
    bloodGroup: {
      type: String,
      required: [true, "Please enter Blood Group"],
    },
    height: {
      type: String,
      // required: [true, "Please enter your Height"],
    },
    weight: {
      type: String,
      // required: [true, "Please enter your Weight"],
    },
    diseases: [
      {
        diseaseName: {
          type: String,
        },
        diseaseyrs: {
          type: Number,
        },
      },
    ],
  },

  EmergencyContactDetails: {
    name: {
      firstName: {
        type: String,
        required: [true, "Name of contact person is required"],
      },
      surName: {
        type: String,
        required: [true, "Name of contact person is required"],
      },
    },
    phoneNumber: {
      type: Number,
      required: [true, "Mobile Number of contact person is required"],
      minlength: [10, "Please Enter a valid Mobile Phone"],
    },

    email: {
      type: String,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email."],
    },
    relation: {
      type: String,
    },
  },
  setPassword: {
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [8, "Minimum length of password should must be 8 characters"],
    },
  },
  // prescriptions: [prescriptionSchema],
});

patientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.setPassword.password = await bcrypt.hash(
    this.setPassword.password,
    salt
  );
  next();
});

// Patient Login Check Code
patientSchema.statics.login = async function (healthID, password) {
  const patient = await this.findOne({ healthID: healthID });
  // console.log(password);
  if (!healthID) {
    throw Error("Please enter HealthId");
  }
  if (patient) {
    // console.log(patient);
    const auth = await bcrypt.compare(password, patient.setPassword.password);
    if (auth) {
      return patient;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid HealthID");
};

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
