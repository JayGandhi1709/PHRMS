const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const nodemailer = require("nodemailer");

const convertDatetoString = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const sendMail = async (prescription, patient, subject) => {
  console.log(path.join(__dirname, "/../mail/", "prescription.ejs"));
  ejs.renderFile(
    path.join(__dirname, "/../mail/", "prescription.ejs"),
    {
      prescription: prescription,
      patient: patient,
      date: convertDatetoString(prescription.createdAt),
    },
    (err, data) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong...");
      } else {
        let options = {
          height: "11.25in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };
        pdf.create(data, options).toFile("Test.pdf", function (err, data) {
          if (err) {
            console.log(err);

            console.log("Something went wrong...");
          } else {
            console.log("File");
            console.log("File Created Successfully");

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
              path.join(__dirname, "/../mail/", "AddPrescriptionMail.ejs"),
              {
                prescription: prescription,
                patient: patient,
                date: convertDatetoString(prescription.createdAt),
              },
              {},
              (err, str) => {
                // str => Rendered HTML string
                let mailDetails = {
                  from: '"Digital Health Record" <DHR@gmail.com>', // sender address
                  to: patient.BasicInformation.email, // list of receivers
                  subject: subject, // Subject line
                  // text: `Your Health ID : 123456789012`, // plain text body
                  html: str, // html body
                  attachments: [
                    {
                      path: data.filename,
                    },
                  ],
                };
                transport.sendMail(mailDetails, function (err, data) {
                  if (err) {
                    console.log("Error Occurs");
                    console.log(err);
                  } else {
                    console.log("Email Send Successfully");
                  }
                });
              }
            );
          }
        });
      }
    }
  );
};

module.exports.add_prescription = async (req, res) => {
  const healthID = req.params.healthID;
  const patient = await Patient.findOne({ healthID });
  const patientName =
    patient.BasicInformation.name.firstName +
    " " +
    patient.BasicInformation.name.lastName;
  const chiefComplaints = Object.values(req.body.chiefComplaints);
  const medicines = Object.values(req.body.medicines);
  const investigations = Object.values(req.body.investigations);
  const advices = Object.values(req.body.advices);
  const notes = req.body.notes.note;
  const diagnosis = req.body.diagnosis.diagno;
  const procedureConducted = req.body.procedureConducted.procedure;
  const { doctor, doctormobile, doctoremail, hospital } = req.body;

  try {
    const prescription = await Prescription.create({
      doctor,
      doctormobile,
      doctoremail,
      healthID,
      patientName,
      hospital,
      notes,
      diagnosis,
      procedureConducted,
      chiefComplaints,
      medicines,
      investigations,
      advices,
    });
    sendMail(prescription, patient, `Your Prescription by Dr. ${prescription.doctor} at ${prescription.hospital.name}`);
    res.status(200).json({ prescription });
  } catch (err) {
    console.log("ERROR", err);
    res.status(404).json({ msg: "Something Went Wrong!" });
  }
};

module.exports.view_prescription = async (req, res) => {
  const healthID = req.params.healthID;
  const id = req.params.id;
  try {
    // const patient = await Patient.findOne({ healthID });
    // const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    const prescription = await Prescription.findOne({ _id: id });
    // console.log(prescription)
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: "Something Went Wrong" });
  }
};
