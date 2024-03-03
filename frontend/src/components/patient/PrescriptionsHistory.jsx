import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { RiEyeFill } from "react-icons/ri";
import { BACKENDURL } from "../../App";

const PrescriptionsHistory = (props) => {
  const navigate = useNavigate();
  // const { setMenuItem } = props;
  // const [dob, setDob] = useState("01/01/2006");
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [pageSize, setPageSize] = React.useState(5);
  const [loading, setLoading] = useState(true);

  // const [patient, setPatient] = useState({});

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      const res = await fetch(`${BACKENDURL}/getprescriptionhistory`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        // setPatient(data.patient);
        // console.log(data);
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions.reverse());
        }
        setLoading(false)
        // setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, []);
  // }, [dob]);

  const columns = [
    { field: "date", headerName: "Date", width: 130 },
    { field: "healthID", headerName: "Health ID", width: 130 },
    { field: "doctorName", headerName: "Doctor Name", width: 130 },
    { field: "diagnosis", headerName: "Diagnosis", width: 100 },
    {
      field: "prescription",
      headerName: "Prescription",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              // console.log(cellValues.id)
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
    healthID: row.healthID,
    doctorName: row.doctor,
    diagnosis: row.diagnosis,
  }));
  // console.log(rows)

  return (
    <div style={{ height: 400, width: "90%",margin:"80px" }}>
          <h2 className="pb-8 font-extrabold">Checkup History</h2>

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
  );
};

export default PrescriptionsHistory;
