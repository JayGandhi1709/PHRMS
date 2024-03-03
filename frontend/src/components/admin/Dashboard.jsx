import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {TbReportMedical} from "react-icons/tb";
import { FaUserMd, FaRegUser } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const Dashboard = (props) => {
  const { loginData, setMenuItem } = props;
  const [patient, setPatient] = useState({
    male: "",
    female: "",
    other: "",
    verifiedDoctors: "",
    unverifiedDoctors: "",
    total: "",
  });
  const [doctor, setDoctor] = useState({
    male: "",
    female: "",
    other: "",
    total: "",
  });
  const [prescription, setPrescription] = useState({
    total: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getGenderRatio() {
      const res = await fetch(`/getGenderRatio`);
      const data = await res.json();

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        // console.log(data);
        setPatient(data.obj.patient);
        setDoctor(data.obj.doctor);
        setPrescription(data.obj.prescription)
      }
    }
    getGenderRatio();
  }, []);

  let data;
  data = [
    {
      title: "PATIENTS",
      value: patient.total,
      linkText: "See all patient",
      link: "Patient List",
      icon: (
        <FaRegUser
          className="text-4xl p-[5px] rounded-[5px] self-end"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      ),
    },
    {
      title: "DOCTORS",
      value: doctor.verifiedDoctors,
      linkText: "View all doctors",
      link: "Doctor List",
      icon: (
        <FaUserMd
          className="text-4xl p-[5px] rounded-[5px] self-end"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
            // color: "goldenrod",
          }}
        />
      ),
    },
    {
      title: "REQUESTES",
      value: doctor.unverifiedDoctors,
      linkText: "View all requestes",
      link: "Doctor Aprovals",
      icon: (
        <FcApproval
          className="text-4xl p-[5px] rounded-[5px] self-end"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "blue" }}
        />
      ),
    },
    {
      title: "PRESCRIPTIONS",
      value: prescription.total,
      // linkText: "View all doctors",
      link: "Doctor List",
      icon: (
        <TbReportMedical
          className="text-4xl p-[5px] rounded-[5px] self-end"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "black",
          }}
        />
      ),
    },
  ];

  const pieChart = [
    { name: "Doctor", value: doctor.verifiedDoctors, color: "#00C49F" },
    { name: "Patient", value: patient.total, color: "#0088FE" },
  ];

  const barChart = [
    {
      Name: "Patient",
      Male: patient.male,
      Female: patient.female,
      Other: patient.other,
    },
    {
      Name: "Doctor",
      Male: doctor.male,
      Female: doctor.female,
      Other: doctor.other,
    },
  ];

  return (
    <div className="mt-20">
      <div className="flex justify-between m-8">
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="widget flex justify-between flex-1 p-[10px] rounded-[10px] h-[120px] m-6 shadow-md shadow-primary"
              style={{ backgroundImage: "var(--card-bg)" }}
            >
              <div className="left flex flex-col justify-between">
                <span className="title font-bold text-lg text-primary">
                  {data.title}
                </span>
                <span className="text-lg text-heading font-extrabold">
                  {data.value}
                </span>
                <span
                  onClick={() => {
                    setMenuItem(data.link);
                  }}
                  className="link cursor-pointer w-max text-[12px] border-b-[1px] border-solid border-gray-600 text-heading"
                >
                  {data.linkText}
                </span>
              </div>
              <div className="right flex flex-col justify-end">{data.icon}</div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row flex-wrap justify-around">
        <div
          style={{ backgroundImage: "var(--card-bg)" }}
          className="border-2 rounded border-primary shadow-md"
        >
          <div>
            <h3 className="text-primary font-bold p-3">Pie Chart</h3>
            <hr color="var(--heading-color)" />
          </div>
          <div className="p-6">
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={pieChart}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={"var(--primary-color)"}
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div
          style={{ backgroundImage: "var(--card-bg)" }}
          className="border-2 rounded border-primary shadow-md"
        >
          <div>
            <h3 className="text-primary font-bold p-3">Bar Chart</h3>
            <hr color="var(--heading-color)" />
          </div>
          <div className="p-6">
            <BarChart
              width={500}
              height={300}
              data={barChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Male" barSize={30} fill="#00C49F" />
              <Bar dataKey="Female" barSize={30} fill="#8884d8" />
              <Bar dataKey="Other" barSize={30} fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
