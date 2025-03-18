const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../model/userModel");

const verify_token = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(200)
      .send({ success: false, msg: "A token is required for authorization" });
  }
  console.log(req);
  try {
    const token_verify = await jwt.verify(token, config.secret_key);
    req.user = token_verify;
    console.log(User);
    console.log(token_verify);
    const user = await User.findById(token_verify);

    if (!user) {
      return res
        .status(500)
        .send({
          success: false,
          msg: "User doesn't exists",
        });
    }
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
  next();
};

module.exports = verify_token;
