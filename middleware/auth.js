const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token from header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ mesg: "No token , authorization denied" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ mesg: "Token is not valid" });
  }
};
