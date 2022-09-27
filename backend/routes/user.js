const express = require("express");
const router = express.Router();

const GoogleUser = require("../models/GooleUser");

// @route POST /user
// @description create a user
// @access Public
router.get("/createUser", (req, res) => {
  GoogleUser.create(req.body)
    .then((user) => res.json({ msg: "User created successfully" }))
    .catch((error) =>
      res.status(400).json({ error: "Unable to create a user" })
    );
});

module.exports = router;
