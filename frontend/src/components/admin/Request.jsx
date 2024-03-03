import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import LinearProgress from "@mui/material/LinearProgress";

import Popup from "./Popup";
import { BACKENDURL } from "../../App";

const Request = (props) => {
  const { admin } = props;
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedID, setselectedID] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchUnverifiedDoctorList() {
    const res = await fetch(`${BACKENDURL}/getUnverifiedDoctorList`, {
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
    } else if (data === null) {
      setLoading(false);
    } else {
      // console.log(data.doctorlist);
      setDoctorList(data.doctorlist);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUnverifiedDoctorList();
  }, []);
  // }, [doctorList]);

  const onReject = async (id, e) => {
    // e.preventDefault();

    // console.log(id);
    const res = await fetch(`${BACKENDURL}/rejected/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.errors) {
      // console.log(data.errors);

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
      setLoading(false);
      fetchUnverifiedDoctorList();
    }
  };
  const onApprove = async (id, e) => {
    const res = await fetch(`${BACKENDURL}/approval/${id}`, {
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
      setLoading(!loading);
      fetchUnverifiedDoctorList();
    }
  };

  const columns = [
    { field: "fullName", headerName: "Full name", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "specialization", headerName: "Specialization", width: 120 },
    { field: "education", headerName: "Education", width: 100 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "hospitalName", headerName: "Hospital Name", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      export: false,
      renderCell: (cellValues) => {
        return (
          <>
            <Tooltip title="Approve">
              <IconButton
                onClick={() => {
                  onApprove(cellValues.id);
                }}
              >
                <RiCheckFill color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton
                onClick={() => {
                  onReject(cellValues.id);
                }}
              >
                <RiCloseFill color="red" />
              </IconButton>
            </Tooltip>
          </>
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
    education:
      row.EducationInformation.education[
        row.EducationInformation.education.length - 1
      ].eduName,
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
        {/* <div className="container"> */}
        <div className="wrapper">
          {/* <Box height={100} /> */}
          <div style={{ height: 400, width: "90%", margin: "40px" }}>
            <h2 className="pb-8 font-extrabold">
              Doctor Verification Requests
            </h2>
            {/* {doctorList.} */}
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              checkboxSelection
              disableSelectionOnClick
              pageSize={pageSize}
              onCellDoubleClick={(e) => {
                popupHandle(e);
              }}
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
            <Popup
              {...props}
              openPopup={openPopup}
              userType={"Doctor"}
              request={true}
              setOpenPopup={setOpenPopup}
              selectedID={selectedID}
              fetchUnverifiedDoctorList={fetchUnverifiedDoctorList()}
            ></Popup>
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default Request;
