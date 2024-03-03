const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

module.exports.view_verified_doctorlist = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isVerified:true ,isSuspended:false});
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

module.exports.view_unverified_doctorlist = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isVerified:false });
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

module.exports.view_patientlist = async (req, res) => {
  try {
    const patientlist = await Patient.find();
    res.status(200).json({ patientlist });
  } catch (err) {
    console.log(err);
  }
};


// New Updated APIS
// get All Doctor List (Includind Verified and Unverified and suspended)
module.exports.getDoctorList = async (req, res) => {
  try {
    const doctorlist = await Doctor.find();
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

// get All Doctor List (Exculeded Verified and Unverified and suspended)
module.exports.getUnverifiedDoctorList = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isVerified:false });
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

// get SUspanded Doctor List
module.exports.getSuspendedDoctorList = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isSuspended:true });
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

// get verified doctor list
module.exports.getVerifiedDoctorList = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isVerified:true });
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

// get verified and not suspended doctor list
module.exports.getActiveDoctorList = async (req, res) => {
  try {
    const doctorlist = await Doctor.find({ isVerified:true ,isSuspended:false});
    res.status(200).json({ doctorlist });
  } catch (err) {
    console.log(err);
  }
};

// get All Patient List
module.exports.getPatientList = async (req, res) => {
  try {
    const patientlist = await Patient.find();
    res.status(200).json({ patientlist });
  } catch (err) {
    console.log(err);
  }
};