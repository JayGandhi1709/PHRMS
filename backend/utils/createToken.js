const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
// console.log(maxAge);

module.exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.createForgotPasswordToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};