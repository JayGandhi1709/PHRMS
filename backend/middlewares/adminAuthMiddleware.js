const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const requireAdminAuth = (req, res, next) => {
  // console.log("Admin middleware!!");
  // console.log(req.cookies);
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "Admin is not authenticated!" };
        res.status(401).send({ AuthError });
      } else {
        // console.log("DecodedToken", decodedToken.id);
        const admin = await Admin.findById(decodedToken.id);
        // const admin = await Admin.findOne({_id:decodedToken.id});
        if (admin) {
          // console.log(admin.email);
          req.Admin = admin;
          next();
        } else {
          let AuthError = { error: "Admin is not authenticated!" };
          res.status(401).send({ AuthError });
        }
      }
    });
  } else {
    let AuthError = { error: "Admin is not authenticated!" };
    res.status(401).send({ AuthError });
  }
};

module.exports = { requireAdminAuth };
