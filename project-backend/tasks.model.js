const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", tasksSchema);

module.exports = Task;
