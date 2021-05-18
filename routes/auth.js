const express = require("express");
const { models } = require("mongoose");
const router = express.Router();

//@route      GET /api/auth
//@desc       Get a loged in user
//@access     Private

router.get("/", (req, res) => {
  res.json({ message: "Get loged in uesr" });
});

//@route      POST /api/auth
//@desc       Auth user and get token
//@access     Public

router.post("/", (req, res) => {
  res.json({ message: "Log in uesr" });
});

module.exports = router;
