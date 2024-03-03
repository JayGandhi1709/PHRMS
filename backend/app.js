const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const cookieParser = require("cookie-parser");
// const { default: mongoose } = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();

dotenv.config({ path: "./config.env" });

// Getting Port
const port = process.env.PORT || 5000;

// Database Connection
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
  })
);

app.use(
  cors({
    origin: "https://phrms-rkfbp0d16-jaygandhi1709s-projects.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PATCH","PUT"],
    credentials: true,
  })
);

// Link Routes files
app.use(require("./routes/adminRoute"));
app.use(require("./routes/patientRoute"));
app.use(require("./routes/doctorRoute"));
app.use(require("./routes/logoutRoute"));
app.use(require("./routes/notificationRoute"));
app.use(require("./routes/appointmentRoute"));

app.get("/", (req, res) => {
  res.send(`Hello World From Apps`);
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
