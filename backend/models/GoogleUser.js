const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const GoogleUserSchema = mongoose.Schema({
  google_user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
});

GoogleUserSchema.plugin(passportLocalMongoose);
GoogleUserSchema.plugin(findOrCreate);

module.exports = GoogleUser = mongoose.model("googleUser", GoogleUserSchema);
