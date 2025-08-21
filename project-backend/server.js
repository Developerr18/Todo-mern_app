const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

const tasksRoutes = require("./tasksRoute");
app.use("/api/tasks", tasksRoutes);

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected!");
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
});
