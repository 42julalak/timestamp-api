const express = require("express");
const tasksController = require("../controllers/tasksController");
const router = express.Router();
const tokenizer = require("../middleware/tokenizer");

//CRUD
router.post("/check-in", tokenizer.checkToken, tasksController.checkIn);
router.get("/isLate", tokenizer.checkToken, tasksController.isLate)
router.get(
  "/check-in",
  tokenizer.checkToken,
  tasksController.getCheckInHistory
);

module.exports = router;
