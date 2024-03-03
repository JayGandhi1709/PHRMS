import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BACKENDURL } from "../../App";


const CssTextField = styled(TextField,TimePicker)({
  "& label": {
    color: "var(--heading-color)",
  },
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--heading-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundImage: "var(--card-bg)",
    // backgroundColor: "var(--body-bg)",
    color: "var(--heading-color)",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogContent-dividers": {
    borderColor: "rgba(0, 0, 0, 0.12)",
    // borderColor: "var(--heading-color)",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const BookingPopup = (props) => {
  const [errors, setErrors] = useState({ date: false, time: false });
  const { doctor, bookingPopup, setBookingPopup } = props;

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState();
  let charge = doctor.consultationFee;

  const handleClickOpen = () => {
    setBookingPopup(true);
  };

  const handleClose = () => {
    // setErr(false);
    setBookingPopup(false);
  };

  const bookAppointment = async () => {
    if (selectedDate === "" && selectedTime === "") {
      setErrors({ date: true, time: true });
    } else if (selectedDate === "") {
      setErrors({ date: true, time: false });
    } else if (selectedTime === "") {
      setErrors({ date: false, time: true });
    } else {
      console.log(selectedDate, selectedTime, charge, doctor);
      const res = await fetch(`${BACKENDURL}/bookAppointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          doctorID: doctor.id,
          charge: charge,
          date: selectedDate,
          time: selectedTime,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
      } else {
        console.log(data);
        setBookingPopup(false);
        props.settoastCondition({
          status: "success",
          message: "Appointment Booked Successfully",
        });
        props.setToastShow(true);
      }
    }
    // console.log("Mark as read");
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={bookingPopup}
        maxWidth={"xs"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          // className="text-heading bg-body_bg"
          onClose={handleClose}
        >
          <div className="font-bold text-lg">Book Appointment</div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            Doctor Name : <b>{doctor.fullName}</b>
            <CssTextField
              type="date"
              id="date"
              name="date"
              label="Date"
              variant="outlined"
              InputProps={{
                style: { color: "var(--heading-color)" },
              }}
              onBlur={(e) => {
                setSelectedDate(e.target.value);
              }}
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter Appointment Date"
              fullWidth
              margin="normal"
              inputProps={{
                min: today,
                max: today,
              }}
              error={Boolean(errors?.date)}
              helperText={errors?.date ? `Please Enter Proper Date` : ""}
            />
            
            {/* <CssTextField
              type="time"
              id="time"
              name="time"
              label="Time"
              variant="outlined"
              InputProps={{
                style: { color: "var(--heading-color)" },
              }}
              onBlur={(e) => {
                setSelectedTime(e.target.value);
              }}
              InputLabelProps={{ shrink: true, required: true }}
              placeholder="Enter TIme"
              fullWidth
              margin="normal"
              inputProps={{
                step: 3600, // 5 minutes intervals
              }}
              error={Boolean(errors?.time)}
              helperText={errors?.time ? `Please Enter Proper Time` : ""}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                fullWidth
                id="time"
                name="time"
                label="Time"
                views={["hours"]}
                InputProps={{
                  style: { color: "var(--heading-color)" },
                }}
                value={selectedTime}
                minutesStep={30}
                onChange={(newValue) => setSelectedTime(newValue)}
                InputLabelProps={{ shrink: true, required: true }}
                margin="normal"
                error={Boolean(errors?.time)}
                helperText={errors?.time ? `Please Enter Proper Time` : ""}
              />
            </LocalizationProvider>
            {/* <DigitalClock label="Basic time picker" /> */}
            <CssTextField
              type="text"
              id="consultantFee"
              name="Consultant Fee"
              label="Consultant Fee"
              variant="outlined"
              InputProps={{
                style: { color: "var(--heading-color)" },
              }}
              InputLabelProps={{ shrink: true, required: true }}
              value={charge}
              fullWidth
              margin="normal"
              inputProps={{
                readOnly: true, // Prevent editing
              }}
              //   {...register("BasicInformation.dob", {
              //     required: "This field is required",
              //   })}
              //   error={Boolean(errors?.BasicInformation?.dob)}
              //   helperText={errors?.BasicInformation?.dob?.message}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              style={{
                margin: "15px",
                backgroundColor: "white",
                color: "black",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              style={{
                margin: "15px",
                backgroundColor: "var(--primary-color)",
              }}
              onClick={() => bookAppointment()}
            >
              Book
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default BookingPopup;
