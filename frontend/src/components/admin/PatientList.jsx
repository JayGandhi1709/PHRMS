import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { RiEyeFill } from "react-icons/ri";
import Popup from "./Popup";
import PrescriptionsList from "./PrescriptionsList";
import DeletePopup from "./DeletePopup";
import { IconButton, Tooltip } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { BACKENDURL } from "../../App";

const PatientList = (props) => {
  const { admin } = props;
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedID, setselectedID] = useState();
  const [presPopup, setPresPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [field, setField] = useState();

  useEffect(() => {
    fetchPatientList();
  }, []);
  // }, [patientList]);

  async function fetchPatientList() {
    const res = await fetch(`${BACKENDURL}/getPatientList`, {
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);
    if (data.AuthError) {
      props.settoastCondition({
        status: "info",
        message: "Please Login to proceed!!!",
      });
      props.setToastShow(true);
      setLoading(false);
      navigate("/");
    } else {
      setPatientList(data.patientlist);
      setLoading(false);
    }
  }

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    { field: "id", headerName: "Health ID", width: 130 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "dob", headerName: "Date Of Birth", width: 110 },
    { field: "bloodgroup", headerName: "Blood Group", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    {
      field: "prescription",
      headerName: "All Prescriptions",
      filterable: false,
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              // console.log(cellValues.id);
              setselectedID(cellValues.id);
              setPresPopup(true);
            }}
          >
            <div className="flex justify-center bg-primary py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
              <CgNotes className="h-4 my-auto" />
              <button className="font-bold ml-2">Prescriptions </button>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      filterable: false,
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div className="flex flex-row items-center">
            <Tooltip title="View">
              <IconButton
                size="small"
                onClick={() => {
                  popupHandle(cellValues);
                }}
              >
                <RiEyeFill color="primary" fontSize="inherit" />
              </IconButton>
            </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="large"
                  onClick={() => {
                    // console.log(cellValues.id);
                    setselectedID(cellValues.id);
                    setField(cellValues.id);
                    setDeletePopup(true);
                  }}
                >
                  <MdDelete color="red" />
                </IconButton>
              </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = patientList.map((row) => ({
    id: row.healthID,
    firstName: row.BasicInformation.name.firstName,
    lastName: row.BasicInformation.name.lastName,
    phoneNumber: `+91 ${row.BasicInformation.phoneNumber}`,
    dob: convertDatetoString(row.BasicInformation.dob),
    bloodgroup: row.HealthInformation.bloodGroup,
    city: row.AddressInformation.city,
    state: row.AddressInformation.state,
    // lastName: row.BasicInformation.name.lastName,
  }));

  const popupHandle = (value) => {
    setOpenPopup(true);
    // console.log(value)
    setselectedID(value.id);
  };

  return (
    <>
      <section className="section">
        {/* <div className="container"> */}
        <div className="wrapper">
          {/* <Box height={100} /> */}
          <div style={{ height: 400, margin: "40px" }}>
            <h2 className="pb-8 font-extrabold">Patient List</h2>

            {/* {doctorList.} */}
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
              onCellDoubleClick={(e) => {
                popupHandle(e);
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
            <Popup
              {...props}
              openPopup={openPopup}
              userType={"Patient"}
              request={false}
              setOpenPopup={setOpenPopup}
              selectedID={selectedID}
            ></Popup>
            {presPopup ? (
              <PrescriptionsList
                presPopup={presPopup}
                setPresPopup={setPresPopup}
                selectedID={selectedID}
              ></PrescriptionsList>
            ) : (
              ""
            )}
            {deletePopup ? (
              <DeletePopup
                {...props}
                deletePopup={deletePopup}
                userType={"Patient"}
                setDeletePopup={setDeletePopup}
                selectedID={selectedID}
                field={field}
                setField={setField}
                fetchPatientList={fetchPatientList}
              ></DeletePopup>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default PatientList;
