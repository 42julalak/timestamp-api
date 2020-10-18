const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoute = require("./src/routers/users");
const tasksRoute = require("./src/routers/tasks");
const cronJob = require("./src/function/cron");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//ROUTER
app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);

//Basic Route
app.get("/", (req, res) => {
  res.send("Timestamper is running...");
});

//CRON Service
// cronJob.start();

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Timestamper is running on port ${PORT} ...`);
});

module.exports = app;
