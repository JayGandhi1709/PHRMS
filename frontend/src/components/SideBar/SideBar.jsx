import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import {
  RiUser3Line,
  RiUserAddLine,
  RiDashboardFill,
  RiCloseLine,
  RiMoonLine,
  RiSunLine,
  RiLogoutBoxRLine,
  RiHistoryLine,
  RiUserSearchLine,
  RiListUnordered,
} from "react-icons/ri";

import { CgUserList, CgProfile } from "react-icons/cg";
import { TbReportSearch, TbReport } from "react-icons/tb";
import { FaUserMd, FaUserSlash,FaRegCalendarAlt,FaRegCalendarPlus  } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
// import {FaUserXmark} from "react-icons/fa6";

// img
import patientProfile from "../../Assets/images/patient/patient_profile.png";
import doctorProfile from "../../Assets/images/doctor/doctor_profile.png";
import adminProfile from "../../Assets/images/admin/admin_profile.png";

// Component
import AdminDashboard from "../admin/Dashboard";
import DoctorDashboard from "../doctor/Dashboard";
import PatientDashboard from "../patient/Dashboard";
import DoctorList from "../admin/DoctorList";
import SuspendedDoctorList from "../admin/SuspendedDoctorList";
import PatientList from "../admin/PatientList";
import About from "../About/About";
import Request from "../admin/Request";
import AddNewDiagnosis from "../doctor/AddNewDiagnosis";
import PreviewPrescription from "../doctor/PreviewPrescription";
import PatientReports from "../doctor/PatientReports";
import PatientHistory from "../doctor/PatientHistory";
import PrescriptionsHistory from "../patient/PrescriptionsHistory";
import FindDoctor from "../patient/FindDoctor";
import DoctorsPatientList from "../doctor/DoctorsPatientList";
import NotificationPopup from "../patient/notificationPopup";
import PatientAppointment from "../patient/patientAppointment";
import DoctorAppointment from "../doctor/doctorAppointment";
import { BACKENDURL } from "../../App";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "var(--body-bg)",
  color: "var(--heading-color)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  backgroundColor: "var(--body-bg)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // React Hook

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [menuItem, setMenuItem] = useState("Dashboard");

  const logout = async () => {
    // console.log(logout);
    props.setHealthID("");
    const res = await fetch(`${BACKENDURL}/logout`);
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/");
  };

  // const notificationFun = async () => {
  //   // const res = await fetch(`/notifications/${props.loginData.HealthID}`, {
  //   const res = await fetch(`/allNotifications`, {
  //     method: "GET",
  //   });
  //   const data = res.json();
  //   setNotification(data);
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getMenus = () => {
    const patientMenu = [
      {
        icon: <TbReport />,
        // icon: <RiHistoryLine />,
        menuName: "Prescriptions History",
      },
      {
        icon: <RiUserSearchLine />,
        menuName: "Find Doctor",
      },
      {
        // icon: <FaRegCalendarAlt />,
        icon: <FaRegCalendarPlus  />,
        menuName: "Appointment History",
      },
    ];
    const doctorMenu = [
      {
        icon: <TbReportSearch />,
        menuName: "Patient Reports",
      },
      {
        icon: <RiHistoryLine />,
        menuName: "Patient History",
      },
      {
        icon: <CgUserList />,
        menuName: "Doctors Patient List",
      },
      {
        // icon: <FaRegCalendarAlt />,
        icon: <FaRegCalendarPlus  />,
        menuName: "Appointments",
      },
    ];
    const adminMenu = [
      {
        icon: <RiUserAddLine />,
        // icon: <RiListUnordered />,
        menuName: "Doctor Aprovals",
      },
      {
        icon: <FaUserMd />,
        // icon: <RiListUnordered />,
        menuName: "Doctor List",
      },
      {
        icon: <CgUserList />,
        // icon: <RiListUnordered />,
        menuName: "Patient List",
      },
      {
        icons: <FaUserSlash />,
        menuName: "Suspanded Doctor List",
      },
    ];

    return location.pathname === "/patient"
      ? patientMenu
      : location.pathname === "/doctor"
      ? doctorMenu
      : adminMenu;
  };

  async function getNotification() {
    if (location.pathname == "/patient") {
      const res = await fetch(`/${BACKENDURL}getUserNotifications`);
      const data = await res.json();
      // console.log(data);
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
      } else {
        console.log(data);
        setNotification(data);
      }
    }
  }
  useEffect(() => {
    getNotification();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "var(--body-bg)" }}>
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
            sx={{
              color: "var(--primary-color)",
            }}
            // color="primary"
          >
            {open === false ? <MenuIcon /> : <RiCloseLine />}
          </IconButton>
          <div className="logo flex-[1]">
            <h2 className="font-extrabold pl-6">Digital Health Record</h2>
          </div>
          {location.pathname == "/patient" ? (
            <div
              className="logo px-3"
              onClick={() => {
                setNotificationPopup(true);
                // console.log(notificationPopup);
              }}
            >
              <span className="relative inline-block">
                <FiBell color="black" size={20} />
                {notification.length > 0 ? (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {notification.length > 9 ? "9+" : notification.length}
                  </span>
                ) : null}
              </span>
            </div>
          ) : null}

          {notificationPopup ? (
            <NotificationPopup
              getNotification={getNotification}
              notification={notification}
              setNotification={setNotification}
              notificationPopup={notificationPopup}
              setNotificationPopup={setNotificationPopup}
            />
          ) : null}
          {/* <NotificationPopup
            notificationPopup={notificationPopup}
            setNotificationPopup={setNotificationPopup}
          /> */}
          {/* {notificationPopup ? <NotificationPopup {...props} /> : null} */}
          {/* <div className="logo px-3">
            <h2 className="pl-6">
              <span>
                <FiBell color="black" size={20} />
              </span>
              <span className="inline-block w-2 h-2 mr-2 bg-red-600 rounded-full">9</span>
            </h2>
          </div> */}
          {/* <div className="text-sm notification-bell logo">
            <FiBell size={1} />
          </div>
         */}
          <div className="light__mode">
            <span onClick={props.toggleTheme}>
              {props.theme === "light-theme" ? (
                <span>
                  <RiMoonLine /> Dark
                </span>
              ) : (
                <span>
                  <RiSunLine /> Light
                </span>
              )}
            </span>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <DrawerHeader
          sx={{
            backgroundColor: "var(--primary-color)",
            color: "var(--heading-color)",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: "var(--primary-color)",
            }}
          >
            <img
              src={
                location.pathname === "/patient"
                  ? patientProfile
                  : `${
                      location.pathname === "/doctor"
                        ? doctorProfile
                        : location.pathname === "/admin"
                        ? adminProfile
                        : navigate("/404")
                    }`
              }
              alt="User profile"
              className="h-10"
            />
          </ListItemIcon>
          <ListItemText sx={{ opacity: open ? 1 : 0 }}>
            <div>
              <h3 className="text-black font-extrabold">
                {location.pathname === "/doctor" ? "Dr. " : null}
                {props.loginData.BasicInformation.name.firstName}{" "}
                {props.loginData.BasicInformation.name.lastName}
              </h3>
              <div className="text-black font-light">
                {location.pathname.toUpperCase().charAt(1)}
                {location.pathname.slice(2)}
              </div>
            </div>
          </ListItemText>
        </DrawerHeader>
        <Divider className="bg-btn_primary_bg" />

        {/* Dashboard******************************************************************************* */}
        <List>
          <ListItem
            className="hover:text-[20px]"
            disablePadding
            sx={{ display: "block" }}
            title={"Dashboard"}
            onClick={() => setMenuItem("Dashboard")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                }}
              >
                <RiDashboardFill />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        {/* ******************************************************************************* */}

        <Divider className="bg-btn_primary_bg" />

        {/* Main Content******************************************************************************* */}
        {/* Admin */}
        <List>
          {getMenus().map((menu, index) => (
            <ListItem
              className="hover:text-[20px]"
              key={menu.menuName}
              disablePadding
              sx={{ display: "block" }}
              title={menu.menuName}
              onClick={() => setMenuItem(menu.menuName)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "var(--primary-color)",
                  }}
                  // color="primary"
                >
                  {/* <RiUser3Line /> */}
                  {menu.icon}
                  {/* {index % 2 === 0 ? <RiUser3Line /> : <RiUser3Line />} */}
                </ListItemIcon>
                <ListItemText
                  primary={menu.menuName}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* ******************************************************************************* */}

        {/* Profile/About Page******************************************************************************* */}
        {location.pathname === "/patient" || location.pathname === "/doctor" ? (
          <>
            <Divider className="bg-btn_primary_bg" />
            <List>
              <ListItem
                className="hover:text-[20px]"
                disablePadding
                sx={{ display: "block" }}
                title={"Profile"}
                onClick={() => setMenuItem("Profile")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "var(--primary-color)",
                    }}
                  >
                    <CgProfile />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : null}

        {/* ******************************************************************************* */}
        <Divider className="bg-btn_primary_bg" />

        {/* Logout******************************************************************************* */}
        <List>
          <ListItem
            className="hover:text-[20px]"
            disablePadding
            sx={{ display: "block" }}
            title={"Logout"}
            onClick={logout}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                }}
              >
                <RiLogoutBoxRLine />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        {/* ******************************************************************************* */}

        <Divider className="bg-btn_primary_bg" />
      </Drawer>

      <Box
        component="main"
        className="h-screen"
        sx={{ flexGrow: 1, backgroundColor: "var(--body-bg)" }}
      >
        {/* Dashbaord & Profile */}
        {menuItem === "Dashboard" && location.pathname === "/patient" ? (
          <PatientDashboard
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        ) : menuItem === "Dashboard" && location.pathname === "/doctor" ? (
          <DoctorDashboard
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        ) : menuItem === "Dashboard" && location.pathname === "/admin" ? (
          <AdminDashboard
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        ) : null}

        {menuItem === "Profile" && <About {...props} />}

        {/* Admin Side */}
        {menuItem === "Patient List" && <PatientList {...props} />}
        {menuItem === "Doctor Aprovals" && <Request {...props} />}
        {menuItem === "Doctor List" && <DoctorList {...props} />}
        {menuItem === "Suspanded Doctor List" && (
          <SuspendedDoctorList {...props} />
        )}

        {/* Doctor */}
        {menuItem === "AddNewDiagnosis" && (
          <AddNewDiagnosis
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "PreviewPrescription" && (
          <PreviewPrescription
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Patient Reports" && (
          <PatientReports
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Patient History" && (
          <PatientHistory
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Doctors Patient List" && (
          <DoctorsPatientList
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Appointments" && (
          <DoctorAppointment
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}

        {/* Patient */}
        {menuItem === "Find Doctor" && (
          <FindDoctor
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Prescriptions History" && (
          <PrescriptionsHistory
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
        {menuItem === "Appointment History" && (
          <PatientAppointment
            {...props}
            menuItem={menuItem}
            setMenuItem={setMenuItem}
          />
        )}
      </Box>
    </Box>
  );
}
