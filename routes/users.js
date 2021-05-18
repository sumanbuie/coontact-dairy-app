const express = require("express");
const { models } = require("mongoose");

const router = express.Router();

//@route      POST /api/users
//@desc       Register  a user
//@access     Public

router.post("/", (req, res) => {
  res.json({ message: "Register a user" });
});

module.exports = router;
