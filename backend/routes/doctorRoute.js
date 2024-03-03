const { Router } = require("express");
const { requireDoctorAuth } = require("../middlewares/doctorAuthMiddleware");
const {
  doctor_login,
  doctor_register,
  doctor_forgot,
  reset_password,
  reset_user_valid,
  get_doctor,
  search_patient,
  get_patient_history,
  get_patient_list,
  search_patient_precription,
} = require("../controllers/doctorControllers");
const {
  add_prescription,
  view_prescription,
} = require("../controllers/prescriptionControllers");

const router = Router();

router.post("/register/doctor", doctor_register);
router.post("/login/doctor", doctor_login);
router.post("/prescription/:healthID", requireDoctorAuth, add_prescription);
router.post("/forgotPassword/doctor", doctor_forgot);
router.post("/resetPassword/:userType/:id/:token", reset_password);

router.get("/resetPassword/:userType/:id/:token", reset_user_valid);

router.get("/searchpatient/:healthID", requireDoctorAuth, search_patient);
router.get(
  "/searchpatientprecription/:healthID/:doctoremail",
  requireDoctorAuth,
  search_patient_precription
);
router.get("/viewprescription/:id", requireDoctorAuth, view_prescription);
router.get("/getdoctor", requireDoctorAuth, get_doctor);
router.get("/getpatienthistory", requireDoctorAuth, get_patient_history);
router.get("/getpatientlist/:doctoremail", requireDoctorAuth, get_patient_list);

module.exports = router;
