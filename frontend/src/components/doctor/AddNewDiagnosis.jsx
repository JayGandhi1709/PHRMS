import React, { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { TextField, Typography, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/styles";
import { BACKENDURL } from "../../App";

const CssTextField = styled(TextField)({
  "& label": {
    color: "var(--heading-color)",
  },
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--heading-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});

const AddNewDiagnosis = (props) => {
  const { setMenuItem, loginData } = props;
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
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

  const handleAddMedicine = () => {
    const tempmedicinelist = [...MedicineList];
    tempmedicinelist.push({
      medicineName: "",
      type: "",
      dosage: {
        morning: { quantity: "", remark: "" },
        afternoon: { quantity: "", remark: "" },
        evening: { quantity: "", remark: "" },
      },
      duration: "",
      total: "",
    });
    setMedicineList(tempmedicinelist);
  };
  const handleAddChiefComplaint = () => {
    const tempChiefComplaint = [...chiefComplaints];
    tempChiefComplaint.push({ complaint: "", duration: "", finding: "" });
    setChiefComplaints(tempChiefComplaint);
  };

  const handleAddInvestigation = () => {
    const tempInvestigations = [...investigations];
    tempInvestigations.push({ investigation: "" });
    setInvestigations(tempInvestigations);
  };

  const handleAddAdvices = () => {
    const tempAdvices = [...advices];
    tempAdvices.push({ advice: "" });
    setAdvices(tempAdvices);
  };

  const [prescription, setPrescription] = useState({
    doctor: !loginData.BasicInformation.name.middleName
      ? `${loginData.BasicInformation.name.firstName} ${loginData.BasicInformation.name.lastName}`
      : `${loginData.BasicInformation.name.firstName} ${loginData.BasicInformation.name.middleName} ${loginData.BasicInformation.name.lastName}`,
    // doctor: `${loginData.BasicInformation.name.firstName}${loginData.BasicInformation.name.middleName}${loginData.BasicInformation.name.lastName}`,
    doctormobile: `${loginData.BasicInformation.phoneNumber}`,
    doctoremail: `${loginData.BasicInformation.email}`,
    hospital: {
      name: `${loginData.HospitalInformation.hospitalName}`,
      address: `${loginData.HospitalInformation.address.address1} ${loginData.HospitalInformation.address.address2} ${loginData.HospitalInformation.address.city} ${loginData.HospitalInformation.address.taluka} ${loginData.HospitalInformation.address.district} ${loginData.HospitalInformation.address.pinCode}`,
      mobile: `${loginData.HospitalInformation.hospitalContact}`,
    },
    chiefComplaints: chiefComplaints,
    notes: { note: "" },
    diagnosis: { diagno: "" },
    procedureConducted: { procedure: "" },
    medicines: MedicineList,
    investigations: investigations,
    advices: advices,
  });

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${BACKENDURL}/prescription/${props.healthID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescription),
    });
    const data = await res.json();
    if (data.AuthError) {
      props.settoastCondition({
        status: "info",
        message: "Please Login to proceed!!!",
      });
      props.setToastShow(true);
      navigate("/");
    }
    if (data.msg) {
      props.settoastCondition({
        status: "error",
        message: "Please fill all fields properly!!!",
      });
      props.setToastShow(true);
    }
    setLoading(false);
    props.settoastCondition({
      status: "success",
      message: "Prescription Added Successfully!!!",
    });
    props.setToastShow(true);
    // navigate("/doctor");
    setMenuItem("Dashboard");
  };

  return (
    <>
      <div className="flex flex-col mt-20 bg-body_bg">
        {/* BreadCrumbs Section Starts */}
        <section className="header__breadcrumbs flex justify-center">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ color: "var(--heading-color)" }}
          >
            <h3
              onClick={() => {
                setMenuItem("Dashboard");
              }}
              className="text-[var(--heading-color)] text-[1.5rem] hover:underline hover:cursor-pointer"
            >
              Dashboard
            </h3>
            <h3 className="font-bold text-[var(--heading-color)] text-[1.5rem]">
              Add New Diagnosis
            </h3>
          </Breadcrumbs>
        </section>
        {/* BreadCrumbs Section Ends */}

        <div className="ml-8 mr-8">
          {/* <h1 className="font-bold lg:text-2xl my-6 ml-6  ">
              Add a new diagnosis
            </h1> */}

          {/* Form Starts */}
          <form
            // className="shadow p-6 m-2 ml-2 mt-8"
            onSubmit={handleAddPrescription}
          >
            {/* Chief Complaints Starts */}
            <div className="mt-3">
              <div className=" mt-5 flex">
                <h1 className="text-2xl flex font-medium mb-3 mr-20">
                  Chief Complaints
                </h1>
                <div className="complaints__inputs flex flex-col">
                  {chiefComplaints.map((chiefComplaint, index) => (
                    <div
                      className="complaints__inputs-1 flex sm:flex-row gap-10 w-[73rem]"
                      key={index}
                    >
                      <CssTextField
                        placeholder="Eg. Knee pain"
                        label="Complaint "
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="dense"
                        value={chiefComplaint.complaint}
                        onChange={(e) => {
                          let tempChiefComplaint = [...chiefComplaints];
                          tempChiefComplaint[index].complaint = e.target.value;
                          setChiefComplaints(tempChiefComplaint);
                          let tempprescription = { ...prescription };
                          tempprescription.chiefComplaints = chiefComplaints;
                          setPrescription(tempprescription);
                        }}
                      />
                      <CssTextField
                        placeholder="Eg. 2 days"
                        label=" Duration "
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="dense"
                        value={chiefComplaint.duration}
                        onChange={(e) => {
                          let tempChiefComplaint = [...chiefComplaints];
                          tempChiefComplaint[index].duration = e.target.value;
                          setChiefComplaints(tempChiefComplaint);

                          let tempprescription = { ...prescription };
                          tempprescription.chiefComplaints = chiefComplaints;
                          setPrescription(tempprescription);
                        }}
                      />
                      <CssTextField
                        placeholder="Eg. Yes/No"
                        label="Clinical Finding"
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="dense"
                        value={chiefComplaints.finding}
                        onChange={(e) => {
                          let tempChiefComplaint = [...chiefComplaints];
                          tempChiefComplaint[index].finding = e.target.value;
                          setChiefComplaints(tempChiefComplaint);

                          let tempprescription = { ...prescription };
                          tempprescription.chiefComplaints = chiefComplaints;
                          setPrescription(tempprescription);
                        }}
                      />
                      <div className="flex justify-start items-center">
                        <div
                          className="h-8 w-16 mt-0  font-semibold cursor-pointer "
                          onClick={handleAddChiefComplaint}
                        >
                          <RiAddLine
                            className="h-8 w-8"
                            color="var(--heading-color)"
                          />
                        </div>
                        {(chiefComplaints.length > 1 && (
                          <div
                            className="  h-8 w-20 mt-0 font-semibold cursor-pointer "
                            onClick={() => {
                              let tempChiefComplaint = [...chiefComplaints];
                              tempChiefComplaint.splice(index, 1);

                              let tempprescription = { ...prescription };
                              tempprescription.chiefComplaints =
                                tempChiefComplaint;
                              setPrescription(tempprescription);
                              setChiefComplaints(tempChiefComplaint);
                            }}
                          >
                            <RiSubtractLine
                              className="w-8 h-8"
                              color="var(--heading-color)"
                            />
                          </div>
                        )) || (
                          <div className="  h-8 w-20 mt-0 font-semibold cursor-pointer "></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Chief Complaints Ends */}

            {/* Notes Starts */}
            <div className="mt-5 flex items-center justify-between">
              <h1 className="text-2xl font-medium mb-3 ">Notes</h1>

              <CssTextField
                placeholder="Eg. Description"
                label="Note"
                variant="outlined"
                InputProps={{
                  style: { color: "var(--heading-color)", width: 1170 },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                margin="dense"
                value={prescription.notes.note}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.notes.note = e.target.value;
                  setPrescription(tempprescription);
                }}
              />
            </div>
            {/* Notes Ends */}

            {/* Diagnosis Starts */}
            <div className=" mt-5 flex items-center justify-between">
              <h1 className="text-2xl font-medium mb-3">Diagnosis</h1>

              <CssTextField
                placeholder="Eg. Type 1 Diabetes Information"
                label="Diagnosis"
                variant="outlined"
                InputProps={{
                  style: { color: "var(--heading-color)", width: 1170 },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                margin="dense"
                required
                value={prescription.diagnosis.diagno}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.diagnosis.diagno = e.target.value;
                  setPrescription(tempprescription);
                }}
              />
            </div>
            {/* Diagnosis Ends */}

            {/* Procedure Conducted Starts */}
            <div className=" mt-5 flex items-center justify-between">
              <h1 className="text-2xl font-medium mb-3 w-10">
                Procedure Conducted
              </h1>

              <CssTextField
                placeholder="Eg. CT Scan Conducted"
                label="Procedure"
                variant="outlined"
                InputProps={{
                  style: { color: "var(--heading-color)", width: 1170 },
                }}
                InputLabelProps={{ shrink: true, required: true }}
                margin="dense"
                value={prescription.procedureConducted.procedure}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.procedureConducted.procedure =
                    e.target.value;
                  setPrescription(tempprescription);
                }}
              />
            </div>
            {/* Procedure Conducted Ends */}

            {/* Medication Section Starts */}
            <h1 className="font-bold text-3xl mt-14 text-center">
              Medication Section
            </h1>
            {/* Medication Section Ends */}

            {MedicineList.map((medicine, index, { count = index + 1 }) => (
              <div className="mt-10" key={index}>
                <div className="flex xsm:pb-[4rem] justify-between">
                  <div className="flex font-bold text-xl text-heading">
                    ({count})
                  </div>
                  <div className="flex">
                    <div
                      className=" m-2 h-10 w-16 mt-0 font-semibold cursor-pointer "
                      onClick={handleAddMedicine}
                    >
                      <RiAddLine
                        color="var(--heading-color)"
                        className="w-8 h-8"
                      />
                    </div>
                    {MedicineList.length > 1 && (
                      <div
                        className=" m-2 h-10 w-20 mt-0   font-semibold cursor-pointer "
                        onClick={() => {
                          let tempmedicinelist = [...MedicineList];
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = tempmedicinelist;
                          setPrescription(tempprescription);
                          tempmedicinelist.splice(index, 1);
                        }}
                      >
                        <RiSubtractLine
                          color="var(--heading-color)"
                          className="w-8 h-8"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  {/* Incremental Number Based on number of Medication Starts */}
                  {/* Incremental Number Based on number of Medication Ends */}

                  <h1 className="text-2xl font-medium mb-3 flex items-center">
                    Medicine
                  </h1>
                  <div className="flex items-center md:flex-wrap xsm:flex-wrap w-[73rem] justify-between">
                    {/* Medicine Name Starts */}
                    <div className="mt-2 flex-1">
                      <CssTextField
                        placeholder="Medicine Name"
                        label="Medicine Name"
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true, required: true }}
                        required
                        value={medicine.medicineName}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].medicineName = e.target.value;
                          setMedicineList(tempmedicinelist);

                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                    </div>
                    {/* Medicine Name Ends */}

                    {/* Type of medicine Starts */}
                    <div className="mt-2 flex-1 ml-6">
                      {/* <h1 className="text-2xl font-medium mb-5">Type</h1> */}

                      <CssTextField
                        placeholder="Eg. Zincovid "
                        label="Type of Medicine "
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true, required: true }}
                        value={medicine.type}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].type = e.target.value;
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                    </div>
                    {/* Type of medicine Ends */}

                    {/* Duration Starts */}
                    <div className="mt-2 flex-1 ml-6">
                      <CssTextField
                        type={"number"}
                        placeholder="Eg. Days: 10"
                        label="Duration"
                        required
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true, required: true }}
                        value={medicine.duration}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].duration = e.target.value;
                          setMedicineList(tempmedicinelist);
                          // console.log(Number(medicine.duration) * (Number(medicine.dosage.morning.quantity)+Number(medicine.dosage.afternoon.quantity)+Number(medicine.dosage.evening.quantity)))
                          tempmedicinelist[index].total =
                            Number(medicine.duration) *
                            (Number(medicine.dosage.morning.quantity) +
                              Number(medicine.dosage.afternoon.quantity) +
                              Number(medicine.dosage.evening.quantity));
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                    </div>
                    {/* Duration Ends */}

                    {/* Total Tablets Starts */}
                    <div className="mt-2 flex-1 ml-6">
                      {/* <h1 className="text-2xl font-medium mb-5">
                        Total Tablets
                      </h1> */}

                      <CssTextField
                        placeholder="Eg. Total Tablets: 30"
                        label="Total Tablets"
                        required
                        // readonly
                        // disabled
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                          readOnly: true,
                        }}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true, required: true }}
                        type="number"
                        value={
                          Number(medicine.duration) *
                          (Number(medicine.dosage.morning.quantity) +
                            Number(medicine.dosage.afternoon.quantity) +
                            Number(medicine.dosage.evening.quantity))
                        }
                        // value={medicine.total}
                        onChange={(e) => {
                          // console.log(Number(medicine.duration) * (Number(medicine.dosage.morning.quantity)+Number(medicine.dosage.afternoon.quantity)+Number(medicine.dosage.evening.quantity)))
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].total = e.target.value;
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                    </div>
                    {/* Total Tablets Ends */}
                  </div>
                </div>
                {/* Dosages Starts */}
                <div className="flex justify-between">
                  {/* Incremental Number Based on number of Medication Starts */}
                  {/* Incremental Number Based on number of Medication Ends */}

                  <h1 className="text-2xl font-medium mb-3 flex items-center">
                    Daily Dosages
                  </h1>
                  <div className="flex items-center md:flex-wrap xsm:flex-wrap w-[73rem] justify-between">
                    {/* Medicine Name Starts */}
                    <div className="mt-2 flex-1">
                      <CssTextField
                        placeholder="Eg. 1"
                        label="Morning"
                        type="number"
                        fullWidth
                        margin="dense"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        value={medicine.dosage.morning.quantity}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.morning.quantity =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          // console.log(Number(medicine.duration) * (Number(medicine.dosage.morning.quantity)+Number(medicine.dosage.afternoon.quantity)+Number(medicine.dosage.evening.quantity)))
                          tempmedicinelist[index].total =
                            Number(medicine.duration) *
                            (Number(medicine.dosage.morning.quantity) +
                              Number(medicine.dosage.afternoon.quantity) +
                              Number(medicine.dosage.evening.quantity));
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                      <select
                        className="col-span-2"
                        id="morning"
                        placeholder="-"
                        value={medicine.dosage.morning.remark}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.morning.remark =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      >
                        <option>select</option>
                        <option>After Food</option>
                        <option>Before food</option>
                      </select>
                    </div>
                    {/* Medicine Name Ends */}

                    {/* Type of medicine Starts */}
                    <div className="mt-2 flex-1 ml-6">
                      {/* <h1 className="text-2xl font-medium mb-3">
                            Afternoon
                          </h1> */}

                      <CssTextField
                        placeholder="Eg. 1"
                        label="Afternoon"
                        type="number"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        fullWidth
                        margin="dense"
                        value={medicine.dosage.afternoon.quantity}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.afternoon.quantity =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          // console.log(Number(medicine.duration) * (Number(medicine.dosage.morning.quantity)+Number(medicine.dosage.afternoon.quantity)+Number(medicine.dosage.evening.quantity)))
                          tempmedicinelist[index].total =
                            Number(medicine.duration) *
                            (Number(medicine.dosage.morning.quantity) +
                              Number(medicine.dosage.afternoon.quantity) +
                              Number(medicine.dosage.evening.quantity));
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                      <select
                        className="col-span-2"
                        id="afternoon"
                        placeholder="-"
                        value={medicine.dosage.afternoon.remark}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.afternoon.remark =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      >
                        <option>select</option>
                        <option>After Food</option>
                        <option>Before food</option>
                      </select>
                    </div>
                    {/* Type of medicine Ends */}

                    {/* Duration Starts */}
                    <div className="mt-2 flex-1 ml-6">
                      {/* <h1 className="text-2xl font-medium mb-3">Night</h1> */}

                      <CssTextField
                        placeholder="Eg. 1"
                        label="Night"
                        type="number"
                        InputLabelProps={{ shrink: true, required: true }}
                        value={medicine.dosage.evening.quantity}
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        fullWidth
                        margin="dense"
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.evening.quantity =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          // console.log(Number(medicine.duration) * (Number(medicine.dosage.morning.quantity)+Number(medicine.dosage.afternoon.quantity)+Number(medicine.dosage.evening.quantity)))
                          tempmedicinelist[index].total =
                            Number(medicine.duration) *
                            (Number(medicine.dosage.morning.quantity) +
                              Number(medicine.dosage.afternoon.quantity) +
                              Number(medicine.dosage.evening.quantity));
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      />
                      <select
                        className="col-span-2"
                        id="night"
                        placeholder="-"
                        value={medicine.dosage.evening.remark}
                        onChange={(e) => {
                          let tempmedicinelist = [...MedicineList];
                          tempmedicinelist[index].dosage.evening.remark =
                            e.target.value;
                          setMedicineList(tempmedicinelist);
                          let tempprescription = { ...prescription };
                          tempprescription.medicines = MedicineList;
                          setPrescription(tempprescription);
                        }}
                      >
                        <option>select</option>
                        <option>Before Food</option>
                        <option>After food</option>
                      </select>
                    </div>
                    {/* Duration Ends */}
                  </div>
                </div>
                {/* Dosages Ends */}
              </div>
            ))}

            {/* Last Section Starts */}
            <h1 className="font-bold text-3xl mt-28 mb-20 text-center">
              Doctors Consultation
            </h1>
            {/* Last Section Ends */}

            <div className="">
              {/* Investigation Starts */}
              <div className="mt-5 flex">
                <h1 className="text-2xl flex font-medium mb-3 mr-20 mt-4">
                  Investigations
                </h1>
                <div className="flex flex-col">
                  {investigations.map((Investigation, index) => (
                    <div
                      className="flex sm:flex-row gap-10 w-[73rem]"
                      key={index}
                    >
                      <CssTextField
                        placeholder="Eg. About Patient Health Status"
                        label="Investigation"
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="dense"
                        fullWidth
                        value={Investigation.investigation}
                        onChange={(e) => {
                          const tempinvestigations = [...investigations];
                          tempinvestigations[index].investigation =
                            e.target.value;
                          setInvestigations(tempinvestigations);
                          let tempprescription = { ...prescription };
                          tempprescription.investigations = investigations;
                          setPrescription(tempprescription);
                        }}
                      />

                      <div className="flex justify-start items-center">
                        <div
                          className="h-8 w-16 mt-0  font-semibold cursor-pointer "
                          onClick={handleAddInvestigation}
                        >
                          <RiAddLine
                            color="var(--heading-color)"
                            className="h-8 w-8"
                          />
                        </div>
                        {(investigations.length > 1 && (
                          <div
                            className=" m-2 h-8 w-20 mt-0   font-semibold cursor-pointer "
                            onClick={() => {
                              let tempinvestigations = [...investigations];
                              tempinvestigations.splice(index, 1);
                              let tempprescription = { ...prescription };
                              tempprescription.investigations =
                                tempinvestigations;
                              setPrescription(tempprescription);
                              setInvestigations(tempinvestigations);
                            }}
                          >
                            <RiSubtractLine
                              color="var(--heading-color)"
                              className="w-8 h-8"
                            />
                          </div>
                        )) || (
                          <div className="  h-8 w-20 mt-0 font-semibold cursor-pointer "></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Investigation Ends */}

              {/* Advice Starts */}
              <div className="mt-5 flex">
                <h1 className="text-2xl flex font-medium mb-3 mr-36 mt-4">Advices </h1>
                <div className="flex flex-col">
                  {advices.map((Advice, index) => (
                    <div
                      className="flex sm:flex-row gap-10 w-[74rem]"
                      key={index}
                    >
                      <CssTextField
                        placeholder="Eg. Drink more water"
                        label="Advice"
                        variant="outlined"
                        InputProps={{
                          style: { color: "var(--heading-color)" },
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="dense"
                        fullWidth
                        value={Advice.advice}
                        onChange={(e) => {
                          const tempadvices = [...advices];
                          tempadvices[index].advice = e.target.value;
                          setAdvices(tempadvices);

                          let tempprescription = { ...prescription };
                          tempprescription.advices = advices;
                          setPrescription(tempprescription);
                        }}
                      />

                      <div className="flex justify-start items-center">
                        <div
                          className="h-8 w-16 mt-0  font-semibold cursor-pointer "
                          onClick={handleAddAdvices}
                        >
                          <RiAddLine
                            color="var(--heading-color)"
                            className="h-8 w-8"
                          />
                        </div>
                        {(advices.length > 1 && (
                          <div
                            className=" m-2 h-8 w-20 mt-0   font-semibold cursor-pointer "
                            onClick={() => {
                              const tempadvices = [...advices];
                              tempadvices.splice(index, 1);

                              let tempprescription = { ...prescription };
                              tempprescription.advices = tempadvices;
                              setPrescription(tempprescription);
                              setAdvices(tempadvices);
                            }}
                          >
                            <RiSubtractLine
                              color="var(--heading-color)"
                              className="w-8 h-8"
                            />
                          </div>
                        )) || (
                          <div className=" m-2 h-8 w-20 mt-0   font-semibold cursor-pointer "></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Advice Ends */}
            </div>

            <div className="flex justify-center mt-8">
              {Loading ? (
                <ReactLoading
                  type={"bubbles"}
                  color={""}
                  height={"5%"}
                  width={"5%"}
                />
              ) : (
                <button className="bg-primary rounded p-2 px-8 font-bold text-xl hover:bg-bgsecondary mb-4 ">
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* Form Ends */}
        </div>
      </div>
    </>
  );
};

export default AddNewDiagnosis;
