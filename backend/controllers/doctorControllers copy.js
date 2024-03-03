const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const fileupload = require("express-fileupload");
const {
  createToken,
  createForgotPasswordToken,
} = require("../utils/createToken");
const Prescription = require("../models/prescription");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

const maxAge = 3 * 24 * 60 * 60;
const handleError = (err) => {
  let errors = {};

  console.error(err.message);
  // incorrect email
  if (err.message === "Invalid email") {
    // errors = "That Email is not registered";
    errors.email = "That Email is not registered";
  }

  if (err.message === "Please enter email") {
    // errors = "Please Enter registered email";
    errors.email = "Please Enter registered email";
  }

  if (err.message === "Not verified") {
    errors = "Wait till your request is approved";
  }

  // incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors = "This Aadhaar Card is already Registerd on System.";
    // errors.aadhaarcard = "This Aadhaar Card is already Registerd on System.";
    return errors;
  }

  // if (err.code === 11000 && err.keyValue === 'BasicInformation.aadhaarcard') {
  //   errors = "This Aadhaar Card is already Registerd on System.";
  //   // errors.aadhaarcard = "This Aadhaar Card is already Registerd on System.";
  //   return errors;
  // }
  if (err.code === 11000) {
    errors = "This Aadhaar Card is already Registerd on System.";
    // errors.aadhaarcard = "This Aadhaar Card is already Registerd on System.";
    return errors;
  }

  if (err.message.includes("doctor validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      if (!properties.path.includes(".")) {
        errors[properties.path] = properties.message;
      }
    });
  }
  return errors;
};

const sendMail = async (BasicInformation, subject) => {
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
    path.join(__dirname, "/../mail/", "NewDoctorRegistration.ejs"),
    { BasicInformation: BasicInformation },
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

module.exports.doctor_register = async (req, res) => {
  // console.log(req.body.data);
  // console.log(req.files);
  var obj = JSON.parse(req.body.data);

  const {
    BasicInformation,
    AddressInformation,
    HospitalInformation,
    EducationInformation,
    setPassword,
  } = obj;

  const specialization = Object.values(EducationInformation.specializationList);
  // console.log("EUD", specialization);
  const education = Object.values(EducationInformation.educationList);
  // console.log("EUD", education);

  const isVerified = false;
  // console.log(Object.values(obj.EducationInformation.educationList));

  let doctorEmailExists = await Doctor.findOne({
    "BasicInformation.email": BasicInformation.email,
  });
  // console.log(BasicInformation.email);
  // console.log(doctorEmailExists?.BasicInformation?.email);

  let doctorAadhaarExists = await Doctor.findOne({
    "BasicInformation.aadhaarCard": BasicInformation.aadhaarCard,
  });
  // console.log(BasicInformation.aadhaarCard);
  // console.log(doctorAadhaarExists?.BasicInformation?.aadhaarCard);

  if (doctorEmailExists) {
    res.status(404).json({ errors: "Email Already Exist!!" });
  } else if (doctorAadhaarExists) {
    res.status(404).json({ errors: "Aadhaar Card Already Exist!!" });
  } else {
    try {
      if (req.files) {
        let file = req.files;
        if (typeof file.doc.name === "undefined") {
          for (let [key] of Object.keys(file.doc)) {
            // console.log();
            file.doc[key].mv(
              "./../frontend/src/Assets/uploads/" +
                "(" +
                key +
                ")__" +
                BasicInformation.aadhaarCard +
                "__" +
                file.doc[key].name
            );
            try {
              obj.EducationInformation.educationList[key].doc =
                file.doc[key].name;
            } catch (e) {
              res.status(404).json({
                errors: "Something went wrong!Please try again later!!",
              });
            }
          }
        } else {
          for (const [key] of Object.keys(file)) {
            file.doc.mv(
              "./../frontend/src/Assets/uploads/" +
                "(" +
                key.length +
                ")__" +
                BasicInformation.aadhaarCard +
                "__" +
                file.doc.name
            );
            try {
              obj.EducationInformation.educationList[0].doc = file.doc.name;
            } catch (e) {
              res.status(404).json({
                errors: "Something went wrong!Please try again later!!",
              });
            }
          }
        }
        // console.log(EducationInformation.educationList)
        // console.log("files uploaded");
      } else {
        res.status(404).json({ errors: "Upload Education Documents!!" });
      }

      const doctor = await Doctor.create({
        BasicInformation,
        AddressInformation,
        HospitalInformation,
        EducationInformation,
        "EducationInformation.specialization": specialization,
        "EducationInformation.education": education,
        setPassword,
        isVerified,
      });

      sendMail(BasicInformation, "Welcome To Digital Health!");
      // console.log("DOCTOR", doctor);

      const token = createToken(doctor._id);
      res.cookie("jwtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });
      // res.json({ message: "doctor"});
      res.status(200).json({ doctor });
    } catch (err) {
      // console.log(err);
      const errors = handleError(err);
      // console.log(errors);
      // res.json({ message: "errors"});
      res.status(404).json({ errors });
    }
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    const token = createToken(doctor._id);
    res.cookie("jwtoken", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ doctor });
  } catch (err) {
    const errors = handleError(err);
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

module.exports.doctor_forgot = async (req, res) => {
  const { username } = req.body;
  try {
    const doctor = await Doctor.findOne({ "BasicInformation.email": username });
    if (doctor) {
      const token = createForgotPasswordToken(doctor._id);
      // console.log(token);
      const link = `http://localhost:3000/ResetPassword/Doctor/${doctor._id}/${token}`;
      console.log(link);
      forgotLinkMail(doctor.BasicInformation, link);
      res
        .status(200)
        .json({ msg: "Password reset link has been sent to you email!!" });
    } else {
      res.status(404).json({ errors: "Invalid email" });
    }
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors: "Invalid email" });
  }
};

module.exports.reset_user_valid = async (req, res) => {
  const { userType, id, token } = req.params;

  try {
    const validUser =
      userType === "Patient"
        ? await Patient.findOne({ _id: id })
        : await Doctor.findOne({ _id: id });

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (validUser && verifyToken.id) {
      res.status(200).json({ status: 200, validUser });
    } else {
      res.status(404).json({ status: 404, errors: "Invalid User" });
    }
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors: "Link is expried!!" });
  }
};

