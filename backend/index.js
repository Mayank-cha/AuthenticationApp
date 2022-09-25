const cookieSession = require("express-session");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const passportSetUp = require("./passport.js");
const authRoute = require("./routes/auth.js");
const app = express();

app.use(
  cookieSession({
    secret: "somethingsecretgoeshere",
    resave: false,
    name: "session",
    keys: ["internship"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("3737", () => {
  console.log("Server is running");
});
