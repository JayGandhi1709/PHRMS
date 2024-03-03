import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { RiEyeFill } from "react-icons/ri";
import { BACKENDURL } from "../../App";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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

const PrescriptionsList = (props) => {
  const { presPopup, setPresPopup, selectedID } = props;
  const [dob, setDob] = useState("01/01/2006");
  const [pageSize, setPageSize] = React.useState(5);
  const [MedicineList, setMedicineList] = useState([
    {
      medicineName: "",
      type: "",
      dosage: {
        morning: { quantity: "", remark: "" },
        afternoon: { quantity: "", remark: "" },
        evening: { quantity: "", remark: "" },
      },
      duration: "",
      total: "",
    },
  ]);

  const [chiefComplaints, setChiefComplaints] = useState([
    { complaint: "", duration: "", finding: "" },
  ]);
  // const [clinicalFindings, setClinicalFindings] = useState([{ finding: "" }]);
  const [investigations, setInvestigations] = useState([{ investigation: "" }]);
  const [advices, setAdvices] = useState([{ advice: "" }]);

  const [prescriptions, setPrescriptions] = useState([{
    _id : "",
    doctor: "",
    doctormobile: "",
    doctoremail: "",
    hospital: {
      name: "",
      address: "",
      mobile: "",
    },
    chiefComplaints: chiefComplaints,
    notes: { note: "" },
    diagnosis: { diagno: "" },
    procedureConducted: { procedure: "" },
    medicines: MedicineList,
    investigations: investigations,
    advices: advices,
  }]);
  const [patient, setPatient] = useState({
    BasicInformation: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
    },
    AddressInformation: {
      address1: "",
      address2: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });
  const [loading, setLoading] = useState(true);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      const res = await fetch(`${BACKENDURL}/getPatientDetails/${selectedID}`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        //   navigate("/")
      } else if (data === null) {
        setLoading(false);
      } else {
        // console.log(data.patient);
        setPatient(data.patient);
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions.reverse());
        }
        setLoading(false);
        setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, [dob]);

  const handleClickOpen = () => {
    setPresPopup(true);
  };
  const handleClose = () => {
    setPresPopup(false);
  };

  const columns = [
    { field: "id", headerName: "Prescription ID", width: 210 },
    { field: "doctorName", headerName: "Doctor name", width: 120 },
    { field: "diagnosis", headerName: "Diagnosis", width: 120 },
    { field: "hospitalName", headerName: "Hospital Name", width: 120 },
    { field: "chiefComplaints", headerName: "Chief complaints", width: 130 },
    { field: "date", headerName: "Date", width: 90 },
  ];

  const rows = prescriptions.map((row, index) => ({
    id: row._id,
    date: convertDatetoString(row.createdAt),
    doctorName: row.doctor,
    diagnosis: row.diagnosis,
    hospitalName: row.hospital.name,
    chiefComplaints: row.chiefComplaints.map((item,index) => {
        // console.log(item)
        return item.complaint;
    }),
  }));

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={presPopup}
        maxWidth={"md"}
        fullWidth={true}
        // className="w-screen"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          className="text-black"
          onClose={handleClose}
        >
          {selectedID} - {patient.BasicInformation.name.firstName} {patient.BasicInformation.name.lastName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{ height: 400, margin: "10px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              disableSelectionOnClick
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: LinearProgress,
              }}
              localeText={{
                toolbarDensity: "Size",
                toolbarDensityLabel: "Size",
                toolbarDensityCompact: "Small",
                toolbarDensityStandard: "Medium",
                toolbarDensityComfortable: "Large",
              }}
              pagination
              componentsProps={{
                toolbar: {
                  printOptions: {
                    hideFooter: true,
                    hideToolbar: true,
                  },
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              sx={{
                boxShadow: 2,
                border: 2,
                backgroundImage: "var(--card-bg)",
                borderColor: "var(--primary-color)",
                "& .MuiDataGrid-cell:hover": {
                  color: "var(--primary-color)",
                },
                "& .MuiDataGrid-cell": {
                  color: "var(--heading-color)",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "var(--primary-color)",
                },
                "& .MuiButtonBase-root, .MuiSvgIcon-root": {
                  color: "var(--primary-color)",
                },
                "& .MuiToolbar-root, .MuiSelect-iconStandard, .MuiInputBase-input":
                  {
                    color: "var(--heading-color)",
                  },
                color: "var(--small-text-color)",

                // Printing
                "@media print": {
                  ".MuiDataGrid-main": { color: "red" },
                  ".MuiDataGrid-columnHeaderTitle": {
                    color: "black",
                  },
                  "& .MuiButtonBase-root, .MuiSvgIcon-root": {
                    color: "black",
                    // visibility: "hidden",
                  },
                  "& .MuiDataGrid-cell": {
                    color: "black",
                  },
                  borderColor: "black",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default PrescriptionsList;
