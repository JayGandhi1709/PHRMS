const express = require('express');
const { requirePatientAuth } = require('../middlewares/patientAuthMiddleware');
const { requireDoctorAuth } = require('../middlewares/doctorAuthMiddleware');
const { appointmentController } = require('../controllers/appointmentController');
const router = express.Router();

// post - /bookAppointment
router.post('/bookAppointment', requirePatientAuth,appointmentController.bookAppointment);
router.patch('/updateAppointmentStatus/:status',appointmentController.updateAppointmentStatus);
router.get('/getAppointmentsPatients', requirePatientAuth,appointmentController.getAppointmentsPatients);
router.get('/getAppointmentsDoctors', requireDoctorAuth,appointmentController.getAppointmentsDoctors);


module.exports = router;
