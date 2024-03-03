const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const smtp = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "421kamlendra@gmail.com",
    pass: `plrremgjravkanvq`,
  },
});
/*------------------SMTP Over-----------------------------*/

app.set("view engine", "ejs");
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

/*------------------Routing Started ------------------------*/

app.get("/", function (req, res) {
  res.render("index");
});

//function for email validation//
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

app.post("/send", function (req, res) {
  var mailOptions = {
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  if (!isEmail(mailOptions.to)) {
    res.status(401).send({
      message: "Invalid Email",
    });
  }
  console.log(mailOptions);
  smtp.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Email sent ");
      res.end("sent");
    }
  });
});
