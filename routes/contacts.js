const express = require("express");
const { models } = require("mongoose");

const router = express.Router();

//@route      GET /api/contacts
//@desc       Get all users contacts
//@access     Private

router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

//@route      POST /api/contacts
//@desc       Add new contact
//@access     Private

router.post("/", (req, res) => {
  res.json({ message: "Add a new user" });
});

//@route      PUT /api/contacts/:id
//@desc       Update a contact
//@access     Private

router.put("/:id", (req, res) => {
  res.json({ message: "Update a contact" });
});

//@route      DELETE /api/contacts/:id
//@desc       Delete a contact
//@access     Private

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete a contact" });
});

module.exports = router;
