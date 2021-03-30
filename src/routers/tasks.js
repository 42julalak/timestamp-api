const express = require("express");
const tasksController = require("../controllers/tasksController");
const router = express.Router();
const tokenizer = require("../middleware/tokenizer");
const { route } = require("./users");

//CRUD
router.post("/check-in", tokenizer.checkToken, tasksController.checkIn);
router.post("/check-out", tokenizer.checkToken, tasksController.checkOut)
router.get("/isLate", tokenizer.checkToken, tasksController.isLate)
router.get(
  "/check-in",
  tokenizer.checkToken,
  tasksController.getCheckInHistory
);

module.exports = router;
