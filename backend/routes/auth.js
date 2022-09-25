const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";
const FAILURE_URL = "/login/failed";
const SUCCESS_URL = "/login/success";
const LOGOUT_URI = "/logout";

// failed
router.get(FAILURE_URL, (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

//logout
router.get(LOGOUT_URI, (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(SUCCESS_URL, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: FAILURE_URL,
  })
);

module.exports = router;
