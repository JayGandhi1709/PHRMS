const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const doctorSchema = new mongoose.Schema({
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
      unique: [true, "Email already Exist"],
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
  EducationInformation: {
    specialization: [
      {
        specialization: {
          type: String,
        },
      },
    ],
    education: [
      {
        eduName: {
          type: String,
        },
        doc: {
          type: String,
        },
      },
    ],
  },
  HospitalInformation: {
    hospitalName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    hospitalContact: {
      type: Number,
      required: [true, "Please enter hospital Contact Number"],
      minlength: [10, "Please Enter a valid Mobile Phone"],
    },
    consultantFee: {
      type: Number,
      required: [true, "Please enter hospital Contact Number"],
    },
    address: {
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
  },
  setPassword: {
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [8, "Minimum length of password should must be 8 characters"],
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
});

doctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.setPassword.password = await bcrypt.hash(
    this.setPassword.password,
    salt
  );
  next();
});

//   Doctor Login Check Code
doctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ "BasicInformation.email": email });
  if (doctor) {
    const auth = await bcrypt.compare(password, doctor.setPassword.password);
    if (auth) {
      if (doctor.isVerified === true) {
        if (doctor.isSuspended === false) {
          return doctor;
        }
        throw Error("Suspended");
      }
      throw Error("Not verified");
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid email");
};

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
