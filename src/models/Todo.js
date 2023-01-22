const mongoose = require("mongoose");
const todosSchema = new mongoose.Schema({
  todoTask: {
    type: String,
    required: [true, "Write your todos"],
  },
  date: {
    type: Date,
    required: [true, "Select Due Date"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
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

module.exports = mongoose.model(Todos, todosSchema);
