import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiEyeFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import LinearProgress from "@mui/material/LinearProgress";
import { IconButton, Tooltip } from "@mui/material";
import { BACKENDURL } from "../../App";

const PatientHistory = (props) => {
  const navigate = useNavigate();
  const { setMenuItem } = props;
  const [dob, setDob] = useState("01/01/2006");
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

  const [prescriptions, setPrescriptions] = useState([
    {
      _id: "",
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
    },
  ]);
  const [pageSize, setPageSize] = React.useState(5);
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
      const res = await fetch(`${BACKENDURL}/getpatienthistory`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        setLoading(false);

        navigate("/");
      } else if (data === null) {
        setLoading(false);
      } else {
        // setPatient(data.patient);
        console.log(data);
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions.reverse());
        }
        setLoading(false);

        // setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, [dob]);

  const columns = [
    // { field: "id", headerName: "Prescription ID", width: 130 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "healthID", headerName: "Health ID", width: 130 },
    { field: "patientName", headerName: "Patient Name", width: 130 },
    { field: "diagnosis", headerName: "Diagnosis", width: 100 },
    { field: "chiefComplaints", headerName: "Chief complaints", width: 130 },
    {
      field: "prescription",
      headerName: "Prescription",
      sortable: false,
      filterable: false,
      width: 110,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              // console.log(cellValues.id);
              // console.log(prescriptions[cellValues.id]._id);
              // console.log(cellValues.id);
              props.setPrescriptionID(cellValues.id);
              props.setMenuItem("PreviewPrescription");
            }}
          >
            <div className="flex justify-center bg-primary py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
              <RiEyeFill className="h-4 my-auto" />
              <button className="font-bold ml-2">Preview </button>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 90,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              // console.log(cellValues.row.healthID)
              props.setHealthID(cellValues.row.healthID)
              setMenuItem("Dashboard")
            }}
          >
            <Tooltip title="View">
              <IconButton size="small">
                <AiOutlineSearch color="primary" fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = prescriptions.map((row, index) => ({
    id: row._id,
    date: convertDatetoString(row.createdAt),
    healthID: row.healthID,
    patientName: row.patientName,
    diagnosis: row.diagnosis,
    chiefComplaints: row.chiefComplaints.map((item, index) => {
      return item.complaint;
    }),
  }));
  // console.log(rows);

  return (
    <div style={{ height: 400, width: "90%", margin: "80px" }}>
      <h2 className="pb-8 font-extrabold">Patient History</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection
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
          "& .MuiToolbar-root, .MuiSelect-iconStandard, .MuiInputBase-input": {
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
  );
};

export default PatientHistory;
