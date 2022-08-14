const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

// USER MODEL
const User = Schema(
  {
    user_id: Number,
    name: {
      type: String,
      required: [true, "Name must be fulfilled"],
    },
    email: {
      type: String,
      required: [true, "Email must be fulfilled"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

// USER_ID AUTO INCREMENT
User.plugin(AutoIncrement, { inc_field: "user_id" });

// EMAIL VALIDATION
User.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} not valid`
);

// EXISTING EMAIL VALIDATION
User.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} already exist`
);

// HASH THE PASSWORD
const HASH_ROUND = 10;
User.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = model("User", User);
