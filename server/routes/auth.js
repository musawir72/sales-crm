//  Login Apis
const express = require("express");
const Route = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const db = require("../database/db");
const User = db.user;

Route.get("/", auth, async (req, res) => {
  const id = req.user.user.id;
  const user = await User.findAll({
    where: { registration_number: id }
  }).map(el => el.get({ plain: true }));
  res.json(user);
});
Route.post(
  "/",
  [
    check(
      "registration_number",
      "Registration number should be Numeric"
    ).isNumeric(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { registration_number, password } = req.body;

    const user = await User.findAll({
      where: { registrationNumber: registration_number }
    }).map(el => el.get({ plain: true }));
    const len = user.length;

    if (len === 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    let db_password = user[0].password;

    const isMatch = await bcrypt.compare(password, db_password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    try {
      const payload = {
        user: {
          id: user[0].registrationNumber
        }
      };

      jwt.sign(payload, config.secret, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server erroe");
    }
  }
);

module.exports = Route;
