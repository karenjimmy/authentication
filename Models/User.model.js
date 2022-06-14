const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();

    console.log("called before saving a user");
  } catch (error) {
    next(error);
  }
});

UserSchema.post("save", async function (next) {
  try {
    console.log("called after saving a user");
  } catch (error) {
    next(error);
  }
});
const user = mongoose.model("user", UserSchema);
module.exports = user;
