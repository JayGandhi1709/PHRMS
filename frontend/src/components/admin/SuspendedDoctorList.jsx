import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Popup from "./Popup";
import { RiEyeFill } from "react-icons/ri";

import DeletePopup from "./DeletePopup";
import SuspandPopup from "./SuspendPopup";
import { IconButton, Tooltip } from "@mui/material";
import { MdDelete,MdBlock } from "react-icons/md";
import { BACKENDURL } from "../../App";

const SuspendedDoctorList = (props) => {
  const { admin } = props;
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedID, setselectedID] = useState();
  const [deletePopup, setDeletePopup] = useState(false);
  const [suspendPopup, setSuspandPopup] = useState(false);
  const [field, setField] = useState();

  async function fetchSuspendedDoctorList() {
    const res = await fetch(`${BACKENDURL}/getSuspendedDoctorList`, {
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
      setDoctorList(data.doctorlist);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuspendedDoctorList();
  }, []);

  const columns = [
    { field: "fullName", headerName: "Full name", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "specialization", headerName: "Specialization", width: 120 },
    { field: "education", headerName: "Education", width: 100 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "hospitalName", headerName: "Hospital Name", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    // {
    //   field: "delete",
    //   headerName: "Actions",
    //   width: 150,
    //   renderCell: (cellValues) => {
    //     return (
    //       <div
    //         onClick={() => {
    //           console.log(cellValues.id);
    //           console.log(
    //             cellValues.row.firstName + " " + cellValues.row.lastName
    //           );
    //           setselectedID(cellValues.id);
    //           setField(
    //             cellValues.row.firstName + " " + cellValues.row.lastName
    //           );
    //           setDeletePopup(true);
    //         }}
    //       >
    //         <div className="flex justify-center bg-primary py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
    //           <RiEyeFill className="h-4 my-auto" />
    //           <button className="font-bold ml-2">Delete </button>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Actions",
      filterable: false,
      sortable: false,
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div className="flex flex-row items-center">
            <div
              onClick={() => {
                popupHandle(cellValues);
              }}
            >
              <Tooltip title="View">
                <IconButton size="small">
                  <RiEyeFill color="primary" fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
            <div
              onClick={() => {
                // console.log(cellValues.id);
                // console.log(
                //   cellValues.row.firstName + " " + cellValues.row.lastName
                // );
                setselectedID(cellValues.id);
                setField(
                  cellValues.row.firstName + " " + cellValues.row.lastName
                );
                setDeletePopup(true);
              }}
            >
              <Tooltip title="Delete">
                <IconButton size="large">
                  <MdDelete color="red" />
                </IconButton>
              </Tooltip>
              
            </div>
            <div
              onClick={() => {
                setselectedID(cellValues.id);
                setField(
                  cellValues.row.firstName + " " + cellValues.row.lastName
                );
                setSuspandPopup(true);
              }}
            >
              <Tooltip title="Unsuspend">
                <IconButton>
                  <MdBlock color="red" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = doctorList.map((row) => ({
    id: row._id,
    firstName: row.BasicInformation.name.firstName,
    lastName: row.BasicInformation.name.lastName,
    fullName: `${row.BasicInformation.name.firstName || ""} ${
      row.BasicInformation.name.lastName || ""
    }`,
    email: row.BasicInformation.email,
    phoneNumber: `+91 ${row.BasicInformation.phoneNumber}`,
    specialization: row.EducationInformation.specialization[0].specialization,
    education: row.EducationInformation.education[row.EducationInformation.education.length -1].eduName,
    hospitalName: row.HospitalInformation.hospitalName,
    city: row.AddressInformation.city,
    state: row.AddressInformation.state,
  }));

  const popupHandle = (value) => {
    setOpenPopup(true);
    // console.log(value)
    setselectedID(value.id);
  };

  return (
    <>
      <section className="section h-max">
        <div className="wrapper">
          <div style={{ height: 400, width: "90%", margin: "40px" }}>
            <h2 className="pb-8 font-extrabold">Suspended Doctor List</h2>
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
              userType={"Doctor"}
              request={false}
              setOpenPopup={setOpenPopup}
              selectedID={selectedID}
            ></Popup>
            {deletePopup ? (
              <DeletePopup
                {...props}
                deletePopup={deletePopup}
                setDeletePopup={setDeletePopup}
                userType={"Doctor"}
                selectedID={selectedID}
                field={field}
                setField={setField}
                fetchDoctorList={fetchSuspendedDoctorList}
              ></DeletePopup>
            ) : (
              ""
            )}
            {suspendPopup ? (
              <SuspandPopup
                {...props}
                suspendPopup={suspendPopup}
                setSuspandPopup={setSuspandPopup}
                userType={"Doctor"}
                selectedID={selectedID}
                field={field}
                setField={setField}
                action={"unsuspend"}
                fetchDoctorList={fetchSuspendedDoctorList}
              ></SuspandPopup>
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

export default SuspendedDoctorList;
