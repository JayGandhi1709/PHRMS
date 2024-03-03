const Admin = require("../models/admin");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const { createToken } = require("../utils/createToken");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
const Prescription = require("../models/prescription");

const handleError = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("Invalid Email.")) {
    errors.email = "Please enter a valid Email.";
  }
  if (err.message.includes("Incorrect Password")) {
    errors.password = "Incorrect password";
  }
  if (err.message.includes("Please enter email")) {
    errors.email = "Please enter email";
  }
  if (err.message.includes("Please enter a valid email")) {
    errors.email = "Please enter a valid email";
  }
  if (err.message.includes("Please enter password")) {
    errors.password = "Please enter password";
  }
  return errors;
};

module.exports.admin_login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const admin = await Admin.login(email, password);
    // console.log(admin);
    const token = createToken(admin._id);
    // console.log(token);
    res.cookie("jwtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ admin });
  } catch (err) {
    // console.log(err)
    const errors = handleError(err);
    // console.log(errors)
    res.status(400).json({ errors });
  }
};

module.exports.auth = async (req, res) => {
  if (req.cookies.jwtoken) {
    const token = req.cookies.jwtoken;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          res.status(401).send({ errors: "Proceed to login" });
        } else {
          const admin = await Admin.findById(decodedToken.id);
          const patient = await Patient.findById(decodedToken.id);
          const doctor = await Doctor.findById(decodedToken.id);
          if (admin) {
            res.status(200).send({ msg: "admin" });
          }
          if (patient) {
            res.status(200).send({ msg: "patient" });
          }
          if (doctor) {
            res.status(200).send({ msg: "doctor" });
          }
        }
      });
    } else {
      res.status(401).send({ errors: "Proceed to login" });
    }
  } else {
    res.status(401).send({ errors: "Proceed to login" });
  }
};

module.exports.get_admin = async (req, res) => {
  let admin = req.Admin;
  res.status(200).json({ admin });
};

const sendMail = async (doctor, subject) => {
  // connect with SMTP
  let transport = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: proccess.env.GMAIL_ID, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });
  ejs.renderFile(
    path.join(__dirname, "/../mail/", "DoctorsRequest.ejs"),
    { doctor: doctor },
    {},
    (err, str) => {
      // str => Rendered HTML string
      let info = {
        from: '"Digital Health Record" <DHR@gmail.com>', // sender address
        to: doctor.BasicInformation.email, // list of receivers
        subject: subject, // Subject line
        // text: `Your Approval`, // plain text body
        html: str, // html body
      };
      console.log("Message sent: %s", info.messageId);

      transport.sendMail(info, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          console.log(err);
        } else {
          console.log("Email Send Successfully");
        }
      });
    }
  );
};

module.exports.doctor_approval = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Doctor.updateOne(
      { _id: id },
      { $set: { isVerified: true } }
    );

    const doctor = await Doctor.findOne({ _id: id });
    // console.log("doctor", doctor);

    sendMail(doctor, "Registration approved!");
    // console.log("DOCTOR", doctor);

    res.status(200).send({ msg: "Approved" });

    // console.log(approved);
  } catch (e) {
    // console.log("error");
    res.status(500).send({ errors: "Error" });
  }
};

module.exports.doctor_rejected = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findOne({ _id: id });
    // console.log("doctor", doctor);

    sendMail(doctor, "Registration rejected!");
    //  console.log("DOCTOR", doctor);

    const rejected = await Doctor.deleteOne({ _id: id });
    res.status(200).send({ msg: "Rejected!!" });
    // console.log(rejected);
  } catch (e) {
    // console.log("error");
    res.status(500).send({ errors: "Error" });
  }
};

module.exports.search_doctor = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const doctor = await Doctor.findOne({ _id: id });
    // console.log(doctor);
    res.status(200).send({ doctor });
  } catch (e) {
    // console.log(e);
    res.status(500).send({ errors: "Error" });
  }
};


module.exports.get_genders = async (req, res) => {
  let admin = await Admin.find({});
  let doctor = await Doctor.find({});
  let patient = await Patient.find({});
  let prescription = await Prescription.find({});

  const obj = {
    doctor: {
      male: doctor.filter(
        (doc) =>
          doc.BasicInformation.gender === "Male" && doc.isVerified === true
      ).length,
      female: doctor.filter(
        (doc) =>
          doc.BasicInformation.gender === "Female" && doc.isVerified === true
      ).length,
      other: doctor.filter(
        (doc) =>
          doc.BasicInformation.gender === "Other" && doc.isVerified === true
      ).length,
      verifiedDoctors: doctor.filter((doc) => doc.isVerified === true).length,
      unverifiedDoctors: doctor.filter((doc) => doc.isVerified === false)
        .length,
      total: doctor.length,
    },
    patient: {
      male: patient.filter((pat) => pat.BasicInformation.gender === "Male")
        .length,
      female: patient.filter((pat) => pat.BasicInformation.gender === "Female")
        .length,
      other: patient.filter((pat) => pat.BasicInformation.gender === "Other")
        .length,
      total: patient.length,
    },
    prescription: {
      total: prescription.length,
    }
  };
  // console.log(obj)
  res.status(200).json({ obj });
};