module.exports.reset_password = async (req, res) => {
  var { password } = req.body;
  const { userType, id, token } = req.params;
  try {
    const validUser =
      userType === "Patient"
        ? await Patient.findOne({ _id: id })
        : await Doctor.findOne({ _id: id });

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(verifyToken);

    if (validUser && verifyToken.id) {
      const auth = await bcrypt.compare(
        password,
        validUser.setPassword.password
      );
      if (auth) {
        res.status(404).json({
          status: 404,
          same: "You cannot set old password as a new password",
        });
      } else {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const update =
          userType === "Patient"
            ? await Patient.findByIdAndUpdate(
                { _id: id },
                { "setPassword.password": password }
              )
            : await Doctor.findByIdAndUpdate(
                { _id: id },
                { "setPassword.password": password }
              );
        res
          .status(200)
          .json({ status: 200, msg: "Password Successfully Chnaged!!!" });
      }
    } else {
      res.status(404).json({ status: 404, errors: "Link is expried!!" });
    }
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors: "Link is expried!!" });
  }
};

module.exports.search_patient = async (req, res) => {
  const healthID = req.params.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescriptions = await Prescription.find({ healthID });
    // console.log(prescriptions);
    res.status(200).json({ patient, prescriptions });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.search_patient_precription = async (req, res) => {
  const healthID = req.params.healthID;
  const doctoremail = req.params.doctoremail;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescriptions = await Prescription.find({ healthID, doctoremail });
    // console.log(prescriptions);
    res.status(200).json({ patient, prescriptions });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.get_patient_history = async (req, res) => {
  // console.log("Hello")
  if (req.cookies.jwtoken) {
    const token = req.cookies.jwtoken;
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          res.status(401).send({ errors: "Proceed to login" });
        } else {
          const doctor = await Doctor.findById(decodedToken.id);
          const prescriptions = await Prescription.find({
            doctoremail: doctor.BasicInformation.email,
          });
          // console.log(prescriptions.healthID)
          const patient = await Patient.find();
          if (doctor) {
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

module.exports.get_doctor = async (req, res) => {
  let doctor = req.doctor;
  // console.log("doctor", doctor);
  res.status(200).json({ doctor });
};

module.exports.get_patient_list = async (req, res) => {
  let doctoremail = req.params.doctoremail;

  const list = await Prescription.aggregate([
    { $match: { doctoremail } },
    {
      $group: {
        _id: "$healthID",
        details: { $first: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    { $project: { details: "$details", total: "$count" } },
  ]);
  // console.log(list);

  //   const list = await Prescription.aggregate([
  //     {"$group" : { "_id": {doctoremail:"$doctoremail", healthID:"$healthID"}, "count": { "$sum": 1 } } },
  // ])
  res.status(200).json({ list });
};
