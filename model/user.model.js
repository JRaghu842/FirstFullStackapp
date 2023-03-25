let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    pass: String,
    location: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
