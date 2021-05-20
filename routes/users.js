const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
//@route      POST /api/users
//@desc       Register  a user
//@access     Public

router.post(
  "/",
  body("name", "Please ennter a name").not().isEmpty(),
  body("email", "Please add a vslid mail").isEmail(),
  body("password", "Please add a password of more the 6 length").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, name, password } = req.body;
    console.log(email, name, password);

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
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
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
