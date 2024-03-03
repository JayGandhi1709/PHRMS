const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

module.exports.delete_doctor = async (req, res) => {
  const id = req.params.id;
  try {
    // const result = await Doctor.findByIdAndDelete({ _id: id });
    
    res.status(200).json({ msg:"result" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.suspend_doctor = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Doctor.updateOne(
      { _id: id },
      { $set: { isSuspended: true } }
    );

    const doctor = await Doctor.findOne({ _id: id });
    // console.log("doctor", doctor);

    // sendMail(doctor, "Registration approved!");
    // console.log("DOCTOR", doctor);

    res.status(200).send({ msg: "Approved" });

    // console.log(approved);
  } catch (e) {
    // console.log("error");
    res.status(500).send({ errors: "Error" });
  }
};

module.exports.unsuspend_doctor = async (req, res) => {
  try {
    const { id } = req.params;

    const approved = await Doctor.updateOne(
      { _id: id },
      { $set: { isSuspended: false } }
    );

    const doctor = await Doctor.findOne({ _id: id });
    // console.log("doctor", doctor);

    // sendMail(doctor, "Registration approved!");
    // console.log("DOCTOR", doctor);

    res.status(200).send({ msg: "Approved" });

    // console.log(approved);
  } catch (e) {
    // console.log("error");
    res.status(500).send({ errors: "Error" });
  }
};

module.exports.delete_patient = async (req, res) => {
  const healthID = req.params.healthID;
  console.log(healthID);
  try {
    const result = await Patient.findOneAndDelete({ healthID });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }
};


