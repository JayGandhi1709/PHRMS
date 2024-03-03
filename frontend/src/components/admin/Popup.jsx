import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { RiCheckFill, RiCloseFill, RiArrowDropLeftLine } from "react-icons/ri";
import ViewDetails from "./ViewDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup(props) {
  //   const [open, setOpenPopup] = React.useState(false);
  const { openPopup, setOpenPopup, userType, request } = props;

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const onReject = async (id, e) => {
    const res = await fetch(`/rejected/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.errors) {
      props.settoastCondition({
        status: "error",
        message: "Please Try Again Leter!",
      });
      props.setToastShow(true);
    } else {
      props.settoastCondition({
        status: "success",
        message: "Deleted!",
      });
      props.setToastShow(true);
      // props.fetchUnverifiedDoctorList();
    }
  };
  const onApprove = async (id, e) => {
    const res = await fetch(`/approval/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.errors) {
      props.settoastCondition({
        status: "error",
        message: "Please Try Again Leter!",
      });
      props.setToastShow(true);
    } else {
      props.settoastCondition({
        status: "success",
        message: "Approved!",
      });
      props.setToastShow(true);
      // props.fetchUnverifiedDoctorList();
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={openPopup}
        // onClick={() => {
        //   setOpenPopup(false);
        // }}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "var(--primary-color)",color:"black" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenPopup(false);
              }}
              aria-label="close"
            >
              <RiArrowDropLeftLine size="3rem" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {userType} Information
            </Typography>

            {request ? (
              <>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    onApprove(props.selectedID);
                    setOpenPopup(false);
                  }}
                >
                  <RiCheckFill color="primary" backgroundColor="red" />
                  Approve
                </Button>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    onReject(props.selectedID);
                    setOpenPopup(false);
                  }}
                >
                  <RiCloseFill color="red" />
                  Reject
                </Button>
              </>
            ) : (
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  setOpenPopup(false);
                }}
              >
                <RiCloseFill fontSize={"25px"}/>
                Close
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {/* <Register {...props} /> */}
        <ViewDetails {...props} />
      </Dialog>
    </div>
  );
}
