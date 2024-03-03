// Import the necessary modules and models
const Notification = require("../models/notification");
const Patient = require("../models/patient");

// Controller methods
const notificationController = {
  // Get all notifications
  getAllNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getNotificationById: async (req, res) => {
    try {
      const notifications = await Notification.find({
        userId: req.patient._id,
        seen: false,
      });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getReadNotificationById: async (req, res) => {
    try {
      const notifications = await Notification.find({
        userId: req.patient._id,
        seen: true,
      });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new notification
  createSearchNotification: async (req, res) => {
    const healthID = req.params.healthID;
    try {
      const patient = await Patient.findOne({ healthID });

      await Notification.create({
        user: patient._id,
        doctor: req.doctor._id,
        message: `Dr.${req.doctor.BasicInformation.name.firstName} ${req.doctor.BasicInformation.name.lastName} Have searched your health record`,
      });

      // console.log(prescriptions);
      res.status(200).json({ message: "Notfication Sent!" });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong..." });
    }
  },

  // Update a notification
  updateNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, message } = req.body;
      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { title, message },
        { new: true }
      );
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a notification
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      await Notification.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Update notificationSeen for all notifications that are not seen for a specific patient
  markUserNotificationAsRead: async (req, res) => {
    try {
      const patientId = req.params._id;
      await Notification.updateMany({ patientId, seen: false }, { seen: true });
      res.status(200).json({ message: "Notification seen status updated" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = notificationController;
