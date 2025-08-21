const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config");
const Task = require("./tasks.model");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).send("Successful response");
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { text = "Workout", done = false } = req.body || {};
    const newCreatedTask = await Task.create({ text, done });
    res.status(201).json({
      message: "Successfully Added Task!",
      task: newCreatedTask,
    });
  } catch (err) {
    console.error("Error creating task!", err.message);
    res.status(500).json({ message: "Server error while creating task!" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { text, done } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, done },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found!" });
    }
    res.status(200).json({
      message: "Task updated Successfully!",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ error: "Server error while updating task!" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found!" });
    }
    res.status(200).json({ message: "Successfully Deleted!" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server error while deleting task!" });
  }
});

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected!");
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
});
