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
import { BACKENDURL } from "../../App";
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

const NotificationPopup = (props) => {
  const [err, setErr] = useState(false);
  const {
    notification,
    setNotification,
    getNotification,
    notificationPopup,
    setNotificationPopup,
  } = props;
  let val = "";

  const handleClickOpen = () => {
    setNotificationPopup(true);
  };

  const handleClose = () => {
    setErr(false);
    setNotificationPopup(false);
  };

  const markAsRead = async () => {
    // console.log("Mark as read");
    const res = await fetch(`${BACKENDURL}/markUserNotificationAsRead`, {
      method: "PATCH",
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
      // console.log(data);
      getNotification();
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={notificationPopup}
        maxWidth={"xs"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          // className="text-heading bg-body_bg"
          onClose={handleClose}
        >
          <div className="font-bold text-lg">
            Notifications({notification.length})
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            {/* <h1>{notification.length}</h1> */}
            {notification.length > 0
              ? notification.map((noti) => {
                  return (
                    <div className="p-2">
                      <div className="py-1">{noti.message}</div>
                      <div className="text-xs py-1">{noti.createdAt}</div>
                      <hr />
                    </div>
                  );
                })
              : "No Notifications"}
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
              onClick={() => markAsRead()}
            >
              Mark All As Read
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
      {/* <div
            className="modal fade"
            id="notificationPopup"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="notificationPopupLabel"
            aria-hidden="true"
        >
            <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "100%" }}
            >
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="notificationPopupLabel">
                    Notification
                </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                <div className="container">
                    <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                        <label htmlFor="notificationPopup">Notification</label>
                        <textarea
                            className="form-control"
                            id="notificationPopup"
                            rows={3}
                            value={val}
                            onChange={(e) => {
                            val = e.target.value;
                            }}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleClose}
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                    if (val === "") {
                        setErr(true);
                    } else {
                        setErr(false);
                        handleClose();
                    }
                    }}
                >
                    Send
                </button>
                </div>
            </div>
            </div>
        </div> */}
    </div>
  );
};

export default NotificationPopup;
