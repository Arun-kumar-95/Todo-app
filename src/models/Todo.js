const mongoose = require("mongoose");
const todosSchema = new mongoose.Schema({
  todoTask: {
    type: String,
    required: [true, "Write your todos"],
    lowercase: true,
  },
  date: {
    type: Date,
    required: [true, "Select Due Date"],
  },
  category: {
    type: String,
    enum: ["Busisness", "Personal", "Important", "Other"],
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("Todos", todosSchema);
