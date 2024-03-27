const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

const requirePatientAuth = async (req, res, next) => {
  console.log("Patient Auth MiddleWare : ",req.cookies);
  if (req.cookies.jwtoken) {
    const token = req.cookies.jwtoken;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          let AuthError = { error: "Patient is not authenticated!" };
          res.status(401).send({ AuthError });
        } else {
          const patient = await Patient.findById(decodedToken.id);
          // console.log(patient);
          if (patient) {
            req.patient = patient;
            next();
          } else {
            console.log(err);
            let AuthError = { error: "Patient is not authenticated!" };
            res.status(401).send({ AuthError });
          }
        }
      });
    } else {
      let AuthError = { error: "Patient is not authenticated!" };
      // console.log(AuthError);
      res.status(401).send({ AuthError });
    }
  } else {
    let AuthError = { error: "Patient is not authenticated!" };
    // console.log(AuthError);
    res.status(401).send({ AuthError });
  }
};

module.exports = { requirePatientAuth };
