const { default: mongoose } = require("mongoose");

const dbURI = process.env.DATABASE;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((result) => {
    // app.listen(port);
    console.log(`connected to db and listening at port port`);
  })
  .catch((err) => {
    console.log("Connection Error");
    // app.listen(port);
    // app.get("/", (req, res) => {
    //   res.send(
    //     "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
    //   );
    // });
  });