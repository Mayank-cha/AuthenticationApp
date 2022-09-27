const cookieSession = require("express-session");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const passportSetUp = require("./passport.js");
const authRoute = require("./routes/auth.js");
const connectDB = require("./config/db");
const { default: axios } = require("axios");
const app = express();

connectDB();

var jsonParser = bodyParser.json();

app.use(express.urlencoded());
app.use(
  cookieSession({
    secret: "somethingsecretgoeshere",
    resave: false,
    name: "session",
    keys: ["internship"],
    cookie: { secure: false },
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

app.post("/signup", jsonParser, async (req, res) => {
  const body = { ...req.body };
  await axios
    .post("https://authapp101.herokuapp.com/user/signup", {
      ...body,
    })
    .then((response) => {
      const newResponse = { ...response.data };
      console.log(response.data);
      res.send({ ...newResponse });
    })
    .catch((error) => {
      const newResponse = { ...error };
      console.log(newResponse);
      res.send({ ...newResponse });
    });
});

app.post("/signin", jsonParser, async (req, res) => {
  console.log(req.body);
  const body = { ...req.body };
  await axios
    .post("https://authapp101.herokuapp.com/user/login", {
      ...body,
    })
    .then((response) => {
      const newResponse = { ...response.data };
      console.log(response);
      res.send({ ...newResponse });
    })
    .catch((error) => {
      const newResponse = { ...error };
      console.log(newResponse);
      res.send({ ...newResponse });
    });
});

app.post("/update", jsonParser, async (req, res) => {
  const body = { ...req.body };
  await axios
    .post(`https://authapp101.herokuapp.com/user/${body.id}/update`, {
      ...body,
    })
    .then((response) => {
      const newResponse = { ...response.data };
      console.log(response);
      res.send({ ...newResponse });
    })
    .catch((error) => {
      const newResponse = { ...error };
      console.log(newResponse);
      res.send({ ...newResponse });
    });
});

app.post("/image_update", jsonParser, async (req, res) => {
  const body = { ...req.body };
  await axios
    .post(
      `https://authapp101.herokuapp.com/user/${body.id}/update-profile-image`,
      {
        ...body,
      }
    )
    .then((response) => {
      const newResponse = { ...response.data };
      console.log(response);
      res.send({ ...newResponse });
    })
    .catch((error) => {
      const newResponse = { ...error };
      console.log(newResponse);
      res.send({ ...newResponse });
    });
});

app.listen("3737", () => {
  console.log("Server is running");
});
