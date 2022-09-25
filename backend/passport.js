const axios = require("axios");
const FormData = require("form-data");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "604559611961-dor7t4hh3pka8l5p626akhbh7s42h16k.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const bodyFormData = new FormData();

      bodyFormData.append("id", profile.id);
      bodyFormData.append(
        "name",
        `${profile.name.givenName + profile.name.familyName}`
      );
      bodyFormData.append("google_user_id", profile.id);
      bodyFormData.append("bio", "");
      bodyFormData.append("phone", "");
      bodyFormData.append("email", profile.emails[0].value);
      bodyFormData.append("password", "");
      const body = {
        id: profile.id,
        name: profile.name.givenName + profile.name.familyName,
        google_user_id: profile.id,
        bio: "",
        phone: "",
        email: profile.emails[0].value,
        password: "",
      };
      axios
        .post("https://authapp101.herokuapp.com/user/signup", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res, req) {
          console.log(profile);
          return done(null, body);
        })
        .catch(function (error) {
          console.log(error);
        });
      // done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
