const express = require("express");
const router = express.Router();
const {
  admin_login,
  auth,
  get_admin,
  get_genders,
  doctor_approval,
  doctor_rejected,
  search_doctor,
} = require("../controllers/adminControllers");

const { search_patient } = require("../controllers/doctorControllers");
const {
  delete_doctor,
  suspend_doctor,
  unsuspend_doctor,
  delete_patient,
} = require("../controllers/deleteControllers");
const {
  view_patientlist,
  view_verified_doctorlist,
  view_unverified_doctorlist,
  getActiveDoctorList,
  getVerifiedDoctorList,
  getSuspendedDoctorList,
  getUnverifiedDoctorList,
  getDoctorList,
  getPatientList,
} = require("../controllers/fetchlistControllers");
const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");

router.get("/auth", auth);
router.post("/login/admin", admin_login);

router.get("/getadmin", requireAdminAuth, get_admin);
router.get("/searchdoctor/:id", requireAdminAuth, search_doctor);
router.get("/getPatientDetails/:healthID", requireAdminAuth, search_patient);
router.get("/getGenderRatio", requireAdminAuth, get_genders);

router.delete("/deletedoctor/:id", requireAdminAuth, delete_doctor);
router.patch("/suspenddoctor/:id", requireAdminAuth, suspend_doctor);
router.patch("/unsuspenddoctor/:id", requireAdminAuth, unsuspend_doctor);
router.delete("/deletepatient/:healthID", requireAdminAuth, delete_patient);

router.get("/verifieddoctorlist", requireAdminAuth, view_verified_doctorlist);
router.get(
  "/unverifieddoctorlist",
  requireAdminAuth,
  view_unverified_doctorlist
);
// get patient List
router.get("/patientlist", requireAdminAuth, view_patientlist);

// for doctor approval and rejection
router.patch("/approval/:id", requireAdminAuth, doctor_approval);
router.delete("/rejected/:id", requireAdminAuth, doctor_rejected);

// api for suspend and unsuspend Doctor
router.patch("/suspendDoctor/:id", requireAdminAuth, suspend_doctor);
router.patch("/unsuspendDoctor/:id", requireAdminAuth, unsuspend_doctor);


// api for delete patient
router.delete("/deletePatient/:healthID", requireAdminAuth, delete_patient);

// api for delete doctor
router.delete("/deleteDoctor/:id", requireAdminAuth, delete_doctor);



// New Updated APIS
// get All Doctor List (Includind Verified and Unverified and suspended)
router.get("/getDoctorList", requireAdminAuth, getDoctorList);
// get All Doctor List (Exculeded Verified and Unverified and suspended)
router.get("/getUnverifiedDoctorList", requireAdminAuth, getUnverifiedDoctorList);
// get SUspanded Doctor List
router.get("/getSuspendedDoctorList", requireAdminAuth, getSuspendedDoctorList);
// get verified doctor list
router.get("/getVerifiedDoctorList", requireAdminAuth, getVerifiedDoctorList);
// get verified and not suspended doctor list
router.get("/getActiveDoctorList", requireAdminAuth, getActiveDoctorList);



// get Patient List
router.get("/getPatientList", requireAdminAuth, getPatientList);


module.exports = router;
