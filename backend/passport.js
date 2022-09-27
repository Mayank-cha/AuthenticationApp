const axios = require("axios");
const config = require("config");
const FormData = require("form-data");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const passport = require("passport");
const _ = require("passport-local-mongoose");
const GoogleUser = require("./models/GoogleUser");

const GOOGLE_CLIENT_ID = config.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = config.get("GOOGLE_CLIENT_SECRET");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3737/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const body = {
        id: profile.id,
        name: profile.name.givenName + profile.name.familyName,
        google_user_id: profile.id,
        bio: "",
        phone: "",
        email: profile.emails[0].value,
        image: "",
      };

      // console.log("Before find or create.");
      // console.log("Body : ", body);

      let flag = {
        status: false,
      };

      await axios
        .post("https://authapp101.herokuapp.com/user/signup", {
          ...body,
        })
        .then((response) => {
          console.log("Response", response);
          flag = { ...response.data };

          // console.log(response);
          // return done(null, { msg: "User created successfully" });
        })
        .catch((error) => {
          console.log("Error : ", error);
          flag = { ...error.data };
          // console.log(error);
          // return done(null, { msg: "Unable to create a user" });
        });
      // await GoogleUser.findOrCreate({ ...body })
      //   .then((user) => {
      //     // res.json({ msg: "User created successfully" });
      //     console.log("Done");
      //     // return done(null, { msg: "User created successfully" });
      //   })
      //   .catch((error) => {
      //     console.log("Failed");
      //     // res.status(400).json({ error: "Unable to create a user" });
      //     // return done(null, { msg: "Unable to create a user" });
      //   });
      // request.session.id = { ...flag };
      // console.log(flag);

      return done(null, flag);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("User : ", user);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  let response = {};
  console.log("Id: ", id);
  await axios
    .post(`https://authapp101.herokuapp.com/user/${id}`, "", {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    })
    .then((response) => {
      response = { ...response.data };
      console.log(response);
    })
    .catch((error) => {
      response = { ...error.data };
      console.log(error);
    });
  console.log(response);
  done(null, id);
});

/* 
Sign up with google
google-id
create new google-id
return data: {
      id: 23,
      name: 'NamrataSanger',
      bio: '',
      phone: '',
      email: 'namratasanger7@gmail.com'
    }

Sign in with google
google-id
if google_profile -> data: {
      id: 23,
      name: 'NamrataSanger',
      bio: '',
      phone: '',
      email: 'namratasanger7@gmail.com'
    }


Normal sign up 
create new user 
return data: {
      id: 23,
      name: 'NamrataSanger',
      bio: '',
      phone: '',
      email: 'namratasanger7@gmail.com'
    }

Normal sign in
check for email id and password
data: {
  id: 23,
  name: 'NamrataSanger',
  bio: '',
  phone: '',
  email: 'namratasanger7@gmail.com'
}
*/
