const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
// const fileupload = require("express-fileupload");
const { createToken,createForgotPasswordToken } = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

const maxAge = 3 * 24 * 60 * 60;
const handleError = (err, healthID) => {
  let errors = {};

  // incorrect email
  if (err.message === "Invalid HealthID") {
    // console.log(healthID);
    if (healthID.length !== 12) {
      errors.healthID = "HealthID must be 12 Digits";
    } else {
      errors.healthID = "That HealthID is not registered";
    }
  }

  // incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.healthID = "This AdharCard is already Registerd on System.";
    return errors;
  }

  // if (err.message.includes("patient validation failed")) {
  //   let errorsarray = Object.values(err.errors);
  //   errorsarray.forEach(({ properties }) => {
  //     if (!properties?.path?.includes(".")) {
  //       errors[properties?.path] = properties?.message;
  //     }
  //   });
  //   console.log(errorsarray)
  // }

  if (err.message.includes("patient validation failed")) {
    errors = "Please fill al the fields";
    return errors;
  }
  return errors;
};

const sendMail = async (BasicInformation, healthID, subject) => {
  // connect with SMTP
  let transport = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "efarm.help.sys@gmail.com", // generated ethereal user
      pass: "cjcgeyxycfunekhy", // generated ethereal password
    },
  });
  ejs.renderFile(
    path.join(__dirname, "/../mail/", "NewPatientRegister.ejs"),
    { BasicInformation: BasicInformation, healthID: healthID },
    {},
    (err, str) => {
      // str => Rendered HTML string
      let info = {
        from: '"Digital Health Record" <DHR@gmail.com>', // sender address
        to: BasicInformation.email, // list of receivers
        subject: subject, // Subject line
        // text: `Your Health ID : 123456789012`, // plain text body
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

module.exports.patient_register = async (req, res) => {
  var obj = JSON.parse(req.body.data);
  // let testAccount = await nodemailer.createTestAccount();

  const {
    BasicInformation,
    AddressInformation,
    HealthInformation,
    EmergencyContactDetails,
    setPassword,
  } = obj;

  const diseases = Object.values(HealthInformation.diseaseList);
  // console.log(diseases)
  const healthID = BasicInformation.aadhaarCard;
  try {
    const patient = await Patient.create({
      healthID,
      BasicInformation,
      AddressInformation,
      HealthInformation,
      "HealthInformation.diseases": diseases,
      EmergencyContactDetails,
      setPassword,
    });
    console.log(BasicInformation.email, healthID);
    sendMail(BasicInformation, healthID, "Welcome To Digital Health!"),
      console.log("PATIENT", patient);
    const token = createToken(patient._id);
    res.cookie("jwtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ patient });
  } catch (err) {
    console.log(err);
    console.log(err.message.includes("patient validation failed"));
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};

module.exports.patient_login = async (req, res) => {
  const { healthID, password } = req.body;
  try {
    const patient = await Patient.login(healthID, password);
    const token = createToken(patient._id);
    // console.log("Token : " , token);
    res.cookie("jwtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ patient });
  } catch (err) {
    // console.error(err);
    const errors = handleError(err, healthID);
    res.status(404).json({ errors });
  }
};

const forgotLinkMail = async (BasicInformation, link) => {
  // connect with SMTP
  let transport = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "efarm.help.sys@gmail.com", // generated ethereal user
      pass: "cjcgeyxycfunekhy", // generated ethereal password
    },
  });
  ejs.renderFile(
    path.join(__dirname, "/../mail/", "ForgotPassword.ejs"),
    { BasicInformation: BasicInformation, link: link },
    {},
    (err, str) => {
      // str => Rendered HTML string
      let info = {
        from: '"Digital Health Record" <DHR@gmail.com>', // sender address
        to: BasicInformation.email, // list of receivers
        subject: "Forgot password!!!", // Subject line
        // text: `Your Health ID : 123456789012`, // plain text body
        html: str, // html body
      };
      // console.log("Message sent: %s", info);

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

module.exports.patient_forgot = async (req, res) => {
  const { username } = req.body;
  console.log(username)
  try {
    const patient = await Patient.findOne({ "healthID": username });
    if (patient) {
      const token = createForgotPasswordToken(patient._id);
      // console.log(token);
      const link = `http://localhost:3000/ResetPassword/Patient/${patient._id}/${token}`;
      console.log(link);
      forgotLinkMail(patient.BasicInformation, link);
      res
        .status(200)
        .json({ msg: "Password reset link has been sent to you email!!" });
    } else {
      res.status(404).json({ errors: "Invalid HealthID" });
    }
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors: "Invalid HealthID" });
  }
};

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;
  const prescriptions = await Prescription.find({ healthID: patient.healthID });
  res.status(200).json({ patient, prescriptions });
};

module.exports.get_prescription_history = async (req, res) => {
  if (req.cookies.jwtoken) {
    const token = req.cookies.jwtoken;
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          res.status(401).send({ errors: "Proceed to login" });
        } else {
          const patient = await Patient.findById(decodedToken.id);
          const prescriptions = await Prescription.find({
            healthID: patient.healthID,
          });
          // console.log(prescriptions.healthID)
          // const patient = await Patient.find();
          if (patient) {
            res.status(200).send({ prescriptions });
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

module.exports.preview_prescription = async (req, res) => {
  const id = req.params.id;
  const healthID = req.patient.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};
