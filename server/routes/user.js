const express = require("express");
const Route = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const sequelize = require("../database/db").sequelize;
const db = require("../database/db");
const User = db.user;
const Job = db.job;
//@POST api/user @user registration
Route.post(
  "/",

  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("registration_number", "Registraion field is required only integer")
      .not()
      .isEmpty(),
    check("designation", "Designation Field is required")
      .not()
      .isEmpty(),
    check("password", "Password must be at least 5 chars long").isLength({
      min: 5
    })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { registration_number, name, designation, password } = req.body;

    const userExist = await User.count({
      where: { registrationNumber: registration_number }
    });

    if (userExist) {
      return res
        .status(402)
        .json({ msg: "Registration number already used by another user" });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //password = "12345"; //await bcrypt.hash(password, salt);

    // if (password) {
    //   return res.send(password);
    // } else {
    //   return res.send("null" + password);
    // }

    try {
      let user = await User.create({
        registrationNumber: registration_number,
        name: name,
        designation: designation,
        password: password
      });

      const payload = {
        user: {
          id: user.registrationNumber
        }
      };

      jwt.sign(payload, config.secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

//Fetch all data

Route.get("/", auth, async (req, res) => {
  try {
    const result = await User.findAll();
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Delete User
Route.delete("/:id", auth, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await User.destroy({
      where: {
        registrationNumber: id
      }
    });
    if (result) {
      return res.status(200).json({ msg: "Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//@POST api/user @user Update
Route.post(
  "/edit",
  auth,
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("designation", "Designation Field is required")
      .not()
      .isEmpty(),
    check("role", "Role is required")
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { registration_number, name, designation, id, role } = req.body;
    console.log(role);
    try {
      let result = await User.update(
        {
          registrationNumber: registration_number,
          name: name,
          designation: designation,
          role
        },
        { where: { id: id } }
      );

      res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

module.exports = Route;
