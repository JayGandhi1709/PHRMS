const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Admin = require("../models/admin");

const requireAuth = async (req, res, next) => {
  try {
    console.log("Auth : ",req.cookies)
    if (req.cookies.jwtoken) {
      const token = req.cookies.jwtoken;
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
          if (err) {
            throw new Error("User is not authenticated!");
          } else {
            if (decodedToken.role === "patient") {
              const patient = await Patient.findById(decodedToken.id);
              if (patient) {
                req.user = patient; // Attach patient object to request
                req.userType = "patient"; // Set user type to patient
                next();
              } else {
                throw new Error("Patient not found!");
              }
            } else if (decodedToken.role === "doctor") {
              const doctor = await Doctor.findById(decodedToken.id);
              if (doctor) {
                req.user = doctor; // Attach doctor object to request
                req.userType = "doctor"; // Set user type to doctor
                next();
              } else {
                throw new Error("Doctor not found!");
              }
            } else if (decodedToken.role === "admin") {
              const admin = await Admin.findById(decodedToken.id);
              if (admin) {
                req.user = admin; // Attach doctor object to request
                req.userType = "admin"; // Set user type to doctor
                next();
              } else {
                throw new Error("Doctor not found!");
              }
            } else {
              throw new Error("Invalid user role!");
            }
          }
        });
      } else {
        throw new Error("User is not authenticated!");
      }
    } else {
      throw new Error("User is not authenticated!");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


module.exports = { requireAuth };