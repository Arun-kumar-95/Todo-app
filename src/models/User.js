const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Enter your name"],
  },

  todoItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  createdAt: {
    type: Date,
    default: Date(Date.now),
  },
});

module.exports = mongoose.model("User", userSchema);
