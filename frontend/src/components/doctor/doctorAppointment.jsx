import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { BACKENDURL } from "../../App";

const convertDatetoString = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DoctorAppointment = (props) => {
  // console.log(...props);
  const navigate = useNavigate();
  const [appointmentList, setAppointmentList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedID, setSelectedID] = useState();
  const currentDate = new Date().toISOString().split("T")[0];
  const [filterModel, setFilterModel] = React.useState({
    items: [
      { columnField: "date", operatorValue: "equals", value: convertDatetoString(currentDate) },
      // { columnField: "status", operatorValue: "equals", value: "pending" },
    ],
  });

  async function fetchAppointmentsList() {
    const res = await fetch(`${BACKENDURL}/getAppointmentsDoctors`, {
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);
    if (data.AuthError && data.success === false) {
      props.settoastCondition({
        status: "info",
        message: "Please Login to proceed!!!",
      });
      props.setToastShow(true);
      setLoading(false);
      navigate("/");
    } else {
      console.log(data);
      setAppointmentList(data.appointments);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  const updateAppointmentStatus = async (id, status) => {
    const res = await fetch(`${BACKENDURL}/updateAppointmentStatus/${status}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ appointmentID: id }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      props.settoastCondition({
        status: "success",
        message: `Appointment ${status}`,
      });
      props.setToastShow(true);
      // const newAppointmentList = appointmentList.filter(
      //   (appointment) => appointment._id !== id
      // );
      // setAppointmentList(newAppointmentList);
      fetchAppointmentsList();
    } else {
      props.settoastCondition({
        status: "error",
        message: `Error in ${status} appointment`,
      });
      props.setToastShow(true);
    }
  };

  const columns = [
    { field: "patientName", headerName: "Patient Name", width: 100 },
    { field: "healthID", headerName: "Health ID", width: 100 },
    { field: "charge", headerName: "Charges", width: 100 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 120 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (cellValues) => {
        return cellValues.row.status === "pending" ? (
          <>
            <div
              className="mr-2"
              onClick={() => {
                updateAppointmentStatus(cellValues.row.id, "approved");
              }}
            >
              <div className="flex justify-center bg-primary py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
                {/* <RiEyeFill className="h-4 my-auto" /> */}
                <button className="font-bold">Approve</button>
              </div>
            </div>
            <div
              onClick={() => {
                updateAppointmentStatus(cellValues.row.id, "rejected");
              }}
            >
              <div className="flex justify-center bg-red-500 py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
                {/* <RiEyeFill className="h-4 my-auto" /> */}
                <button className="font-bold">Decline</button>
              </div>
            </div>
          </>
        ) : null;
      },
    },
  ];

  const rows = appointmentList.map((row) => ({
    id: row._id,

    // fullName: row.doctorID,
    patientName: `${row.patientDetails.name.firstName} ${row.patientDetails.name.lastName}`,
    status: row.status,
    charge: row.charge,
    date: convertDatetoString(row.date),
    time: row.time,
    healthID: row.healthID,
  }));
  return (
    <section className="section h-max">
      <div className="wrapper">
        <div style={{ height: 500, width: "90%", margin: "40px" }}>
          <h2 className="font-extrabold pb-4">Appointments</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            filterModel={filterModel}
            loading={loading}
            // checkboxSelection
            onFilterModelChange={(newModel) => setFilterModel(newModel)}
            disableSelectionOnClick
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30]}
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
            onCellClick={(e) => {
              console.log(e.value);
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
      </div>
      {/* </div> */}
    </section>
  );
};

export default DoctorAppointment;
