const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");

module.exports.appointmentController = {
  bookAppointment: async (req, res) => {
    // console.log(req.body);
    try {
      const { doctorID, date, time, charge } = req.body;
      const patientID = req.patient._id;
      const appointment = await Appointment.create({
        doctorID,
        patientID,
        date,
        time,
        charge,
        status: "pending",
      });
      // await appointment.save();
      res.status(200).json({ appointment, success: true });
    } catch (error) {
      res.status(400).send({ error: error.message, success: false });
    }
  },

  getAppointmentsPatients: async (req, res) => {
    try {
      const patientID = req.patient._id;
      // const appointments = await Appointment.find({ patientID });
      
    

      // i want to get appointments from that according to doctor id i want to get doctor name from doctor model
      const appointmentDetailslist = await Appointment.aggregate([
        { $match: { patientID } },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorID",
            foreignField: "_id",
            as: "doctor",
          },
        },
        { $unwind: "$doctor" },
        {
          $project: {
            _id: 1,
            doctorID: 1,
            patientID: 1,
            date: 1,
            time: 1,
            charge: 1,
            status: 1,
            doctorName: "$doctor.BasicInformation.name",
            hospitalDetails: "$doctor.HospitalInformation",
          },
        },
      ]);
      // 

      // console.log(appointmentDetailslist);
      res.status(200).json({ appointments:appointmentDetailslist, success: true });
    } catch (error) {
      res.status(400).send({ error: error.message, success: false });
    }
  },
  
  getAppointmentsDoctors: async (req, res) => {
    try {
      const doctorID = req.doctor._id;
      
      // i want to get appointments from that according to patient id i want to get patient name from patient model
      const appointmentDetailslist = await Appointment.aggregate([
        { $match: { doctorID } },
        {
          $lookup: {
            from: "patients",
            localField: "patientID",
            foreignField: "_id",
            as: "patient",
          },
        },
        { $unwind: "$patient" },
        {
          $project: {
            _id: 1,
            doctorID: 1,
            patientID: 1,
            date: 1,
            time: 1,
            charge: 1,
            status: 1,
            healthID: "$patient.healthID",
            patientDetails: "$patient.BasicInformation",
          },
        },
      ]);

      res.status(200).json({ appointments:appointmentDetailslist, success: true });
    } catch (error) {
      res.status(400).send({ error: error.message, success: false });
    }
  },


  updateAppointmentStatus: async (req, res) => {
    try {
      const status = req.params.status;
      const appointment = await Appointment.findOneAndUpdate(
        { _id: req.body.appointmentID },
        { status: status }
      );
      res.status(200).json({ appointment, success: true });
    } catch (error) {
      res.status(400).send({ error: error.message, success: false });
    }
  }


};
