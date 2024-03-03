const express = require('express');
const { requirePatientAuth } = require('../middlewares/patientAuthMiddleware');
const { requireDoctorAuth } = require('../middlewares/doctorAuthMiddleware');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// createSearchNotification
router.post('/createSearchNotification/:healthID',requireDoctorAuth,notificationController.createSearchNotification)

// GET all notifications
router.get('/getAllNotifications', requirePatientAuth,notificationController.getAllNotifications);

// GET a specific notification by ID
router.get('/getUserNotifications', requirePatientAuth,notificationController.getNotificationById);
router.get('/getUserReadNotifications', requirePatientAuth,notificationController.getReadNotificationById);

// POST a new notification
router.post('/notifications', (req, res) => {
  // Your code here
});

// PUT/update a notification by ID
router.patch('/markUserNotificationAsRead',requirePatientAuth,notificationController.markUserNotificationAsRead);


module.exports = router;
