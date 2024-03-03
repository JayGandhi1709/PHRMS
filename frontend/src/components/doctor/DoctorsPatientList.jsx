import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { RiEyeFill } from "react-icons/ri";
import PrescriptionsList from "./PrescriptionsList";
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";

const DoctorsPatientList = (props) => {
  const { setMenuItem } = props;
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
    const res = await fetch(`/getpatientlist/${props.loginData.BasicInformation.email}`, {
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
      // console.log(data.list);
      setPatientList(data.list);
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
    { field: "patientName", headerName: "Patient Name", width: 130 },
    { field: "count", headerName: "Count", width: 60 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 100,
      description: "According to the latest prescription added.",
    },
    {
      field: "prescription",
      headerName: "Prescriptions",
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
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 90,
      renderCell: (cellValues) => {
        return (
          <div
            onClick={() => {
              console.log(cellValues.id);
              props.setHealthID(cellValues.id);
              setMenuItem("Dashboard");
            }}
          >
            <Tooltip title="Search">
              <IconButton size="small">
                <AiOutlineSearch color="primary" fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = patientList.map((row) => ({
    id: row._id,
    count: row.total,
    patientName: row.details.patientName,
    date: convertDatetoString(row.details.createdAt),
  }));

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
              initialState={{
                sorting: {
                  sortModel: [{ field: "date", sort: "desc" }],
                },
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
            {presPopup ? (
              <PrescriptionsList
                {...props}
                presPopup={presPopup}
                setPresPopup={setPresPopup}
                selectedID={selectedID}
              ></PrescriptionsList>
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

export default DoctorsPatientList;
