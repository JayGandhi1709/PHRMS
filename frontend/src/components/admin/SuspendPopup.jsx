import React, { useEffect, useState } from "react";
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
// import { styled } from "@mui/styles";

const CssTextField = styled(TextField)({
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

const SuspandPopup = (props) => {
  const [err, setErr] = useState(false);
  const { suspendPopup, setSuspandPopup, selectedID, field, userType,action } = props;
  let val = "";

  const handleClickOpen = () => {
    setSuspandPopup(true);
  };

  const handleClose = () => {
    setErr(false);
    setSuspandPopup(false);
  };

  const onSuspand = async () => {
  
    // const url = userType === "Patient" ? `suspendpatient` : `suspenddoctor`;

    const url = action === "suspend" ? `suspenddoctor` : `unsuspenddoctor`;
    
    const res = await fetch(`/${url}/${selectedID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.json();
    // console.log(data);

    if (data.AuthError) {
      props.settoastCondition({
        status: "info",
        message: "Please Login to proceed!!!",
      });
      props.setToastShow(true);
      setSuspandPopup(false);
    } else if (data.err) {
      props.settoastCondition({
        status: "info",
        message: "Please try again later!!!",
      });
      props.setToastShow(true);
      props.fetchPatientList();
      setSuspandPopup(false);
    }
    props.settoastCondition({
      status: "success",
      message: `${userType} Suspanded Successfuly!!!`,
    });
    props.setToastShow(true);
    {
      userType === "Patient"
        ? props.fetchPatientList()
        : props.fetchDoctorList();
    }
    setSuspandPopup(false);
  };

  const handleSuspand = async () => {
    field === val ? onSuspand() : setErr(true);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={suspendPopup}
        maxWidth={"xs"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          // className="text-heading bg-body_bg"
          onClose={handleClose}
        >
          <div className="font-bold text-lg">Do you want to {action}?</div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            <h4 className="font-extralight text-sm">
              To {action} the {userType}
              <b>
                {userType === "Patient"
                  ? `(HealthID : ${selectedID})`
                  : `(Name : ${field})`}
              </b>
              , type the {userType === "Patient" ? "HealthID" : "Name"} to
              confirm.
            </h4>
            <CssTextField
              // autoFocus
              margin="normal"
              label={userType === "Patient" ? "HealthID" : "Name"}
              InputProps={{
                style: { color: "var(--heading-color)" },
              }}
              fullWidth
              variant="outlined"
              onBlur={(e) => {
                val = e.target.value;
              }}
              error={err}
              helperText={
                err
                  ? `Please Enter Proper ${
                      userType === "Patient" ? "Health ID" : "Name"
                    }`
                  : ""
              }
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
                color:"black"
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              style={{
                margin: "15px",
                backgroundColor:"var(--primary-color)",
              }}
              onClick={handleSuspand}
            >
              {action}
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default SuspandPopup;
