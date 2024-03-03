import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import BookingPopup from "./bookingPopup";
import { BACKENDURL } from "../../App";

const FindDoctor = (props) => {
  const { admin } = props;
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedID, setSelectedID] = useState();
  const [bookingPopup, setBookingPopup] = useState(false);

  useEffect(() => {
    async function fetchPatientList() {
      const res = await fetch(`${BACKENDURL}/findDoctors`, {
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
    fetchPatientList();
  }, []);

  const columns = [
    { field: "fullName", headerName: "Full name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Contact No.", width: 150 },
    { field: "specialization", headerName: "Specialization", width: 120 },
    { field: "education", headerName: "Education", width: 100 },
    { field: "consultationFee", headerName: "Fee", width: 100 },
    // { field: "city", headerName: "City", width: 100 },
    // { field: "state", headerName: "State", width: 90 },
    { field: "address", headerName: "Address", width: 190 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 170,
      renderCell: (cellValues) => {
        return (
          <div onClick={() => {
            setSelectedID(cellValues.row);
            setBookingPopup(true);
          }}>
            <div className="flex justify-center bg-primary py-1 px-3 rounded font-semibold shadow-sm hover:bg-bgsecondary text-black">
              {/* <RiEyeFill className="h-4 my-auto" /> */}
              <button className="font-bold">Book Appointment </button>
            </div>
          </div>
        );
      },
    },
    // { field: "pinCode", headerName: "Pin code", width: 80 },
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
    // city: row.AddressInformation.city,
    // state: `${row.AddressInformation.state} - ${row.AddressInformation.pinCode}`,
    consultationFee: row.HospitalInformation.consultationFee,
    address: `${row.AddressInformation.address1}, ${row.AddressInformation.address2} ${row.AddressInformation.city}, ${row.AddressInformation.state} - ${row.AddressInformation.pinCode}`,
    // pinCode: row.AddressInformation.pinCode,
  }));
  return (
    <section className="section h-max">
      <div className="wrapper">
        <div style={{ height: 500, width: "90%", margin: "40px" }}>
          <h2 className="font-extrabold pb-4">Find Doctor</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            // checkboxSelection
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
          {bookingPopup ? (
            <BookingPopup
            {...props}
              doctor={selectedID}
              bookingPopup={bookingPopup}
              setBookingPopup={setBookingPopup}
            />
          ) : null}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default FindDoctor;
