// register and login routes for the patient

const { Router } = require("express");
const {
  patient_register,
  patient_login,
  preview_prescription,
  get_patient,
  get_prescription_history,
  patient_forgot,
} = require("../controllers/patientControllers");

const { view_verified_doctorlist } = require("../controllers/fetchlistControllers");

const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const nodemailer = require("nodemailer");


const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");

const router = Router();

router.post("/register/patient", patient_register);
router.post("/login/patient", patient_login);
router.post("/forgotPassword/patient", patient_forgot);

router.get("/getpatient", requirePatientAuth, get_patient);
router.get("/prescription/:id", requirePatientAuth, preview_prescription);
router.get("/findDoctors", requirePatientAuth, view_verified_doctorlist);
router.get(
  "/getprescriptionhistory",
  requirePatientAuth,
  get_prescription_history
);

// router.get("/sendmail", (req, res) => {
//   console.log(path.join(__dirname, "./mail/", "patient_Registration.ejs"));
//   ejs.renderFile(path.join(__dirname, "./mail/", "patient_Registration.ejs"),
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(404).json({ error: "Something went wrong..." });
//       } else {
//         let options = {
//           height: "11.25in",
//           width: "8.5in",
//           header: {
//             height: "20mm",
//           },
//           footer: {
//             height: "20mm",
//           },
//         };
//         pdf.create(data, options).toFile("Test.pdf", function (err, data) {
//           if (err) {
//             console.log(err);

//             res.status(404).json({ error: "Something went wrong..." });
//           } else {
//             console.log("File");

//             res.send("File Created Successfully");

//             let transport = nodemailer.createTransport({
//               // host: "smtp.ethereal.email",
//               host: "smtp.gmail.com",
//               port: 587,
//               secure: false, // true for 465, false for other ports
//               auth: {
//                 user: "efarm.help.sys@gmail.com", // generated ethereal user
//                 pass: "cjcgeyxycfunekhy", // generated ethereal password
//               },
//             });
//             let mailDetails = {
//               from: '"Digital Health Record" <DHR@gmail.com>', // sender address
//               to: "gandhijay126@gmail.com", // list of receivers
//               subject: "Welcome TO Digital Health!!", // Subject line
//               text: `Your Health ID : 123456789012`, // plain text body
//               html: `Your Health ID :<b>123456789012</b>`, // html body
//               attachments: [
//                 {
//                   path: data.filename,
//                 },
//               ],
//             };
//             transport.sendMail(mailDetails, function (err, data) {
//               if (err) {
//                 console.log("Error Occurs");
//                 console.log(err);
//               } else {
//                 console.log("Email Send Successfully");
//               }
//             });
//           }
//         });
//       }
//     }
//   );
// });

module.exports = router;
