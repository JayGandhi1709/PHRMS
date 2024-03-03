const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");


const handleError = (err) => {
  let errors = {};

  if (err.message.includes("prescription validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      required: [true, "Please enter Doctor Name"],
    },
    doctormobile: {
      type: String,
      required: [true, "Please enter Mobile Number"],
      minlength: [10, "Please Enter a valid Mobile Number"],
    },
    doctoremail: {
      type: String,
      required: [true, "Please enter email"],
      validate: [isEmail, "Please Enter a valid Email"],
    },
    healthID: {
      type: String,
    },
    patientName: {
      type: String,
    },
    hospital: {
      name: {
        type: String,
        required: [true, "Please enter hospital name."],
      },
      address: {
        type: String,
        required: [true, "Please enter hospital address."],
      },
      mobile: {
        type: String,
        required: [true, "Please enter Mobile Number"],
        minlength: [10, "Please Enter a valid Mobile Number"],
      },
    },
    chiefComplaints: [
      {
        complaint: {
          type: String,
        },
        duration: {
          type: String,
        },
        finding: {
          type: String,
        },
      },
    ],
    notes: {
      type: String,
    },
    diagnosis: {
      type: String,
    },
    procedureConducted: {
      type: String,
    },
    medicines: [
      {
        medicineName: {
          type: String,
        },
        type: {
          type: String,
        },
        dosage: {
          morning: {
            quantity: {
              type: Number,
            },
            remark: {
              type: String,
            },
          },
          afternoon: {
            quantity: {
              type: Number,
            },
            remark: {
              type: String,
            },
          },
          evening: {
            quantity: {
              type: Number,
            },
            remark: {
              type: String,
            },
          },
        },
        duration: {
          type: String,
        },
        total: {
          type: Number,
        },
      },
    ],
    investigations: [
      {
        investigation: {
          type: String,
        },
      },
    ],
    advices: [
      {
        advice: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Prescription = mongoose.model("prescription", prescriptionSchema);

module.exports = Prescription;
// module.exports = prescriptionSchema;