const express = require("express");
const { models } = require("mongoose");
const User = require("../models/User");
const config = require("config");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const cors = require("cors");

//middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
//@route      GET /api/auth
//@desc       Get a loged in user
//@access     Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//@route      POST /api/auth
//@desc       Auth user and get token
//@access     Public

router.post(
  "/",
  body("email", "Please add a vslid mail").isEmail(),
  body("password", "Please enter a password").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User not  exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
      const playLoad = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        playLoad,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token: token });
        }
      );
    } catch (error) {
      console.error(error.messages);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
