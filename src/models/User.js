const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Enter your name"],
    match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Enter valid name"],
  },
  email: {
    type: String,
    required: ["Please enter your email address", true],
    unique: ["Email already taken", true],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: ["Enter your password", true],
    select: false,
    minLength: [6, "Password must be of 6 character"],
    trim: true,
  },

  todoItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  createdAt: {
    type: Date,
    default: Date(Date.now()),
  },
});

// METHODS

userSchema.pre("save", async function (next) {
  // create the salt
  let salt = await bcrypt.genSalt(10);
  // modify password field only is password field is changed
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// matchPassword
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate token

userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);
