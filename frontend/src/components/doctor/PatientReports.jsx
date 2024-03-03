import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { RiEyeFill } from "react-icons/ri";
import LinearProgress from "@mui/material/LinearProgress";
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

  const [prescriptions, setPrescriptions] = useState([{
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
  const [pageSize, setPageSize] = React.useState(5);
  const [patient, setPatient] = useState({});
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
      if (props.healthID.length === 12) {
        const res = await fetch(`${BACKENDURL}/searchpatient/${props.healthID}`);
        const data = await res.json();

        if (data.AuthError) {
          props.settoastCondition({
            status: "info",
            message: "Please Login to proceed!!!",
          });
          props.setToastShow(true);
          navigate("/");
        } else if (data === null) {
          setLoading(false);
        } else {
          setPatient(data.patient);
          if (data.prescriptions) {
            setPrescriptions(data.prescriptions.reverse());
          }
          setLoading(false);
          setDob(convertDatetoString(patient.dob));
        }
      } else if (props.healthID.length === 0) {
        setPatient({});
      }
    }
    getpatient();
  }, [dob]);

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "doctorName", headerName: "Doctor name", width: 150 },
    { field: "hospitalName", headerName: "Hospital Name", width: 120 },
    { field: "diagnosis", headerName: "Diagnosis", width: 150 },
    { field: "chiefComplaints", headerName: "Chief complaints", width: 130 },
    {
      field: "prescription",
      headerName: "Prescription",
      sortable:false,
      filterable:false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              // console.log(prescriptions[cellValues.id]._id);
              props.setPrescriptionID(prescriptions[cellValues.id]._id);
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
  ];

  const rows = prescriptions.map((row, index) => ({
    id: index,
    date: convertDatetoString(row.createdAt),
    doctorName: row.doctor,
    diagnosis: row.diagnosis,
    hospitalName: row.hospital.name,
    chiefComplaints: row.chiefComplaints.map((item, index) => {
      return item.complaint;
    }),
  }));

  return (
    <div className="col-span-10">
      {props.healthID.length === 12 ? (
        <div style={{ height: 400, width: "90%", margin: "80px" }}>
          <h2 className="pb-8 font-extrabold">Patient Reports</h2>
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
      ) : (
        <div className="text-xl flex justify-center items-center font-bold my-80 py-4 flex-col">
          <div className="text-heading">Search Patient to see Reports</div>
          <div
            onClick={() => setMenuItem("Dashboard")}
            className="text-md py-1 px-4 bg-primary rounded mt-3 cursor-pointer"
          >
            Return to DashBoard
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
