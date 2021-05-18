const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//@route      POST /api/users
//@desc       Register  a user
//@access     Public

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ body: req.body });
});

module.exports = router;
