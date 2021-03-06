const express = require("express");
const { models } = require("mongoose");
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
//@route      GET /api/contacts
//@desc       Get all users contacts
//@access     Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route      POST /api/contacts
//@desc       Add new contact
//@access     Private

router.post(
  "/",
  [
    auth,
    [
      body("name", "Please ennter a name").not().isEmpty(),
      body("email", "Please add a vslid mail").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, name, phone, type } = req.body;

    try {
      const newContact = new Contact({
        email,
        name,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      return res.status(200).json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

//@route      PUT /api/contacts/:id
//@desc       Update a contact
//@access     Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

//@route      DELETE /api/contacts/:id
//@desc       Delete a contact
//@access     Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(401).json({ meg: "Contact not found" });
    }
    console.log(contact.user.toString(), req.user.id);
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ meg: "User is not creadential" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: "contact deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
